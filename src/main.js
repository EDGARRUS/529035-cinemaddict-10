import API from './api.js';
import {RenderPosition, render} from './utils/render.js';
import {StatFooterComponent} from './components/board.js';
import {NavMenuComponent} from './components/nav-menu.js';
import {UserComponent} from './components/user';
import {PageController} from "./controllers/page";
import FilmsModel from './models/films.js';
import {FilterController} from "./controllers/filter";
import {StatisticComponent} from "./components/statistic";
import {MenuItem} from "./components/nav-menu";
import {LoadingScreenComponent} from "./components/no-films";

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const api = new API(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();


const siteMainElement = document.querySelector(`.main`);

const navMenuComponent = new NavMenuComponent();
render(siteMainElement, navMenuComponent, RenderPosition.BEFOREEND);

const dateTo = new Date();
const dateFrom = null;

const statisticComponent = new StatisticComponent(filmsModel, dateTo, dateFrom);
render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);
statisticComponent.hide();

const pageController = new PageController(siteMainElement, filmsModel, api);
const loadingScreenComponent = new LoadingScreenComponent();


api.getFilms((films) => {
  render(siteMainElement, loadingScreenComponent, RenderPosition.AFTERBEGIN);
  return films;
})
  .then((films) => {
    loadingScreenComponent.removeElement();
    filmsModel.setFilms(films);

    const filterController = new FilterController(navMenuComponent.getElement(), filmsModel);
    filterController.render();

    pageController.render();

    render(document.querySelector(`.footer__statistics`), new StatFooterComponent(filmsModel.getFilms()), RenderPosition.BEFOREEND);

    const siteHeaderElement = document.querySelector(`.header`);
    const userComponent = new UserComponent(filmsModel.getFilms().filter((film) => film.watchingDate));
    render(siteHeaderElement, userComponent, `beforeend`);
  });

navMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATISTIC:
      navMenuComponent.setActiveItem(MenuItem.STATISTIC);
      pageController.hide();
      statisticComponent.show();
      break;
    default:
      statisticComponent.hide();
      pageController.show();
      break;
  }
});
