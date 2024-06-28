import {createFilmCardInfoTemplate} from './template/film-card-info-template.js';
import {createFilmCardControlsTemplate} from './template/film-card-controls-template.js';
import AbstractView from "../../../../framework/view/abstract-view";

const createFilmCardTemplate = ({filmInfo, comments}) =>
    `
    <article class="film-card">

      ${createFilmCardInfoTemplate(filmInfo, comments.length)}

      ${createFilmCardControlsTemplate()}

    </article>
  `;

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setCardClickHandler(callback) {
    this._callback.cardClick = callback;
    this.element.querySelector('a').addEventListener('click', this.#cardClickHandler);
  }

  #cardClickHandler =(evt) => {
    evt.preventDefault();
    this._callback.cardClick();
  }
}
