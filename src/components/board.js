import AbstractComponent from "./abstract-component";

const createFilmBoardTemplate = () => {
  return (
    `<section class="films">

</section>`
  );
};

export class BoardComponent extends AbstractComponent {
  getTemplate() {
    return createFilmBoardTemplate();
  }
}
