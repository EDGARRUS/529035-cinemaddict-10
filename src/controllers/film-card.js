import {FilmCardComponent} from "../components/film-card";
import {FilmCardPopupCommentComponent, FilmCardPopupComponent} from "../components/film-card-popup";
import {remove, replace, render, RenderPosition} from "../utils/render";
import {FilmComment} from "./film-comment";
import API from "../api";
import FilmModel from "../models/film"
import CommentModel from "../models/comment";
import CommentsModel from "../models/comments";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export class FilmCardController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;


    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmCardPopupComponent = null;
    this._filmCardPopupCommentComponent = null;
    this.openFilmPopup = this.openFilmPopup.bind(this);
    this.filmPopupClose = this.filmPopupClose.bind(this);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);

  }

  setDefaultView() {

    if (this._mode !== Mode.DEFAULT) {

      remove(this._filmCardPopupComponent);
    }
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(film);


    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToWatchlist = !film.addToWatchlist;
      this._onDataChange(this, film, newFilm);

    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToHistory = !film.addToHistory;
      this._onDataChange(this, film, newFilm);

    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToFavorite = !film.addToFavorite;
      this._onDataChange(this, film, newFilm);

    });


    this._filmCardComponent.setOpenFilmClickHandler(() => {this.openFilmPopup(film)});

    if (oldFilmCardComponent) {

      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

  }

  filmPopupClose() {
    remove(this._filmCardPopupComponent);
  };

  onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this.filmPopupClose();
      document.removeEventListener(`keydown`, this.onEscKeyDown);
    }
  };

  openFilmPopup(film) {
    this._onViewChange();
    this._mode = Mode.POPUP;
    this._commentsModel = new CommentsModel();

    this._filmCardPopupComponent = new FilmCardPopupComponent(film);
    this._filmCardPopupCommentComponent = new FilmCardPopupCommentComponent(film);


    render(document.querySelector(`body`), this._filmCardPopupComponent, RenderPosition.BEFOREEND);

    const AUTHORIZATION = `Basic eo0w590ik29889a`;
    const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
    const api = new API(END_POINT, AUTHORIZATION);

    const filmCommentController = new FilmComment(this._filmCardPopupComponent.getElement().querySelector(`.film-details__comments-wrap`), (controller, oldData, newData) => {
      if (oldData === null) {

        this._filmCardPopupComponent.getElement().querySelector(`.film-details__comment-input`).setAttribute(`disabled`, `true`);

        api.createComment(new CommentModel(newData), film.id)
          .then((result) => {
            this._commentsModel.addComment(result.comments[result.comments.length - 1]);
            return result.comments[result.comments.length - 1] ;
          }).then((newComment) => {

          controller.rerender(this._commentsModel.getCommentsAll());
          const newFilm = FilmModel.clone(film);
          newFilm.commentsId.push(newComment.id);
          this._onDataChange(this, film, newFilm);

        })
          .catch(() => {
            controller.shake();
          });
      }

      if (newData === null) {

        api.deleteComment(oldData)
          .then(() => {
            this._commentsModel.removeComment(oldData);
            /* this._updateComments(this._showingCommentsCount); */
          }).then(() => {controller.rerender(this._commentsModel.getCommentsAll())})
          .catch(() => {controller.rerender(this._commentsModel.getCommentsAll()); controller.shake()});


      }


    });


    api.getFilmComments(film.id).then((data) => {this._commentsModel.setComments(data); filmCommentController.render(this._commentsModel.getCommentsAll())});

    // Повторный эвент работает криво на кнопках - ничего не меняется

    this._filmCardPopupComponent.setWatchlistButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToWatchlist = !film.addToWatchlist;
      this._onDataChange(this, film, newFilm);
    });

    this._filmCardPopupComponent.setFavoriteButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToFavorite = !film.addToFavorite;
      this._onDataChange(this, film, newFilm);
    });

    this._filmCardPopupComponent.setHistoryButtonClickHandler(() => {
      console.log(`Сработал клик вызова Оценки`);
      const newFilm = FilmModel.clone(film);
      console.log(`В старом фильме: ${film.addToHistory}`);
      newFilm.addToHistory= !film.addToHistory;
      console.log(`В новом фильме: ${newFilm.addToHistory}`);

      if (!newFilm.addToHistory) {
        newFilm.userRating = 1;
      }

      this._onDataChange(this, film, newFilm);
      this._filmCardPopupComponent.renderUserRatingForm(newFilm);
      this._filmCardPopupComponent.rerenderUserRating(newFilm);
    });

    this._filmCardPopupComponent.setRateValueButtonClickHandler((rate) => {
      const newFilm = FilmModel.clone(film);
      newFilm.userRating = parseInt(rate);
      this._onDataChange(this, film, newFilm);
      this._filmCardPopupComponent.rerenderUserRating(newFilm);
    });

    this._filmCardPopupComponent.setCloseButtonClickHandler(this.filmPopupClose);
    document.addEventListener(`keydown`, this.onEscKeyDown);
  };
}
