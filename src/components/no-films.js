import AbstractComponent from "./abstract-component";

const createNoFilmsTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};


export class NoFilmsComponent extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}

const createLoadingScreenTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading......</h2>
    </section>`
  );
};


export class LoadingScreenComponent extends AbstractComponent {
  getTemplate() {
    return createLoadingScreenTemplate();
  }
}
