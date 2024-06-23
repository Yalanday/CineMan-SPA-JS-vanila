import AbstractView from "../../framework/view/abstract-view";

const createFilmButtonMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmButtonMoreView extends AbstractView {
  get template() {
    return createFilmButtonMoreTemplate();
  }

  setButtonClickHandler (callback) {
    //Мо могла бы сразу передавать callback в addEventListener,
    // но тогда бы для удаления обработчика в будушемб
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали  setClickHandler, что не всегда удобно.
    //1. Поэтому callback мы запишем во внутреннее свойство.
    this._callback.buttonClick = callback;
    //2. В addEventListener мы будем передавать абстрактный обработчик,
    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  #buttonClickHandler  =  (evt)  =>  {
    //3. Внутри абстрактного обработчика мы вызовем callback,
    // который мы записали во внутреннее свойство.
    evt.preventDefault();
    this._callback.buttonClick();
  }
}
