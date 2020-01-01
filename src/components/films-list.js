import {createElement} from "./util";

const createFilmListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">    
</div>
</section>
`
  );
};

const createFilmSectionTemplate = (title, id) => {
  return (
    `<section id="${id}" class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">
</div>
</section>`
  );
};


export class FilmsListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListTemplate();
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

export class FilmsSectionComponent {
  constructor(title, id) {
    this._element = null;
    this._title = title;
    this._id = id;
  }

  getTemplate() {
    return createFilmSectionTemplate(this._title, this._id);
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
