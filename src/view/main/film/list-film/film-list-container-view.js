import {createElement} from '../../../../render.js';
import {createFilmListContainerViewTemplate} from "./template/create-film-list-container-view-template";
import AbstractView from "../../../../framework/view/abstract-view";

export default class FilmListContainerView extends AbstractView {
  get template() {
    return createFilmListContainerViewTemplate();
  }
}
