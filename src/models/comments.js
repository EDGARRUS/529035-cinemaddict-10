import {FilterType} from "../controllers/filter";
import {getFilmsByFilter} from "../utils/filter";

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
    console.log(`Внутри функции эдд коммент`);
    console.log(comment);
    this._comments = [].concat(comment, this._comments);
    console.log(this._comments);
  }

  removeComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    // this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

}
