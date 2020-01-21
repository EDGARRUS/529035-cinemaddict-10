import {FilmCardComponent} from "../components/film-card";
import {FilmCardPopupCommentComponent, FilmCardPopupComponent} from "../components/film-card-popup";
import {remove, replace, render, RenderPosition} from "../utils/render";
import {FilmComment} from "./film-comment";
import API from "../api";
import FilmModel from "../models/film"

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
  }

  setDefaultView() {

    if (this._mode !== Mode.DEFAULT) {

      remove(this._filmCardPopupComponent);
    }
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmCardPopupComponent = new FilmCardPopupComponent(film);
    this._filmCardPopupCommentComponent = new FilmCardPopupCommentComponent(film);

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToWatchlist = !film.addToWatchlist;
      this._onDataChange(this, film, newFilm)
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToHistory = !film.addToHistory;
      this._onDataChange(this, film, newFilm);
      console.log('Событие клика полностью отработало')
    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.addToFavorite = !film.addToFavorite;
      this._onDataChange(this, film, newFilm)
    });


    const filmPopupClose = () => {
      remove(this._filmCardPopupComponent);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        filmPopupClose();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const openFilmPopup = () => {
      this._onViewChange();
      this._mode = Mode.POPUP;
      render(document.querySelector(`body`), this._filmCardPopupComponent, RenderPosition.BEFOREEND);

      const AUTHORIZATION = `Basic eo0w590ik29889a`;
      const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
      const api = new API(END_POINT, AUTHORIZATION);

      const filmCommentController = new FilmComment(this._filmCardPopupComponent.getElement().querySelector(`.film-details__comments-wrap`), (controller, oldData, newData) => {
        if (oldData === null) {
          film.comment.push(newData);
        }

        if (newData === null) {
          film.comment = film.comment.filter((_comment, order) => order !== oldData);
        }

        controller.rerender(film.comment);
      });

      api.getFilmComments(film.id).then((data) => filmCommentController.render(data));

      this._filmCardPopupComponent.setCloseButtonClickHandler(filmPopupClose);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    this._filmCardComponent.setOpenFilmClickHandler(openFilmPopup);

    if (oldFilmCardComponent) {

      replace(this._filmCardComponent, oldFilmCardComponent);
      debugger;
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

  }
}
