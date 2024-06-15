import {createElement} from '../../../../render.js';
import {createFilmListViewTemplate} from "./template/create-film-list-view-template";

export default class FilmListView {
  getTemplate() {
    return createFilmListViewTemplate();
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
