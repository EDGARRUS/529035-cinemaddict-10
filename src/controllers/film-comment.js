import {render, RenderPosition, replace} from "../utils/render";
import {FilmCardPopupCommentComponent} from "../components/film-comments";
import he from "he";

const SHAKE_ANIMATION_TIMEOUT = 600;

export class FilmComment {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._submitCommentHandler = this._submitCommentHandler.bind(this);
    this._smileCommentHandler = this._smileCommentHandler.bind(this);
    this.shake = this.shake.bind(this);

    this._filmCardPopupCommentComponent = new FilmCardPopupCommentComponent();
  }

  recoveryListeners() {
    this._filmCardPopupCommentComponent.setSubmitCommentHandler(this._submitCommentHandler);
    this._filmCardPopupCommentComponent.setDeleteCommentHandler(this._deleteCommentHandler);
    this._filmCardPopupCommentComponent.setSmileCommentHandler(this._smileCommentHandler);
  }

  rerender(comments) {
    const newFilmCardPopupCommentComponent = new FilmCardPopupCommentComponent(comments);
    replace(newFilmCardPopupCommentComponent, this._filmCardPopupCommentComponent);
    this._filmCardPopupCommentComponent = newFilmCardPopupCommentComponent;
    this.recoveryListeners();
  }

  render(comments) {
    this._filmCardPopupCommentComponent = new FilmCardPopupCommentComponent(comments);
    render(document.querySelector(`.form-details__bottom-container`), this._filmCardPopupCommentComponent, RenderPosition.BEFOREEND);
    this.recoveryListeners();
  }

  _submitCommentHandler(e) {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {

      if (this._filmCardPopupCommentComponent.getElement().querySelector(`.film-details__add-emoji-label img`)) {
        const smileActive = this._filmCardPopupCommentComponent.getElement().querySelector(`.film-details__add-emoji-label img`).id;

        const newComment = {
          comment: he.encode(e.target.value),
          date: new Date().toISOString(),
          emotion: smileActive,
        };

        this._onDataChange(this, null, newComment);

      } else {
        this.shake();
      }

    }
  }

  _deleteCommentHandler(e) {
    const id = e.target.dataset.id;
    e.target.textContent = `Deleting...`;
    e.target.disabled = true;
    this._onDataChange(this, id, null);
  }

  _smileCommentHandler(e) {
    const smilePlace = this._filmCardPopupCommentComponent.getElement().querySelector(`.film-details__add-emoji-label`);
    smilePlace.innerHTML = ``;
    const smileActive = e.target.id.substr(6);
    const smileMarkup = `<img id="${smileActive}" src="images/emoji/${smileActive}.png" width="55" height="55" alt="emoji">`;
    smilePlace.insertAdjacentHTML(`beforeend`, smileMarkup);
  }

  shake() {
    this._filmCardPopupCommentComponent.getElement().querySelector(`.film-details__new-comment`).style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    this._filmCardPopupCommentComponent.getElement().querySelector(`.film-details__comment-input`).style.border = `1px solid red`;

    setTimeout(() => {
      this._filmCardPopupCommentComponent.getElement().querySelector(`.film-details__new-comment`).style.animation = ``;
      this._filmCardPopupCommentComponent.getElement().querySelector(`.film-details__comment-input`).style.border = ``;

    }, SHAKE_ANIMATION_TIMEOUT);
  }

}
