import SortView from '../view/main/film/sort-view.js';
import FilmsView from '../view/main/film/list-film/films-view.js';
import FilmListView from '../view/main/film/list-film/film-list-view.js';
import FilmListContainerView from '../view/main/film/list-film/film-list-container-view.js';
import FilmButtonMoreView from '../view/main/film-button-more-view.js';
import FilmCardView from '../view/main/film/card-film/film-card-view.js';
import FilmDetailsView from '../view/main/film/detail-film/film-details-view.js';

import {render} from '../render.js';

import {FILM_COUNT} from '../const.js';

export default class FilmsPresenter {
  sortComponent = new SortView();
  filmsComponent = new FilmsView();
  filmListComponent = new FilmListView();
  filmListContainerComponent = new FilmListContainerView();
  filmButtonMoreComponent = new FilmButtonMoreView();

  init = (container) => {
    this.container = container;

    render(this.sortComponent, this.container);
    render(this.filmsComponent, this.container);
    render(this.filmListComponent, this.filmsComponent.getElement());
    render(this.filmListContainerComponent, this.filmListComponent.getElement());

    for (let i = 0; i < FILM_COUNT; i++) {
      render(new FilmCardView(), this.filmListContainerComponent.getElement());
    }

    render(this.filmButtonMoreComponent, this.filmListComponent.getElement());

    render(new FilmDetailsView(), this.container.parentElement);
  };
}
