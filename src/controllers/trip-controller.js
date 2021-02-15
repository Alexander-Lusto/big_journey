import SortComponent from '../components/sort';
import DaysComponent from '../components/days';
import DayComponent from '../components/day';
import TripInfoComponent from '../components/trip-info';
import TripInfoMainComponent from '../components/trip-info-main';
import TripInfoCostComponent from '../components/trip-info-cost';
import NoPointsComponents from '../components/no-points';
import {render, RenderPosition} from '../utils/render';
import {SortType} from '../const';
import PointController from './point-controller';

// EVENT (incapsulated logic)
const renderEvent = (container, point, onDataChange) => {
  const pointController = new PointController(container, onDataChange);
  pointController.render(point);
  return pointController;
};

// SORT
const getSortedPoints = (points, sortType) => {

  let sortedPoints = [];
  switch (sortType) {
    case SortType.DAY:
      sortedPoints = points.slice().sort((a, b) => a.dateFrom - b.dateFrom);
      break;
    case SortType.EVENT:
      sortedPoints = points.slice().sort((a, b) => a.type < b.type[0] ? -1 : 1);
      break;
    case SortType.TIME:
      sortedPoints = points.slice().sort((a, b) => (a.dateFrom - a.dateTo) - (b.dateFrom - b.dateTo));
      break;
    case SortType.PRICE:
      sortedPoints = points.slice().sort((a, b) => b.basePrice - a.basePrice);
      break;
    case SortType.OFFERS:
      sortedPoints = points.slice().sort((a, b) => b.offers.length - a.offers.length);
      break;
  }

  return sortedPoints;
};


export default class TripController {
  constructor(tripMainContainer, tripEventsContainer) {
    this._tripMainContainer = tripMainContainer;
    this._tripEventsContainer = tripEventsContainer;

    this._noPointsComponent = new NoPointsComponents();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();
    this._tripInfoComponent = new TripInfoComponent();

    this._points = [];
    this._onDataChange = this._onDataChange.bind(this);
  }

  renderTripInfo(points) {
    const tripMainContainer = this._tripMainContainer;
    const tripInfo = this._tripInfoComponent.getElement();

    const tripInfoMainComponent = new TripInfoMainComponent(points);
    const tripInfoCostComponent = new TripInfoCostComponent(points);

    render(tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripInfo, tripInfoCostComponent, RenderPosition.BEFOREEND);

    if (points.length === 0) {
      render(this._tripEventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(tripInfo, tripInfoMainComponent, RenderPosition.AFTERBEGIN);
  }

  renderTrip(points) {
    this._points = points;
    const tripEventsContainer = this._tripEventsContainer;

    if (points.length === 0) {
      render(this._tripEventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    render(tripEventsContainer, this._daysComponent, RenderPosition.BEFOREEND);
    const tripDays = tripEventsContainer.querySelector(`.trip-days`);

    if (this._sortComponent.getSortType() === SortType.DAY) { // Обратите внимание, в режиме сортировки точки маршрута не разбиваются по дням.
      this.renderEventsByDays(tripDays, points);
    } else {
      this.renderEventsWithoutDays(tripDays, points);
    }

    // sort
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      tripDays.innerHTML = ``;
      const sortedPoints = getSortedPoints(points, sortType);
      this.renderTrip(sortedPoints);
    });
  }

  renderEventsByDays(container, events) { // Алгоритм отрисовки точек маршрута по дням:
    let daysIndex = 0; // (создали индекс для доступа к нужному дню в коллекции)

    let tripDaysItemComponent = new DayComponent(events[0], daysIndex + 1);
    render(container, tripDaysItemComponent, RenderPosition.BEFOREEND); // 1. Создать контейнер первого дня и заполнить датойОтъезда первого элемента

    let tripEventsListAll = container.querySelectorAll(`.trip-events__list`);
    renderEvent(tripEventsListAll[daysIndex], events[0], this._onDataChange);

    for (let i = 1; i < events.length; i++) {
      if (events[i].dateFrom.getDate() === events[i - 1].dateFrom.getDate()) { // 2. Проверить второй элемент "если ( элемнт два происходит в этот день)"
        renderEvent(tripEventsListAll[daysIndex], events[i], this._onDataChange); // 2.1 отрисовать элемент в этот контейнер
      } else {
        daysIndex++; // (увеличиваем индекс на 1, т.к. начался следующий день)

        tripDaysItemComponent = new DayComponent(events[i], daysIndex + 1);
        render(container, tripDaysItemComponent, RenderPosition.BEFOREEND); // 3. Создать контейнер второго дня и заполнить датойОтъезда второго элемента

        tripEventsListAll = container.querySelectorAll(`.trip-events__list`);
        renderEvent(tripEventsListAll[daysIndex], events[i], this._onDataChange); // 4. Отрисовать точку маршрута в этот контейнер
      }
    }
  }

  renderEventsWithoutDays(container, events) { // Алгоритм отрисовки точек маршрута
    const tripDaysItemComponent = new DayComponent();
    const tripEventsList = tripDaysItemComponent.getElement().querySelector(`.trip-events__list`);
    render(container, tripDaysItemComponent, RenderPosition.BEFOREEND);

    events.forEach((event) => {
      renderEvent(tripEventsList, event, this._onDataChange);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
    console.log(this._points[index]);
  }
}
