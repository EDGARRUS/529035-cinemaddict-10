import AbstractComponent from "./abstract-component";

const createUserTemplate = (films) => {
  let userTitle = ``;
  if (films.length >= 21) {
    userTitle = `movie buff`
  } else if(films.length >= 11) {
    userTitle = `fan`
  } else if(films.length >= 1) {
    userTitle = `novice`
  }

  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${userTitle}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export class UserComponent extends AbstractComponent {
  constructor(filmsWithWatchDate) {
    super();
    this._filmsWithWatchDate = filmsWithWatchDate;
  }

  getTemplate() {
    return createUserTemplate(this._filmsWithWatchDate);
  }
}
