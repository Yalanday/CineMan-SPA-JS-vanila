import {createElement} from '../../../../render.js';
import {createFilmListContainerViewTemplate} from "./template/create-film-list-container-view-template";

export default class FilmListContainerView {
  getTemplate() {
    return createFilmListContainerViewTemplate();
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
