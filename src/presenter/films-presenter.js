import SortView from '../view/main/film/sort-view.js';
import FilmsView from '../view/main/film/list-film/films-view.js';
import FilmListView from '../view/main/film/list-film/film-list-view.js';
import FilmListEmptyView from "../view/main/film/list-film/film-list-empty-view";
import FilmListContainerView from '../view/main/film/list-film/film-list-container-view.js';
import FilmButtonMoreView from '../view/main/film-button-more-view.js';
// import FilmCardView from '../view/main/film/card-film/film-card-view.js';
// import FilmDetailsView from '../view/main/film/detail-film/film-details-view.js';
import {render} from "../framework/render";
import {FILM_COUNT_PER_STEP} from "../util/const";
import FilmPresenter from "./film-presenter";
import FilmDetailsPresenter from "./film-details-presenter";
import {updateItem} from "../util/util";


export default class FilmsPresenter {
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new FilmButtonMoreView();

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];

  #selectedFilm = null;

  #filmPresenter = new Map();
  #filmDetailsPresenter = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.get()];

    this.#renderFilmBoard();
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmDetails();
    }
  };

  #renderFilmButtonMore(container) {
    render(this.#filmButtonMoreComponent, container);
    this.#filmButtonMoreComponent.setButtonClickHandler(() =>
        this.#filmButtonMoreClickHandler()
    );
  }

  #renderSort(container) {
    render(this.#sortComponent, container);
  }

  #renderFilmListContainer(container) {
    render(this.#filmsComponent, container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  }

  #renderFilmList() {
    this.#renderFilms(
        0,
        Math.min(this.#films.length, FILM_COUNT_PER_STEP),
        this.#filmListContainerComponent
    );

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderFilmButtonMore(this.#filmListComponent.element);
    }
  }

  #renderFilms(from, to, container) {
    this.#films
        .slice(from, to)
        .forEach((film) =>
            this.#renderFilm(film, container)
        );
  }

  #renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(
        container,
        this.#filmChangeHandler,
        this.#addFilmDetailsComponent,
        this.#onEscKeyDown
    );
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilmDetails() {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
          this.#container.parentNode,
          this.#filmChangeHandler,
          this.#removeFilmDetailsComponent,
          this.#onEscKeyDown
      );
    }

    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
  }

  #renderFilmBoard() {
    if (this.#films.length === 0) {
      render(new FilmListEmptyView(), this.#container);
      return;
    }

    this.#renderSort(this.#container);
    this.#renderFilmListContainer(this.#container);
    this.#renderFilmList();
  }

  #addFilmDetailsComponent = (film) => {
    if (this.#selectedFilm && this.#selectedFilm.id === film.id) {
      return;
    }

    if (this.#selectedFilm && this.#selectedFilm.id !== film.id) {
      this.#removeFilmDetailsComponent();
    }

    this.#selectedFilm = film;
    this.#renderFilmDetails();

    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;

    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #filmButtonMoreClickHandler() {
    this.#renderFilms(
        this.#renderedFilmCount,
        this.#renderedFilmCount + FILM_COUNT_PER_STEP,
        this.#filmListContainerComponent,
    );

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  }
}
