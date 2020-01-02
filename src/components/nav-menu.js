import AbstractComponent from "./abstract-component";

const filterNames = [
  `Watchlist`, `History`, `Favorites`,
];

const filterNamesMap = {
  "Watchlist": `addToWatchlist`,
  "History": `addToHistory`,
  "Favorites": `addToFavorite`,
};

const generateFilters = () => {
  return filterNames.map((filter) => {
    return {
      name: filter,
      href: filter,
      isActive: false,
    };
  });
};

const countFilmsByFilter = (films, filter) => {
  const filmsByFilter = films.filter((film) => {
    return film[filter];
  });
  return filmsByFilter.length + 1;
};

const createNavMenuMarkup = (filmData, filter, isActive) => {
  return `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${filter.name} <span class="main-navigation__item-count">${countFilmsByFilter(filmData, filterNamesMap[filter.name])}</span></a>`;
};

const createNavMenuTemplate = (filmData, filters) => {
  const filtersMarkup = filters.map((filter, i) => createNavMenuMarkup(filmData, filter, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filtersMarkup}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

export class NavMenuComponent extends AbstractComponent {
  constructor(filmData, filters) {
    super();
    this._filmData = filmData;
    this._filters = filters;
  }

  getTemplate() {
    return createNavMenuTemplate(this._filmData, this._filters);
  }
}

export {generateFilters};
