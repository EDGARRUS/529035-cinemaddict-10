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


  return `<div>${filtersMarkup}</div>`

};

export class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
