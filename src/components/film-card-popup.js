import AbstractComponent from "./abstract-component";
import AbstractSmartComponent from "./abstract-smart-component";
import {formatDate, formatTime} from "../utils/date";
import moment from "moment";


const createPopupFilmCardCommentTemplate = (comments) => {

  const commentsMarkup = comments.map((comment) => {

    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
    <img src="images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
    <p class="film-details__comment-text">${comment.comment}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${comment.author}</span>
  <span class="film-details__comment-day">${moment(comment.date).format(`YYYY/MM/DD HH:MM`)}</span>
  <button data-id="${comment.id}" type="button" class="film-details__comment-delete">Delete</button>
    </p>
    </div>
    </li>`;
  }).join(``);

  const commentsContainerMarkup = `
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      </section>
    <ul class="film-details__comments-list">${commentsMarkup}</ul>`;

  const newCommentMarkup = `
    <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
    `;

  return `<div>${commentsContainerMarkup}${newCommentMarkup}</div>`;
};

const createButtonMarkup = (name, className, text, isActive) => {
  return (
    `<input type="checkbox" ${isActive ? `
checked="checked"` : ``} class="film-details__control-input visually-hidden" id="${name}" name="${name}">
        <label for="${name}" class="film-details__control-label film-details__control-label--watchlist">${text}</label>`
  );
};


const createRateFormMarkup = (film) => {

  const createRateInputMarkup = () => {
    const rateArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let markup = ``;

    rateArray.forEach((rate) => {
      markup += `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${rate}" id="rating-${rate}" ${film.userRating === rate ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-${rate}">${rate}</label>`;
    });

    return markup;
  };

  return `
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${film.poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${film.title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${createRateInputMarkup()}

            </div>
          </section>
        </div>
      </section>
    `;

};


const createPopupFilmCardTemplate = (film) => {

  const watchlistButton = createButtonMarkup(`watchlist`, `film-card__controls-item--add-to-watchlist`, `Add to watchlist`, film.addToWatchlist);
  const historyButton = createButtonMarkup(`watched`, `film-card__controls-item--mark-as-watched`, `Already watched`, film.addToHistory);
  const favoriteButton = createButtonMarkup(`favorite`, `film-card__controls-item--favorite`, `Add to favorite`, film.addToFavorite);

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${film.poster}" alt="">

          <p class="film-details__age">${film.age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.title}</h3>
              <p class="film-details__title-original">Original: ${film.altTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.rating}</p>
              ${film.userRating ? `<p class="film-details__user-rating">Your rate ${film.userRating}</p>` : ``}
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatDate(film.releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatTime(film.duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${film.style.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${film.style}</span>
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${film.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
            ${watchlistButton}
            ${historyButton}
            ${favoriteButton}
      </section>
    </div>
    <div class="form-details__middle-container">
    


    ${film.addToHistory ? createRateFormMarkup(film) : ``}
    </div>
    
    <div class="form-details__bottom-container">
    </div>

 
  </form>
</section>`
  );

};


export class FilmCardPopupComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closeButtonHandler = null;
    this._watchlistButtonClickHandler = null;
    this._historyButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
    this._rateValueButtonClickHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupFilmCardTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._closeButtonHandler = handler;
  }

  setRateValueButtonClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((input) => input.addEventListener(`change`, (evt) => {
      handler(evt.target.value);
      this._rateValueButtonClickHandler = handler;
    }));
  }


  renderUserRatingForm(filmData) {
    const container = this.getElement().querySelector(`.form-details__middle-container`);
    container.innerHTML = `${filmData.addToHistory ? createRateFormMarkup(filmData) : ``}`;
    if (filmData.addToHistory) {
      this.setClearRatingButtonClickHandler(this._clearRatingButtonClickHandler);
      this.setRateValueButtonClickHandler(this._rateValueButtonClickHandler);
    }
  }

  rerenderUserRating(filmData) {
    const oldUserRating = this.getElement().querySelector(`.film-details__rating`);
    const newUserRating = `<div class="film-details__rating">
              <p class="film-details__total-rating">${filmData.rating}</p>
              ${filmData.userRating ? `<p class="film-details__user-rating">Your rate ${filmData.userRating}</p>` : ``}
            </div>`;

    oldUserRating.innerHTML = newUserRating;
  }

  rerender(film) {
    this._film = film;
    super.rerender();
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this.setWatchlistButtonClickHandler(this._watchlistButtonClickHandler);
    this.setHistoryButtonClickHandler(this._historyButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
    this._watchlistButtonClickHandler = handler;
  }

  setHistoryButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
    this._historyButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
    this._favoriteButtonClickHandler = handler;
  }

  setClearRatingButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, handler);
    this._clearRatingButtonClickHandler = handler;
  }
}

export class FilmCardPopupCommentComponent extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createPopupFilmCardCommentTemplate(this._comments);
  }

  setSubmitCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, handler);
  }

  setDeleteCommentHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((button) => {
      button.addEventListener(`click`, handler);
    });
  }

  setSmileCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__new-comment`).addEventListener(`change`, handler);
  }
}
