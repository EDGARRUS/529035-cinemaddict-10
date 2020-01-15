import AbstractComponent from "./abstract-component";

const createNavMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

export class NavMenuComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createNavMenuTemplate();
  }
}


