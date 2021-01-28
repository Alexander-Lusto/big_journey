import EventEditorComponent from './components/event-editor';
import FilterComponent from './components/filter';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import TripDaysComponent from './components/trip-days';
import TripDaysItemComponent from './components/trip-days-item';
import TripEventsItemComponent from './components/trip-events-item';
import TripInfoComponent from './components/trip-info';
import TripInfoMainComponent from './components/trip-info-main';
import TripInfoCostComponent from './components/trip-info-cost';
import NoPointsComponents from './components/no-points';
import {generatePoints} from './mock/point';
import {render, RenderPosition} from './utils';


const POINTS_COUNT = 0;
const points = generatePoints(POINTS_COUNT);
console.log(points);

// containers
const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);
const pageMainEvents = pageMain.querySelector(`.trip-events`);

// components
const tripInfoComponent = new TripInfoComponent();
const tripInfoMainComponent = new TripInfoMainComponent(points);
const tripInfoCostComponent = new TripInfoCostComponent(points);
const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();
const sortComponent = new SortComponent();
const tripDaysComponent = new TripDaysComponent();
const noPointsComponent = new NoPointsComponents();
const eventEditorComponent = new EventEditorComponent(points[0]);

// EVENT (incapsulated logic)
const renderEvent = (container, event) => {
  const tripEventsItemComponent = new TripEventsItemComponent(event);
  const tripEventEditorComponent = new EventEditorComponent(event);
  const tripEventEditButton = tripEventsItemComponent.getElement().querySelector(`.event__rollup-btn`);
  const tripEventSaveButton = tripEventEditorComponent.getElement().querySelector(`.event__save-btn`);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `ESC`;
    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEventToEdit = () => {
    container.replaceChild(tripEventEditorComponent.getElement(), tripEventsItemComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEditToEvent = () => {
    container.replaceChild(tripEventsItemComponent.getElement(), tripEventEditorComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  tripEventEditButton.addEventListener(`click`, replaceEventToEdit);
  tripEventSaveButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
  });

  render(container, tripEventsItemComponent, RenderPosition.BEFOREEND);
};

// DAYS (incapsulated logic)
const renderDays = (daysComponent, events) => {
  render(tripControls, menuComponent, RenderPosition.AFTERBEGIN);
  render(tripControls, filterComponent, RenderPosition.BEFOREEND);
  render(tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
  const tripInfo = document.querySelector(`.trip-info`);
  render(tripInfo, tripInfoCostComponent, RenderPosition.BEFOREEND);
  if (points.length === 0) {
    render(pageMainEvents, noPointsComponent, RenderPosition.BEFOREEND);
    return;
  }
  render(tripMain, tripInfoMainComponent, RenderPosition.AFTERBEGIN);
  // render page
  render(pageMainEvents, sortComponent, RenderPosition.BEFOREEND);
  render(pageMainEvents, tripDaysComponent, RenderPosition.BEFOREEND);
  const tripDays = document.querySelector(`.trip-days`);


  const renderEventsByDays = (events) => { // Алгоритм отрисовки точек маршрута по дням:
    let daysIndex = 0; // (создали индекс для доступа к нужному дню в коллекции)
    let tripDaysItemComponent = new TripDaysItemComponent(events[0], daysIndex + 1);
    render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 1. Создать контейнер первого дня и заполнить датойОтъезда первого элемента
    let tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);
    renderEvent(tripEventsListAll[daysIndex], events[0]);

    for (let i = 1; i < events.length; i++) {
      if (events[i].dateFrom.getDate() === events[i - 1].dateFrom.getDate()) { // 2. Проверить второй элемент "если ( элемнт два происходит в этот день)"
        renderEvent(tripEventsListAll[daysIndex], events[i]); // 2.1 отрисовать элемент в этот контейнер
      } else {
        daysIndex++; // (увеличиваем индекс на 1, т.к. начался следующий день)

        tripDaysItemComponent = new TripDaysItemComponent(events[i], daysIndex + 1);
        render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 3. Создать контейнер второго дня и заполнить датойОтъезда второго элемента

        tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);

        renderEvent(tripEventsListAll[daysIndex], events[i]); // 4. Отрисовать точку маршрута в этот контейнер
      }
    }
  };
  renderEventsByDays(points);

};

renderDays();
