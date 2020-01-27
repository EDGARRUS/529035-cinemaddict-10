import {render, RenderPosition, replace} from "../utils/render";
import {FilmCardPopupCommentComponent} from "../components/film-card-popup";

export class FilmComment {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._submitCommentHandler = this._submitCommentHandler.bind(this);


    this._filmCardPopupCommentComponent = new FilmCardPopupCommentComponent();
  }

  recoveryListeners() {
    this._filmCardPopupCommentComponent.setSubmitCommentHandler(this._submitCommentHandler);
    this._filmCardPopupCommentComponent.setDeleteCommentHandler(this._deleteCommentHandler);
  }

  rerender(comments) {
    const newFilmCardPopupCommentComponent = new FilmCardPopupCommentComponent(comments);
    replace(newFilmCardPopupCommentComponent, this._filmCardPopupCommentComponent);
    this._filmCardPopupCommentComponent = newFilmCardPopupCommentComponent;
    this.recoveryListeners();
  }

  render(comments) {
    this._filmCardPopupCommentComponent = new FilmCardPopupCommentComponent(comments);
    render(this._container, this._filmCardPopupCommentComponent, RenderPosition.BEFOREEND);
    this.recoveryListeners();
  }

  _submitCommentHandler(e) {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      const newComment = {
        author: `RandomAuthor`,
        comment: e.target.value,
        date: new Date().toISOString(),
        emotion: `smile`,
        id: `${Math.floor(Math.random() * 1000)}`,
      };

      this._onDataChange(this, null, newComment);
    }
  }

  _deleteCommentHandler(e) {
    const id = e.target.dataset.id;
    this._onDataChange(this, id, null);
  }

}
