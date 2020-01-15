import {RenderPosition, render} from './utils/render.js';
import {BoardComponent, StatFooterComponent} from './components/board.js';
import {NavMenuComponent} from './components/nav-menu.js';
import {UserComponent} from './components/user';
import {PageController} from "./controllers/page";
import {generateFilms} from "./components/film-card";
import FilmsModel from './models/films.js';
import {FilterComponent} from "./components/filter";
import {FilterType, FilterController} from "./controllers/filter";




const siteMainElement = document.querySelector(`.main`);

const navMenuComponent = new NavMenuComponent();
render(siteMainElement, navMenuComponent, RenderPosition.BEFOREEND);
const filmsData = generateFilms(15);
const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);

const filterController = new FilterController(navMenuComponent.getElement(), filmsModel);
filterController.render();

const pageController = new PageController(siteMainElement, filmsModel);
pageController.render();


// Отрисовка пользователя
const siteHeaderElement = document.querySelector(`.header`);
const filmsInHistory = filmsData.filter((film) => {
  return film.addToHistory;
}).length + 1;

const userComponent = new UserComponent(filmsInHistory);
render(siteHeaderElement, userComponent, `beforeend`);

// Отрисовка футера
render(document.querySelector(`.footer__statistics`), new StatFooterComponent(filmsData), RenderPosition.BEFOREEND);


