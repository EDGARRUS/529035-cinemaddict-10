import AbstractComponent from "./abstract-component";

const createLoadingScreenTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading......</h2>
    </section>`
  );
};


export default class LoadingScreenComponent extends AbstractComponent {
  getTemplate() {
    return createLoadingScreenTemplate();
  }
}
