import AbstractComponent from "./abstract-component";

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


export class FilmsListComponent extends AbstractComponent {
  getTemplate() {
    return createFilmListTemplate();
  }
}

export class FilmsSectionComponent extends AbstractComponent {
  constructor(title, id) {
    super();
    this._title = title;
    this._id = id;
  }

  getTemplate() {
    return createFilmSectionTemplate(this._title, this._id);
  }
}
