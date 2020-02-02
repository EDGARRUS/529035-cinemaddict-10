import AbstractComponent from './abstract-component.js'

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    console.log('ререндер');
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    console.log(oldElement);
    console.log(newElement);

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
