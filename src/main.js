import {getEventEditorTemplate} from './components/event-editor';
import {getFilterTemplate} from './components/filter';
import {getMenuTemplate} from './components/menu';
import {getSortTemplate} from './components/sort';
import {getTripDays} from './components/trip-days';
import {getTripDaysItem} from './components/trip-days-item';
import {getTripEventsItem} from './components/trip-events-item';
import {getTripInfoTemplate} from './components/trip-info';
import {getTripInfoCostTemplate} from './components/trip-info-cost';
import {generatePoints} from './mock/point';

const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);

console.log(points);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);
const pageMainEvents = pageMain.querySelector(`.trip-events`);

render(tripMain, getTripInfoTemplate(), `afterbegin`);
render(tripControls, getMenuTemplate(), `afterbegin`);
render(tripControls, getFilterTemplate(), `beforeend`);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, getTripInfoCostTemplate(), `beforeend`);
render(pageMainEvents, getSortTemplate(), `beforeend`);
render(pageMainEvents, getEventEditorTemplate(), `beforeend`);
render(pageMainEvents, getTripDays(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);
render(tripDays, getTripDaysItem(), `beforeend`);

const tripEventList = tripDays.querySelector(`.trip-events__list`);
const EVENTS_COUNT = 3;
for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventList, getTripEventsItem(points[0]), `beforeend`);
}

