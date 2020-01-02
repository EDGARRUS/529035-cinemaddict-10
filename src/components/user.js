import AbstractComponent from "./abstract-component";

const createUserTemplate = (filmsInHistory) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${filmsInHistory}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export class UserComponent extends AbstractComponent {
  constructor(filmsInHistory) {
    super();
    this._filmsInHistory = filmsInHistory;
  }

  getTemplate() {
    return createUserTemplate(this._filmsInHistory);
  }
}
