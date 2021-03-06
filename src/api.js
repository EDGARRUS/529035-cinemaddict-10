import FilmModel from "./models/film";
import CommentModel from "./models/comment";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(FilmModel.parseFilms);
  }

  getFilmComments(id) {
    return this._load({url: `comments/${id}`})
      .then((response) => response.json())
      .then(FilmModel.parseComments);
  }

  createComment(comment, filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then((response) => response.json())
      .then(CommentModel.parseComment(comment.toRAW()));
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then((response) => response.json())
      .then(FilmModel.parseFilm);
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
