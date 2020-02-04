import moment from "moment";
import AbstractComponent from "./abstract-component";

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
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, handler);
  }
}
