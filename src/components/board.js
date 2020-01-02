import AbstractComponent from "./abstract-component";

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

export class BoardComponent extends AbstractComponent{
  getTemplate() {
    return createFilmBoardTemplate();
  }
}

export class StatFooterComponent extends AbstractComponent{
  constructor(stat) {
    super();
    this._stat = stat;
  }

  getTemplate() {
    return createStatFooterTemplate(this._stat);
  }
}
