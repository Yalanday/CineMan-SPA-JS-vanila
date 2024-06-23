import {createElement} from '../../../../render.js';
import {createFilmListViewTemplate} from "./template/create-film-list-view-template";
import AbstractView from "../../../../framework/view/abstract-view";

export default class FilmListView extends AbstractView {
  get template() {
    return createFilmListViewTemplate();
  }
}
