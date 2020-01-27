export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.altTitle = data[`film_info`][`alternative_title`];
    this.description = data[`film_info`][`description`] || ``;
    this.director =  data[`film_info`][`director`];
    this.style = data[`film_info`][`genre`];
    this.poster = data[`film_info`][`poster`];
    this.releaseDate = data[`film_info`][`release`][`date`] ? new Date(data[`film_info`][`release`][`date`]) : null;
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.rating = data[`film_info`][`total_rating`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.age = data[`film_info`][`age_rating`];

    this.commentsId = data[`comments`];

    this.userRating = data[`user_details`][`personal_rating`] ? data[`user_details`][`personal_rating`] : null;
    this.addToFavorite = Boolean(data[`user_details`][`favorite`]);
    this.addToHistory = Boolean(data[`user_details`][`already_watched`]);
    this.addToWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.watchingDate = data[`user_details`][`watching_date`];

  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.title,
        'alternative_title': this.altTitle,
        'description': this.description,
        'director': this.director,
        'genre': this.style,
        'poster': this.poster,
        'release': {
          'date': this.releaseDate ? this.releaseDate.toISOString() : null,
          'release_country': this.country,
        },
        'runtime': this.duration,
        'total_rating': this.rating,
        'writers': this.writers,
        'actors': this.actors,
        'age_rating': this.age,
      },
      'comments': this.commentsId,
      'user_details': {
        'personal_rating': this.userRating ? this.userRating : null,
        'favorite': this.addToFavorite,
        'already_watched': this.addToHistory,
        'watchlist': this.addToWatchlist,
        'watching_date': this.watchingDate
      }
    };
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }

  static clone(data) {
    return new FilmModel(data.toRAW());
  }
}
