import {createElement} from '../../../../render.js';
import {createFilmCardInfoTemplate} from './template/film-card-info-template.js';
import {createFilmCardControlsTemplate} from './template/film-card-controls-template.js';

const createFilmCardTemplate = ({filmInfo, comments}) =>
  `
    <article class="film-card">

      ${createFilmCardInfoTemplate(filmInfo, comments.length)}

      ${createFilmCardControlsTemplate()}

    </article>
  `;

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }
  get template() {
    return createFilmCardTemplate(this.#film);
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
