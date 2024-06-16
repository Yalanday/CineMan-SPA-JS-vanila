import {createElement} from '../../../../render.js';
import {createFilmListViewTemplate} from "./template/create-film-list-view-template";

export default class FilmListView {
  #element = null;
  get template() {
    return createFilmListViewTemplate();
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
