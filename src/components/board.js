import {createElement} from "./util";

const createFilmBoardTemplate = () => {
  return (
    `<section class="films">

</section>`
  );
};

const createStatFooterTemplate = (array) => {
  return (
    `<p>${array.length} movies inside</p>`
  );
};

export class BoardComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmBoardTemplate();
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

export class StatFooterComponent {
  constructor(stat) {
    this._element = null;
    this._stat = stat;
  }

  getTemplate() {
    return createStatFooterTemplate(this._stat);
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
