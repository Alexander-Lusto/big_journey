import EventEditorComponent from '../components/event-editor';
import SortComponent from '../components/sort';
import DaysComponent from '../components/days';
import DayComponent from '../components/day';
import EventComponent from '../components/event';
import TripInfoComponent from '../components/trip-info';
import TripInfoMainComponent from '../components/trip-info-main';
import TripInfoCostComponent from '../components/trip-info-cost';
import NoPointsComponents from '../components/no-points';
import {render, RenderPosition} from '../utils/render';
import {SortType} from '../const';

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
    const tripEventsContainer = this._tripEventsContainer;

    if (points.length === 0) {
      render(this._tripEventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    render(tripEventsContainer, this._daysComponent, RenderPosition.BEFOREEND);
    const tripDays = tripEventsContainer.querySelector(`.trip-days`);

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

    const renderEvents = (events) => { // Алгоритм отрисовки точек маршрута
      const tripDaysItemComponent = new DayComponent();
      const tripEventsList = tripDaysItemComponent.getElement().querySelector(`.trip-events__list`);
      render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND);

      events.forEach((event) => {
        renderEvent(tripEventsList, event);
      });
    };

    if (this._sortComponent.getSortType() === SortType.DAY) { // Обратите внимание, в режиме сортировки точки маршрута не разбиваются по дням.
      renderEventsByDays(points);
    } else {
      renderEvents(points);
    }

    // sort
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      tripDays.innerHTML = ``;
      const sortedPoints = getSortedPoints(points, sortType);
      this.renderTrip(sortedPoints);
    });
  }
}
