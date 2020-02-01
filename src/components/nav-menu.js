import AbstractComponent from "./abstract-component";

export const MenuItem = {
  STATISTIC: `statistic`,
};

const createNavMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
    <a href="#stats" id="statistic" class="main-navigation__item main-navigation__item--additional">Stats</a>
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

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.classList.add(`main-navigation__item--active`);
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}


