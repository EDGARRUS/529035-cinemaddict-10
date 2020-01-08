import {FilmCardComponent} from "../film-card";
import {FilmCardPopupCommentComponent, FilmCardPopupComponent} from "../film-card-popup";
import {remove, replace, render, RenderPosition} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export class FilmCardController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    console.log(this._onViewChange);

    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmCardPopupComponent = null;
    this._filmCardPopupCommentComponent = null;
  }

  setDefaultView() {
    console.log('Функция дефалт вью');
    if (this._mode !== Mode.DEFAULT) {
      console.log('Что то происходит');
      remove(this._filmCardPopupComponent);
    }
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmCardPopupComponent = new FilmCardPopupComponent(film);
    this._filmCardPopupCommentComponent = new FilmCardPopupCommentComponent(film);

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        addToWatchlist: !film.addToWatchlist,
      }));
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        addToHistory: !film.addToHistory,
      }));
    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        addToFavorite: !film.addToFavorite,
      }));
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
      render(this._filmCardPopupComponent.getElement().querySelector(`.film-details__comments-list`), this._filmCardPopupCommentComponent, RenderPosition.BEFOREEND);

      this._filmCardPopupComponent.setCloseButtonClickHandler(filmPopupClose);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    this._filmCardComponent.setOpenFilmClickHandler(openFilmPopup);

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

  }
}
