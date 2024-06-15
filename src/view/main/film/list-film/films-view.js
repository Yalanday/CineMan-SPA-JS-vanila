import {createElement} from '../../../../render.js';
import {createFilmsViewTemplate} from "./template/create-films-view-template";

export default class FilmsView {
  getTemplate() {
    return createFilmsViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
