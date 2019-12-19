import {createFilmBoardTemplate, createFilmListTemplate, createFilmSectionTemplate} from './components/board.js';
import {createNavMenuTemplate} from './components/nav-menu.js';
import {createSortTemplate} from './components/sort-menu';
import {createUserTemplate} from './components/user';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createPopupFilmCardTemplate} from './components/film-card-popup';

const FILM_COUNT = 5;
const FILM_TOP_RATED_COUNT = 2;
const FILM_MOST_COMMENT_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserTemplate(), `beforeend`);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createNavMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmBoardTemplate(), `beforeend`);

const filmContainerElement = document.querySelector(`.films`);
render(filmContainerElement, createFilmListTemplate(), `beforeend`);
const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < FILM_COUNT; i++) {
  render(filmListContainerElement, createFilmCardTemplate(), `beforeend`);
}

const filmListElement = document.querySelector(`.films-list`);
render(filmListElement, createShowMoreButtonTemplate(), `beforeend`);

render(filmContainerElement, createFilmSectionTemplate(`Top Rated`, `top-rated`), `beforeend`);
const TopRatedListContainerElement = document.querySelector(`#top-rated .films-list__container`);
for (let i = 0; i < FILM_TOP_RATED_COUNT; i++) {
  render(TopRatedListContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(filmContainerElement, createFilmSectionTemplate(`Most Comment`, `most-comment`), `beforeend`);
const MostCommentListContainerElement = document.querySelector(`#most-comment .films-list__container`);
for (let i = 0; i < FILM_MOST_COMMENT_COUNT; i++) {
  render(MostCommentListContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(document.querySelector(`body`), createPopupFilmCardTemplate(), `beforeend`);
