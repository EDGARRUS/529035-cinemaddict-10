export default class CommentsModel {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getCommentsAll() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  addComment(comment) {
    this._comments = [].concat(this._comments, comment);
  }

  removeComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));


    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

}
