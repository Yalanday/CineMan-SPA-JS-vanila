import SortView from '../view/main/film/sort-view.js';
import FilmsView from '../view/main/film/list-film/films-view.js';
import FilmListView from '../view/main/film/list-film/film-list-view.js';
import FilmListEmptyView from "../view/main/film/list-film/film-list-empty-view";
import FilmListContainerView from '../view/main/film/list-film/film-list-container-view.js';
import FilmButtonMoreView from '../view/main/film-button-more-view.js';
import FilmCardView from '../view/main/film/card-film/film-card-view.js';
import FilmDetailsView from '../view/main/film/detail-film/film-details-view.js';

import {render} from '../render.js';
import {FILM_COUNT_PER_STEP} from "../util/const";


export default class FilmsPresenter {
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #filmDetailsComponent = null;

  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];

  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = (container, filmsModel, commentsModel) => {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#films = [...this.#filmsModel.films];

    this.#renderFilmBoard();


  };

  #renderFilm(film, container) {
    const filmCardComponent = new FilmCardView(film);

    const linkFilmCardElement = filmCardComponent.element.querySelector('a');
    linkFilmCardElement.addEventListener('click', () => {
      if (this.#filmDetailsComponent !== null) {
        this.#filmDetailsComponent.element.remove();
        this.#filmDetailsComponent = null;
      }

      this.#addFilmDetailsComponent(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
    render(filmCardComponent, container.element);
  }

  #renderFilmDetails(film) {
    const comments = [...this.#commentsModel.get(film)];

    this.#filmDetailsComponent = new FilmDetailsView(film, comments);

    const closeButtonFilmDetailsElement = this.#filmDetailsComponent.element.querySelector('.film-details__close-btn');

    closeButtonFilmDetailsElement.addEventListener('click', () => {
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    })

    render(this.#filmDetailsComponent, this.#container.parentElement);
  }

  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };
  #removeFilmDetailsComponent = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove('hide-overflow');
  };
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #filmButtonMoreClickHandler(evt) {
    evt.preventDefault();

    this.#films
        .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => {
          this.#renderFilm(film, this.#filmListContainerComponent);
        });

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  }

  #renderFilmBoard() {
    console.log('render arbeiten')
    if (this.#films.length === 0) {
      render(new FilmListEmptyView(), this.#container);
      return;
    }
    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    this.#films
        .slice(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP))
        .forEach((film) =>
            this.#renderFilm(film, this.#filmListContainerComponent)
        );

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
      this.#filmButtonMoreComponent
          .element
          .addEventListener('click', (evt) => this.#filmButtonMoreClickHandler(evt));
    }
  }
}
