import {FilterType} from "../controllers/filter";

export const getFavoritesFilms = (films) => {
  return films.filter((film) => film.addToFavorite);
};

export const getHistoryFilms = (films) => {
  return films.filter((film) => film.addToHistory);
};

export const getWatchlistFilms = (films) => {
  return films.filter((film) => film.addToWatchlist);
};

export const getFilmsByFilter = (films, filterType) => {

  switch (filterType) {
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
  }

  return films;

};
