import {createElement} from '../../../../render.js';
import {createFilmsViewTemplate} from "./template/create-films-view-template";
import AbstractView from "../../../../framework/view/abstract-view";

export default class FilmsView extends AbstractView{
  get template() {
    return createFilmsViewTemplate();
  }
}
