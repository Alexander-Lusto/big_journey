import {getEventEditorTemplate} from './components/event-editor';
import {getFilterTemplate} from './components/filter';
import {getMenuTemplate} from './components/menu';
import {getSortTemplate} from './components/sort';
import {getTripDaysTemplate} from './components/trip-days';
import {getTripDaysItemTemplate} from './components/trip-days-item';
import {getTripEventsItemTemplate} from './components/trip-events-item';
import {getTripInfoTemplate} from './components/trip-info';
import {getTripInfoCostTemplate} from './components/trip-info-cost';
import {generatePoints} from './mock/point';

const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);
const pageMainEvents = pageMain.querySelector(`.trip-events`);

render(tripMain, getTripInfoTemplate(points), `afterbegin`);
render(tripControls, getMenuTemplate(), `afterbegin`);
render(tripControls, getFilterTemplate(), `beforeend`);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, getTripInfoCostTemplate(points), `beforeend`);
render(pageMainEvents, getSortTemplate(), `beforeend`);
render(pageMainEvents, getEventEditorTemplate(points[0]), `beforeend`);
render(pageMainEvents, getTripDaysTemplate(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);

const renderEventsByDays = (events) => { // Алгоритм отрисовки точек маршрута по дням:
  let daysIndex = 0; // (создали индекс для доступа к нужному дню в коллекции)
  render(tripDays, getTripDaysItemTemplate(events[0], daysIndex + 1), `beforeend`); // 1. Создать контейнер первого дня и заполнить датойОтъезда первого элемента
  let tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);

  for (let i = 1; i < events.length; i++) {
    if (events[i].dateFrom.getDate() === events[i - 1].dateFrom.getDate()) { // 2. Проверить второй элемент "если ( элемнт два происходит в этот день)"
      render(tripEventsListAll[daysIndex], getTripEventsItemTemplate(events[i]), `beforeend`); // 2.1 отрисовать элемент в этот контейнер
    } else {
      daysIndex++; // (увеличиваем индекс на 1, т.к. начался следующий день)
      render(tripDays, getTripDaysItemTemplate(events[i], daysIndex + 1), `beforeend`); // 3. Создать контейнер второго дня и заполнить датойОтъезда второго элемента
      tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);
      render(tripEventsListAll[daysIndex], getTripEventsItemTemplate(events[i]), `beforeend`); // 4. Отрисовать точку маршрута в этот контейнер
    }
  }
};

renderEventsByDays(points);
