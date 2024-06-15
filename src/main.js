import HeaderProfileView from './view/header/header-profile-view.js';
import FilterView from './view/main/film/filter-view.js';
import FooterStatisticView from './view/footer/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from "./model/films-model";
import CommentsModel from "./model/comments-model";

import {render} from './render.js';

const bodyElement = document.querySelector('body');
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterElement = bodyElement.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

render(new HeaderProfileView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new FooterStatisticView(), siteFooterStatisticsElement);


filmsPresenter.init(siteMainElement, filmsModel, commentsModel);
