import {FilmCardComponent} from "../film-card";
import {FilmCardPopupCommentComponent, FilmCardPopupComponent} from "../film-card-popup";
import {remove, render, RenderPosition} from "../utils/render";
import {FilmsListComponent, FilmsSectionComponent} from "../films-list";
import {NoFilmsComponent} from "../no-films";
import {ShowMoreButtonComponent} from "../show-more-button";

const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;
const FILM_TOP_RATED_COUNT = 2;
const FILM_MOST_COMMENT_COUNT = 2;

const renderFilm = (film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmCardPopupComponent = new FilmCardPopupComponent(film);
  const filmCardPopupCommentComponent = new FilmCardPopupCommentComponent(film);

  const filmPopupClose = () => {
    remove(filmCardPopupComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      filmPopupClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const openFilmPopup = () => {
    render(document.querySelector(`body`), filmCardPopupComponent, RenderPosition.BEFOREEND);
    render(filmCardPopupComponent.getElement().querySelector(`.film-details__comments-list`), filmCardPopupCommentComponent, RenderPosition.BEFOREEND);

    filmCardPopupComponent.SetCloseButtonClickHandler(filmPopupClose);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmCardComponent.SetOpenFilmClickHandler(openFilmPopup);

  return filmCardComponent;
};

export class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

  }

  render(filmsData) {
    const filmContainerElement = document.querySelector(`.films`);
    const filmsListComponent = new FilmsListComponent();
    render(filmContainerElement, filmsListComponent, RenderPosition.BEFOREEND);

    const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);

    if (filmsData.slice().length === 0) {
      render(filmListContainerElement, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    } else {
      let showingFilmsCount = FILM_COUNT_ON_START;
      filmsData.slice(0, showingFilmsCount).forEach((film) => render(filmListContainerElement, renderFilm(film), RenderPosition.BEFOREEND));

      const filmListElement = document.querySelector(`.films-list`);
      const showMoreButtonComponent = new ShowMoreButtonComponent();
      render(filmListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

      const filmsDataWithRating = filmsData.filter((film) => {
        return film.rating > 0;
      });
      if (filmsDataWithRating) {
        filmsDataWithRating.sort((prev, next) => next.rating - prev.rating);
        render(filmContainerElement, new FilmsSectionComponent(`Top Rated`, `top-rated`), RenderPosition.BEFOREEND);
        const TopRatedListContainerElement = document.querySelector(`#top-rated .films-list__container`);
        for (let i = 0; i < FILM_TOP_RATED_COUNT; i++) {
          render(TopRatedListContainerElement, renderFilm(filmsDataWithRating[i]), RenderPosition.BEFOREEND);
        }
      }

      const filmsDataWithComments = filmsData.filter((film) => {
        return film.commentsNumber > 0;
      });
      if (filmsDataWithComments) {
        filmsDataWithComments.sort((prev, next) => next.commentsNumber - prev.commentsNumber);
        render(filmContainerElement, new FilmsSectionComponent(`Most Comment`, `most-comment`), RenderPosition.BEFOREEND);
        const MostCommentListContainerElement = document.querySelector(`#most-comment .films-list__container`);
        for (let i = 0; i < FILM_MOST_COMMENT_COUNT; i++) {
          render(MostCommentListContainerElement, renderFilm(filmsDataWithComments[i]), RenderPosition.BEFOREEND);
        }
      }

      showMoreButtonComponent.setClickHandler (() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + FILM_COUNT_BY_BUTTON;

        filmsData.slice(prevFilmsCount, showingFilmsCount)
          .forEach((film) => render(filmListContainerElement, renderFilm(film), RenderPosition.BEFOREEND));

        if (showingFilmsCount >= filmsData.length) {
          remove(showMoreButtonComponent);
        }
      });
    }
  }
}
