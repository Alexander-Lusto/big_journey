import EventEditorComponent from './components/event-editor';
import FilterComponent from './components/filter';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import TripDaysComponent from './components/trip-days';
import TripDaysItemComponent from './components/trip-days-item';
import TripEventsItemComponent from './components/trip-events-item';
import TripInfoComponent from './components/trip-info';
import TripInfoCostComponent from './components/trip-info-cost';
import {generatePoints} from './mock/point';
import {render, RenderPosition} from './utils';


const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);
console.log(points);

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);
const pageMainEvents = pageMain.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponent(points);
const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();
const tripInfoCostComponent = new TripInfoCostComponent(points);
const sortComponent = new SortComponent();
const eventEditorComponent = new EventEditorComponent(points[0]);
const tripDaysComponent = new TripDaysComponent();

render(tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripControls, menuComponent, RenderPosition.AFTERBEGIN);
render(tripControls, filterComponent, RenderPosition.BEFOREEND);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, tripInfoCostComponent, RenderPosition.BEFOREEND);
render(pageMainEvents, sortComponent, RenderPosition.BEFOREEND);
render(pageMainEvents, eventEditorComponent, RenderPosition.BEFOREEND);
render(pageMainEvents, tripDaysComponent, RenderPosition.BEFOREEND);

const tripDays = document.querySelector(`.trip-days`);

const renderEventsByDays = (events) => { // Алгоритм отрисовки точек маршрута по дням:
  let daysIndex = 0; // (создали индекс для доступа к нужному дню в коллекции)
  let tripDaysItemComponent = new TripDaysItemComponent(events[0], daysIndex + 1);
  render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 1. Создать контейнер первого дня и заполнить датойОтъезда первого элемента
  let tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);

  for (let i = 1; i < events.length; i++) {
    if (events[i].dateFrom.getDate() === events[i - 1].dateFrom.getDate()) { // 2. Проверить второй элемент "если ( элемнт два происходит в этот день)"
      const tripEventsItemComponent = new TripEventsItemComponent(events[i]);
      render(tripEventsListAll[daysIndex], tripEventsItemComponent, RenderPosition.BEFOREEND); // 2.1 отрисовать элемент в этот контейнер
    } else {
      daysIndex++; // (увеличиваем индекс на 1, т.к. начался следующий день)

      tripDaysItemComponent = new TripDaysItemComponent(events[0], daysIndex + 1);
      render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 3. Создать контейнер второго дня и заполнить датойОтъезда второго элемента

      tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);

      const tripEventsItemComponent = new TripEventsItemComponent(events[i]);
      render(tripEventsListAll[daysIndex], tripEventsItemComponent, RenderPosition.BEFOREEND); // 4. Отрисовать точку маршрута в этот контейнер
    }
  }
};

renderEventsByDays(points);
