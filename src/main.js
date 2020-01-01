import {RenderPosition, render} from './components/util.js';
import {BoardComponent, StatFooterComponent} from './components/board.js';
import {FilmsListComponent, FilmsSectionComponent} from './components/films-list.js';
import {NavMenuComponent, generateFilters} from './components/nav-menu.js';
import {SortMenuComponent} from './components/sort-menu';
import {UserComponent} from './components/user';
import {FilmCardComponent, generateFilms} from './components/film-card.js';
import {ShowMoreButtonComponent} from './components/show-more-button.js';
import {FilmCardPopupComponent, FilmCardPopupCommentComponent} from './components/film-card-popup';

const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;
const FILM_TOP_RATED_COUNT = 2;
const FILM_MOST_COMMENT_COUNT = 2;
const filmsData = generateFilms(15);

const siteHeaderElement = document.querySelector(`.header`);
const filmsInHistory = filmsData.filter((film) => {
  return film.addToHistory;
}).length + 1;

const userComponent = new UserComponent(filmsInHistory);
render(siteHeaderElement, userComponent.getElement(), `beforeend`);


const siteMainElement = document.querySelector(`.main`);

const filters = generateFilters();
const navMenuComponent = new NavMenuComponent(filmsData, filters);
render(siteMainElement, navMenuComponent.getElement(), RenderPosition.BEFOREEND);

const sortMenuComponent = new SortMenuComponent();
render(siteMainElement, sortMenuComponent.getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const filmContainerElement = document.querySelector(`.films`);
const filmsListComponent = new FilmsListComponent();
render(filmContainerElement, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);

const renderFilm = (film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmCardPopupComponent = new FilmCardPopupComponent(film);
  const filmCardPopupCommentComponent = new FilmCardPopupCommentComponent(film);

  const filmPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmComment = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  const filmPopupClose = () => {
    filmCardPopupComponent.getElement().remove();
    filmCardPopupComponent.removeElement();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      filmPopupClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const openFilmPopup = () => {
    render(document.querySelector(`body`), filmCardPopupComponent.getElement(), RenderPosition.BEFOREEND);
    render(filmCardPopupComponent.getElement().querySelector(`.film-details__comments-list`), filmCardPopupCommentComponent.getElement(), RenderPosition.BEFOREEND);

    const filmPopupBtnClose = filmCardPopupComponent.getElement().querySelector(`.film-details__close-btn`);
    filmPopupBtnClose.addEventListener(`click`, filmPopupClose);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmPoster.addEventListener(`click`, openFilmPopup);
  filmTitle.addEventListener(`click`, openFilmPopup);
  filmComment.addEventListener(`click`, openFilmPopup);

  return filmCardComponent.getElement();

};

let showingFilmsCount = FILM_COUNT_ON_START;
filmsData.slice(0, showingFilmsCount).forEach((film) => render(filmListContainerElement, renderFilm(film), RenderPosition.BEFOREEND));

const filmListElement = document.querySelector(`.films-list`);
const showMoreButtonComponent = new ShowMoreButtonComponent();
render(filmListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

const filmsDataWithRating = filmsData.filter((film) => {
  return film.rating > 0;
});
if (filmsDataWithRating) {
  filmsDataWithRating.sort((prev, next) => next.rating - prev.rating);
  render(filmContainerElement, new FilmsSectionComponent(`Top Rated`, `top-rated`).getElement(), RenderPosition.BEFOREEND);
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
  render(filmContainerElement, new FilmsSectionComponent(`Most Comment`, `most-comment`).getElement(), RenderPosition.BEFOREEND);
  const MostCommentListContainerElement = document.querySelector(`#most-comment .films-list__container`);
  for (let i = 0; i < FILM_MOST_COMMENT_COUNT; i++) {
    render(MostCommentListContainerElement, renderFilm(filmsDataWithComments[i]), RenderPosition.BEFOREEND);
  }
}

render(document.querySelector(`.footer__statistics`), new StatFooterComponent(filmsData).getElement(), RenderPosition.BEFOREEND);


showMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILM_COUNT_BY_BUTTON;

  filmsData.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmListContainerElement, renderFilm(film), RenderPosition.BEFOREEND));

  if (showingFilmsCount >= filmsData.length) {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
});


