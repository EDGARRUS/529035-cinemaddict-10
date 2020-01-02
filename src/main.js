import {RenderPosition, render, remove} from './components/utils/render.js';
import {BoardComponent, StatFooterComponent} from './components/board.js';
import {NavMenuComponent, generateFilters} from './components/nav-menu.js';
import {SortMenuComponent} from './components/sort-menu';
import {UserComponent} from './components/user';
import {PageController} from "./components/controllers/board";
import {generateFilms} from "./components/film-card";


const filmsData = generateFilms(15);
const siteMainElement = document.querySelector(`.main`);



const filters = generateFilters();
const navMenuComponent = new NavMenuComponent(filmsData, filters);
render(siteMainElement, navMenuComponent, RenderPosition.BEFOREEND);

const sortMenuComponent = new SortMenuComponent();
render(siteMainElement, sortMenuComponent, RenderPosition.BEFOREEND);
const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(boardComponent);
pageController.render(filmsData);

const siteHeaderElement = document.querySelector(`.header`);
const filmsInHistory = filmsData.filter((film) => {
  return film.addToHistory;
}).length + 1;

const userComponent = new UserComponent(filmsInHistory);
render(siteHeaderElement, userComponent, `beforeend`);


render(document.querySelector(`.footer__statistics`), new StatFooterComponent(filmsData), RenderPosition.BEFOREEND);


