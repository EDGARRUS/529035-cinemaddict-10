import AbstractComponent from "./abstract-component";
import {formatDate, formatTime} from "../utils/date";

const createButtonMarkup = (name, className, isActive) => {
  return (
    `<button type="button" class="film-card__controls-item ${isActive ? `film-card__controls-item--active` : ``} button ${className}">${name}</button>`
  );
};

const createFilmCardTemplate = (film) => {

  const watchlistButton = createButtonMarkup(`Add to watchlist`, `film-card__controls-item--add-to-watchlist`, film.addToWatchlist);
  const historyButton = createButtonMarkup(`Mark as watched`, `film-card__controls-item--mark-as-watched`, film.addToHistory);
  const favoriteButton = createButtonMarkup(`Mark as favorite`, `film-card__controls-item--favorite`, film.addToFavorite);

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${film.title}</h3>
          <p class="film-card__rating">${film.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${formatDate(film.releaseDate)}</span>
            <span class="film-card__duration">${formatTime(film.duration)}</span>
            <span class="film-card__genre">${film.style}</span>
          </p>
          <img src="${film.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${film.description.length > 140 ? film.description.substr(0, 140) + `...` : film.description}</p>
          <a class="film-card__comments">${film.commentsId.length} comments</a>
          <form class="film-card__controls">
            ${watchlistButton}
            ${historyButton}
            ${favoriteButton}
          </form>
        </article>`
  );
};

export class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOpenFilmClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setHistoryButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

}
