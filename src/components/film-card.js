import AbstractComponent from "./abstract-component";

const mokupTitle = [`Bad boys`, `Good boys`, `Dirty work`, `Revenge`, `Control`, `Invisible`, `Mass Effect`, `Dragon Age`, `Witch`, `Unreal Tournament`, `Easy kill`, `About me`, `Strong Evil`, `Timeout`, `Russia 2019`];

const mokupDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);

const mokupImages = [
  `\\images\\posters\\made-for-each-other.png`,
  `\\images\\posters\\popeye-meets-sinbad.png`,
  `\\images\\posters\\sagebrush-trail.jpg`,
  `\\images\\posters\\santa-claus-conquers-the-martians.jpg`,
  `\\images\\posters\\the-dance-of-life.jpg`,
  `\\images\\posters\\the-great-flamarion.jpg`,
  `\\images\\posters\\the-man-with-the-golden-arm.jpg`,
];

const filmStyle = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const generateDescription = () => {
  const elementsNumber = getRandomIntegerNumber(1, 3);
  let filmDescription = ``;

  for (let i = 1; i <= elementsNumber; i++) {
    filmDescription += getRandomArrayItem(mokupDescription);
  }

  return filmDescription;
};

const generateDuration = () => {
  const duration = getRandomIntegerNumber(10, 160);
  const minutes = duration % 60;
  const hours = Math.floor(duration / 60);

  if (duration < 60) {
    return `${minutes}m`;
  } else if (duration >= 60 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${hours}h`;
  }
};

const generateRating = () => {
  const rate = 10 * Math.random();
  return (parseInt(rate * 10, 10)) / 10;
};


export const generateFilm = () => {
  return {
    title: getRandomArrayItem(mokupTitle),
    description: generateDescription(),
    style: getRandomArrayItem(filmStyle),
    poster: getRandomArrayItem(mokupImages),
    rating: generateRating(),
    duration: generateDuration(),
    releaseDate: getRandomIntegerNumber(1930, 200),
    commentsNumber: getRandomIntegerNumber(0, 20),
    addToFavorite: Math.random() > 0.5,
    addToHistory: Math.random() > 0.5,
    addToWatchlist: Math.random() > 0.5,
    director: `Имя директора`,
    writers: `Имена авторов`,
    actors: `Имена актеров`,
    country: `Производство фильма`,
    age: `18+`,
    comment: [
      {
        name: `Петр`,
        text: `Фильм отличный`,
        date: `Какая то дата`,
        emotion: `./images/emoji/smile.png`,
      },
      {
        name: `Иван`,
        text: `Паршивый фильм, не понравился`,
        date: `Другая дата!`,
        emotion: `./images/emoji/sleeping.png`,
      },
    ],
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

const createFilmCardTemplate = (film) => {
  return (
    `<article class="film-card">
          <h3 class="film-card__title">${film.title}</h3>
          <p class="film-card__rating">${film.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${film.releaseDate}</span>
            <span class="film-card__duration">${film.duration}</span>
            <span class="film-card__genre">${film.style}</span>
          </p>
          <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">${film.description}</p>
          <a class="film-card__comments">${film.commentsNumber} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

export class FilmCardComponent extends AbstractComponent{
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  SetOpenFilmClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
