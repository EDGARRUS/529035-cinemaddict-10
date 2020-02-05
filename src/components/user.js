import AbstractComponent from "./abstract-component";
import {UserRatingTitle} from "../utils/util";

const createUserTemplate = (films) => {
  let userTitle = ``;
  if (films.length >= UserRatingTitle.MOVIEBUFF) {
    userTitle = `movie buff`;
  } else if (films.length >= UserRatingTitle.FAN) {
    userTitle = `fan`;
  } else if (films.length >= UserRatingTitle.NOVICE) {
    userTitle = `novice`;
  }

  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${userTitle}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserComponent extends AbstractComponent {
  constructor(filmsWithWatchDate) {
    super();
    this._filmsWithWatchDate = filmsWithWatchDate;
  }

  getTemplate() {
    return createUserTemplate(this._filmsWithWatchDate);
  }
}
