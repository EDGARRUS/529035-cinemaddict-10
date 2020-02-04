import {remove, render, RenderPosition} from "../utils/render";
import {FilmsListComponent} from "../components/films-list";
import {FilmsSectionComponent} from "../components/films-section";
import {NoFilmsComponent} from "../components/no-films";
import {ShowMoreButtonComponent} from "../components/show-more-button";
import {SortMenuComponent, SortType} from "../components/sort-menu";
import {FilmCardController} from "./film-card";
import {BoardComponent} from "../components/board";


const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;
const FILM_COUNT_TOP_RATE = 2;
const FILM_COUNT_MOST_COMMENT = 2;


const renderFilms = (filmListElement, filmsData, onDataChange, onViewChange) => {
  return filmsData.map((film) => {
    const filmCardController = new FilmCardController(filmListElement, onDataChange, onViewChange);
    filmCardController.render(film);

    return filmCardController;
  });
};

export class PageController {
  constructor(container, filmsModel, api) {
    this._filmsModel = filmsModel;
    this._api = api;
    this._showingFilmsCount = FILM_COUNT_ON_START;

    this._showedFilmControllers = [];

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._sortMenuComponent = new SortMenuComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._oldTopFilmsSectionComponent = null;
    this._oldMostCommentFilmsSectionComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._renderTopFilmSection = this.renderTopFilmSection.bind(this);
    this._renderMostCommentFilmSection = this.renderMostCommentFilmSection.bind(this);

    this._sortMenuComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);

  }

  hide() {
    this._sortMenuComponent.hide();
    this._filmsListComponent.hide();
  }

  show() {
    this._sortMenuComponent.show();
    this._filmsListComponent.show();
  }

  _onDataChange(filmCardController, oldData, newData) {

    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {


        const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);

        if (isSuccess) {
          filmCardController.render(filmModel);

          if (oldData.commentsId.length !== newData.commentsId.length) {
            this._renderMostCommentFilmSection(document.querySelector(`.films`), this._filmsModel.getFilms());
          }

          if (oldData.userRating !== newData.userRating) {
            this._renderTopFilmSection(document.querySelector(`.films`), this._filmsModel.getFilms());
          }
        }
      });

  }

  render() {

    const filmsData = this._filmsModel.getFilms();
    const siteMainElement = document.querySelector(`.main`);
    const boardComponent = new BoardComponent();
    render(siteMainElement, this._sortMenuComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
    const filmContainerElement = document.querySelector(`.films`);
    render(filmContainerElement, this._filmsListComponent, RenderPosition.BEFOREEND);

    const filmListContainerElement = document.querySelector(`.films-list .films-list__container`);

    if (filmsData.slice().length === 0) {
      render(filmListContainerElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderFilms(filmsData.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();

    this._renderTopFilmSection(filmContainerElement, filmsData);
    this._renderMostCommentFilmSection(filmContainerElement, filmsData);


  }

  renderTopFilmSection(filmContainerElement, films) {

    if (this._oldTopFilmsSectionComponent) {
      remove(this._oldTopFilmsSectionComponent);
    }

    const filmsSectionComponent = new FilmsSectionComponent(`Top Rated`, `top-rated`);

    const filmsDataWithRating = films.filter((film) => {
      return film.rating > 0;
    });
    if (filmsDataWithRating) {
      filmsDataWithRating.sort((prev, next) => next.rating - prev.rating);
      render(filmContainerElement, filmsSectionComponent, RenderPosition.BEFOREEND);
      const TopRatedListContainerElement = document.querySelector(`#top-rated .films-list__container`);
      renderFilms(TopRatedListContainerElement, filmsDataWithRating.slice(0, FILM_COUNT_TOP_RATE), this._onDataChange, this._onViewChange);
    }

    this._oldTopFilmsSectionComponent = filmsSectionComponent;

  }

  renderMostCommentFilmSection(filmContainerElement, films) {
    if (this._oldMostCommentFilmsSectionComponent) {
      remove(this._oldMostCommentFilmsSectionComponent);
    }

    const filmsSectionComponent = new FilmsSectionComponent(`Most Comment`, `most-comment`);

    const filmsDataWithComments = films.filter((film) => {
      return film.commentsId.length > 0;
    });
    if (filmsDataWithComments) {
      filmsDataWithComments.sort((prev, next) => next.commentsId.length - prev.commentsId.length);
      render(filmContainerElement, filmsSectionComponent, RenderPosition.BEFOREEND);
      const MostCommentListContainerElement = document.querySelector(`#most-comment .films-list__container`);
      renderFilms(MostCommentListContainerElement, filmsDataWithComments.slice(0, FILM_COUNT_MOST_COMMENT), this._onDataChange, this._onViewChange);
    }

    this._oldMostCommentFilmsSectionComponent = filmsSectionComponent;
  }


  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const filmListElement = document.querySelector(`.films-list`);

    render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onViewChange() {

    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }


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
