import {createElement} from "./util";

const createUserTemplate = (filmsInHistory) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${filmsInHistory}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export class UserComponent {
  constructor(filmsInHistory) {
    this._element = null;
    this._filmsInHistory = filmsInHistory;
  }

  getTemplate() {
    return createUserTemplate(this._filmsInHistory);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
