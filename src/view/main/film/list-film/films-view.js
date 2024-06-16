import {createElement} from '../../../../render.js';
import {createFilmsViewTemplate} from "./template/create-films-view-template";

export default class FilmsView {
  #element = null;

  get template() {
    return createFilmsViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
