import AbstractComponent from "./abstract-component";

const createStatFooterTemplate = (array) => {
  return (
    `<p>${array.length} movies inside</p>`
  );
};

export default class StatFooterComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatFooterTemplate(this._films);
  }
}
