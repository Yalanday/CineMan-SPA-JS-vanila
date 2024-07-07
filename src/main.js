import HeaderProfileView from './view/header/header-profile-view.js';
import FilterView from './view/main/film/filter-view.js';
import FooterStatisticView from './view/footer/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from "./model/films-model";
import CommentsModel from "./model/comments-model";
import {render} from "./framework/render";
import {generateFilter} from "./mock/filter";
import {getUserStatus} from "./util/users";



const bodyElement = document.querySelector('body');
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterElement = bodyElement.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

const userStatus  = getUserStatus(filmsModel.get());
const filters = generateFilter(filmsModel.get());
const filmCount  = filmsModel.get().length;

render(new HeaderProfileView(userStatus), siteHeaderElement);
render(new FilterView(filters), siteMainElement);
render(new FooterStatisticView(filmCount), siteFooterStatisticsElement);


filmsPresenter.init();
