import {FilmCardComponent} from "../components/film-card";
import {FilmCardPopupCommentComponent, FilmCardPopupComponent} from "../components/film-card-popup";
import {remove, render, RenderPosition} from "../utils/render";
import {FilmsListComponent, FilmsSectionComponent} from "../components/films-list";
import {NoFilmsComponent} from "../components/no-films";
import {ShowMoreButtonComponent} from "../components/show-more-button";
import {SortMenuComponent, SortType} from "../components/sort-menu";
import {FilmCardController} from "./film-card";
import {BoardComponent} from "../components/board";
import {FilterComponent} from "../components/filter";

const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;
const FILM_TOP_RATED_COUNT = 2;
const FILM_MOST_COMMENT_COUNT = 2;

// Функция по рендерингу списка фильмов

const renderFilms = (filmListElement, filmsData, onDataChange, onViewChange) => {
  return filmsData.map((film) => {
    const filmCardController = new FilmCardController(filmListElement, onDataChange, onViewChange);
    filmCardController.render(film);

    return filmCardController;
  });
};

export class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._showingFilmsCount = FILM_COUNT_ON_START;

    this._showedFilmControllers = [];

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._sortMenuComponent = new SortMenuComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortMenuComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);

  }

  // Функция по обновлению данных, передается в ФильмКардКонтроллер

  _onDataChange(filmCardController, oldData, newData) {

    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmCardController.render(newData);
    }

  }

  // Функция рендеринга списка фильмов

  render() {

    const filmsData = this._filmsModel.getFilms();
    const siteMainElement = document.querySelector(`.main`);
    const boardComponent = new BoardComponent();
    render(siteMainElement, this._sortMenuComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
    const filmContainerElement = document.querySelector(`.films`);
    render(filmContainerElement, this._filmsListComponent, RenderPosition.BEFOREEND);

    const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);
    const filmListElement = document.querySelector(`.films-list`);

    // Если нет фильмов, то отображаем пустой компонент

    if (filmsData.slice().length === 0) {
      render(filmListContainerElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Если если фильмы есть, рендерим полученные данные

    this._renderFilms(filmsData.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();

    // Рендеринг секций с 2 фильмами

    /*    const filmsDataWithRating = filmsData.filter((film) => {
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
        }*/
  }

  // Описание функции рендеринга кнопки "Показать еще"

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const filmListElement = document.querySelector(`.films-list`);

    render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }


  // Функция, чтобы попапов много не было

  _onViewChange() {

    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  // Функция смены сортировки и последующего рендеринга отсортированной даты

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const filmsData = this._filmsModel.getFilms();
    let showingFilmsCount = FILM_COUNT_ON_START;

    switch (sortType) {
      case SortType.RATING:
        sortedFilms = filmsData.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DATE:
        sortedFilms = filmsData.slice().sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.DEFAULT:
        sortedFilms = filmsData.slice(0, showingFilmsCount);
        break;
    }

    const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);
    filmListContainerElement.innerHTML = ``;

    const newFilms = renderFilms(filmListContainerElement, sortedFilms.slice(0, showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;

    if (sortType === SortType.DEFAULT) {
      this._showingFilmsCount = FILM_COUNT_ON_START;
      this._renderShowMoreButton();
    } else {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, FILM_COUNT_ON_START));
    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const filmsData = this._filmsModel.getFilms();
    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + FILM_COUNT_BY_BUTTON;
    this._renderFilms(filmsData.slice(prevFilmsCount, this._showingFilmsCount));
    // this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._showingFilmsCount >= filmsData.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _removeFilms() {
    const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);

    filmListContainerElement.innerHTML = ``;
    this._showedFilmControllers = [];
  }

  _renderFilms(films) {
    const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);

    const newFilms = renderFilms(filmListContainerElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

}


