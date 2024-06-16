import SortView from '../view/main/film/sort-view.js';
import FilmsView from '../view/main/film/list-film/films-view.js';
import FilmListView from '../view/main/film/list-film/film-list-view.js';
import FilmListContainerView from '../view/main/film/list-film/film-list-container-view.js';
import FilmButtonMoreView from '../view/main/film-button-more-view.js';
import FilmCardView from '../view/main/film/card-film/film-card-view.js';
import FilmDetailsView from '../view/main/film/detail-film/film-details-view.js';

import {render} from '../render.js';

import {FILM_COUNT} from '../util/const.js';

export default class FilmsPresenter {
  sortComponent = new SortView();
  filmsComponent = new FilmsView();
  filmListComponent = new FilmListView();
  filmListContainerComponent = new FilmListContainerView();
  filmButtonMoreComponent = new FilmButtonMoreView();

  init = (container, filmsModel, commentsModel) => {
    this.container = container;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;

    this.films = [...filmsModel.films];

    console.log(this.films)
    console.log(this.commentsModel)

    render(this.sortComponent, this.container);
    render(this.filmsComponent, this.container);
    render(this.filmListComponent, this.filmsComponent.element);
    render(this.filmListContainerComponent, this.filmListComponent.element);

    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), this.filmListContainerComponent.element);
    }

    render(this.filmButtonMoreComponent, this.filmListComponent.element);

    const comments = [...this.commentsModel.get(this.films[0])];

    render(new FilmDetailsView(this.films[0], comments), this.container.parentElement);
  };
}
