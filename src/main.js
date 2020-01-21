import API from './api.js';

import {RenderPosition, render} from './utils/render.js';
import {BoardComponent, StatFooterComponent} from './components/board.js';
import {NavMenuComponent} from './components/nav-menu.js';
import {UserComponent} from './components/user';
import {PageController} from "./controllers/page";
// import {generateFilms} from "./components/film-card";
import FilmsModel from './models/films.js';
import {FilterComponent} from "./components/filter";
import {FilterType, FilterController} from "./controllers/filter";

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const api = new API(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();



const siteMainElement = document.querySelector(`.main`);

const navMenuComponent = new NavMenuComponent();
render(siteMainElement, navMenuComponent, RenderPosition.BEFOREEND);
// const filmsData = generateFilms(15);

// filmsModel.setFilms(filmsData);

const filterController = new FilterController(navMenuComponent.getElement(), filmsModel);
filterController.render();

const pageController = new PageController(siteMainElement, filmsModel, api);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
  });


// Отрисовка пользователя
const siteHeaderElement = document.querySelector(`.header`);
/* const filmsInHistory = filmsData.filter((film) => {
  return film.addToHistory;
}).length + 1;

const userComponent = new UserComponent(filmsInHistory);
render(siteHeaderElement, userComponent, `beforeend`);
*/

// Отрисовка футера
/* render(document.querySelector(`.footer__statistics`), new StatFooterComponent(filmsData), RenderPosition.BEFOREEND); */


