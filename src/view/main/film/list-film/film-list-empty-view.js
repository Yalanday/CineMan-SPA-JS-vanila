import {createElement} from "../../../../render";
import AbstractView from "../../../../framework/view/abstract-view";

const createFilmListEmptyViewTemplate = () =>
    `
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </div>
  `;

export default class FilmListEmptyView extends AbstractView{
  get template() {
    return createFilmListEmptyViewTemplate();
  }
}
