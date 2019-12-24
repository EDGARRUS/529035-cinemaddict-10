import {
  createFilmBoardTemplate,
  createFilmListTemplate,
  createFilmSectionTemplate,
  createStatFooterTemplate,
} from './components/board.js';
import {createNavMenuTemplate, generateFilters} from './components/nav-menu.js';
import {createSortTemplate} from './components/sort-menu';
import {createUserTemplate} from './components/user';
import {createFilmCardTemplate, generateFilms} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createPopupFilmCardTemplate, createPopupFilmCardCommentTemplate} from './components/film-card-popup';

const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;
const FILM_TOP_RATED_COUNT = 2;
const FILM_MOST_COMMENT_COUNT = 2;
const filmsData = generateFilms(15);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const filmsInHistory = filmsData.filter((film) => {
  return film.addToHistory;
}).length + 1;
render(siteHeaderElement, createUserTemplate(filmsInHistory), `beforeend`);


const siteMainElement = document.querySelector(`.main`);

const filters = generateFilters();
render(siteMainElement, createNavMenuTemplate(filmsData, filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmBoardTemplate(), `beforeend`);

const filmContainerElement = document.querySelector(`.films`);
render(filmContainerElement, createFilmListTemplate(), `beforeend`);
const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);

let showingFilmsCount = FILM_COUNT_ON_START;
filmsData.slice(0, showingFilmsCount).forEach((task) => render(filmListContainerElement, createFilmCardTemplate(task), `beforeend`));

const filmListElement = document.querySelector(`.films-list`);
render(filmListElement, createShowMoreButtonTemplate(), `beforeend`);

const filmsDataWithRating = filmsData.filter((film) => {
  return film.rating > 0;
});
if (filmsDataWithRating) {
  filmsDataWithRating.sort((prev, next) => next.rating - prev.rating);
  render(filmContainerElement, createFilmSectionTemplate(`Top Rated`, `top-rated`), `beforeend`);
  const TopRatedListContainerElement = document.querySelector(`#top-rated .films-list__container`);
  for (let i = 0; i < FILM_TOP_RATED_COUNT; i++) {
    render(TopRatedListContainerElement, createFilmCardTemplate(filmsDataWithRating[i]), `beforeend`);
  }
}

const filmsDataWithComments = filmsData.filter((film) => {
  return film.commentsNumber > 0;
});
if (filmsDataWithComments) {
  filmsDataWithComments.sort((prev, next) => next.commentsNumber - prev.commentsNumber);
  render(filmContainerElement, createFilmSectionTemplate(`Most Comment`, `most-comment`), `beforeend`);
  const MostCommentListContainerElement = document.querySelector(`#most-comment .films-list__container`);
  for (let i = 0; i < FILM_MOST_COMMENT_COUNT; i++) {
    render(MostCommentListContainerElement, createFilmCardTemplate(filmsDataWithComments[i]), `beforeend`);
  }
}

render(document.querySelector(`.footer__statistics`), createStatFooterTemplate(filmsData), `beforeend`);
render(document.querySelector(`body`), createPopupFilmCardTemplate(filmsData[1]), `beforeend`);

render(document.querySelector(`.film-details__comments-list`), createPopupFilmCardCommentTemplate(filmsData[1]), `beforeend`);


const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILM_COUNT_BY_BUTTON;

  filmsData.slice(prevFilmsCount, showingFilmsCount)
    .forEach((task) => render(filmListContainerElement, createFilmCardTemplate(task), `beforeend`));

  if (showingFilmsCount >= filmsData.length) {
    showMoreButton.remove();
  }
});


