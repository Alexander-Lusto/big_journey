import EventEditorComponent from './components/event-editor';
import FilterComponent from './components/filter';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import DaysComponent from './components/days';
import DayComponent from './components/day';
import EventComponent from './components/event';
import TripInfoComponent from './components/trip-info';
import TripInfoMainComponent from './components/trip-info-main';
import TripInfoCostComponent from './components/trip-info-cost';
import NoPointsComponents from './components/no-points';
import {generatePoints} from './mock/point';
import {render, RenderPosition} from './utils/render';


const POINTS_COUNT = 10;
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
const daysComponent = new DaysComponent();
const noPointsComponent = new NoPointsComponents();
// const eventEditorComponent = new EventEditorComponent(points[0]);

render(tripControls, menuComponent, RenderPosition.AFTERBEGIN);
render(tripControls, filterComponent, RenderPosition.BEFOREEND);
render(tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, tripInfoCostComponent, RenderPosition.BEFOREEND);

// EVENT (incapsulated logic)
const renderEvent = (container, event) => {
  const tripEventItemComponent = new EventComponent(event);
  const tripEventEditorComponent = new EventEditorComponent(event);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `ESC`;
    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEventToEdit = () => {
    container.replaceChild(tripEventEditorComponent.getElement(), tripEventItemComponent.getElement());
  };

  const replaceEditToEvent = () => {
    container.replaceChild(tripEventItemComponent.getElement(), tripEventEditorComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  tripEventItemComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEventEditorComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(container, tripEventItemComponent, RenderPosition.BEFOREEND);
};

// TRIP (incapsulated logic)
const renderTrip = () => {
  if (points.length === 0) {
    render(pageMainEvents, noPointsComponent, RenderPosition.BEFOREEND);
    return;
  }

  render(tripMain, tripInfoMainComponent, RenderPosition.AFTERBEGIN);
  render(pageMainEvents, sortComponent, RenderPosition.BEFOREEND);
  render(pageMainEvents, daysComponent, RenderPosition.BEFOREEND);
  const tripDays = document.querySelector(`.trip-days`);

  const renderEventsByDays = (events) => { // Алгоритм отрисовки точек маршрута по дням:
    let daysIndex = 0; // (создали индекс для доступа к нужному дню в коллекции)

    let tripDaysItemComponent = new DayComponent(events[0], daysIndex + 1);
    render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 1. Создать контейнер первого дня и заполнить датойОтъезда первого элемента

    let tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);
    renderEvent(tripEventsListAll[daysIndex], events[0]);

    for (let i = 1; i < events.length; i++) {
      if (events[i].dateFrom.getDate() === events[i - 1].dateFrom.getDate()) { // 2. Проверить второй элемент "если ( элемнт два происходит в этот день)"
        renderEvent(tripEventsListAll[daysIndex], events[i]); // 2.1 отрисовать элемент в этот контейнер
      } else {
        daysIndex++; // (увеличиваем индекс на 1, т.к. начался следующий день)

        tripDaysItemComponent = new DayComponent(events[i], daysIndex + 1);
        render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 3. Создать контейнер второго дня и заполнить датойОтъезда второго элемента

        tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);

        renderEvent(tripEventsListAll[daysIndex], events[i]); // 4. Отрисовать точку маршрута в этот контейнер
      }
    }
  };
  renderEventsByDays(points);
};
renderTrip();
