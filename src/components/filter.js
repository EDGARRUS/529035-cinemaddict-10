import AbstractComponent from "./abstract-component";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter, isActive) => {
  return `<a id="filter__${filter.name}" href="#${filter.name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`;
};

const createFilterTemplate = (filters) => {

  const filtersMarkup = filters.map((filter) => createFilterMarkup(filter, filter.checked)).join(`\n`);


  return `<div>
<a id="filter__all" href="#all" class="main-navigation__item main-navigation__item--active">all</a>
${filtersMarkup}</div>`;
};

export default class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
        evt.target.classList.add(`main-navigation__item--active`);
        const filterName = getFilterNameById(evt.target.id);
        handler(filterName);
      }
    });
  }
}
