import {createElement} from '../../../../render.js';
import {createFilmListContainerViewTemplate} from "./template/create-film-list-container-view-template";

export default class FilmListContainerView {
  #element = null;
  get template() {
    return createFilmListContainerViewTemplate();
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
