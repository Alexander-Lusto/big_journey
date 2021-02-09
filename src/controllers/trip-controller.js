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

export default class TripController {
  constructor(tripMainContainer, tripEventsContainer) {
    this._tripMainContainer = tripMainContainer;
    this._tripEventsContainer = tripEventsContainer;

    this._noPointsComponent = new NoPointsComponents();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();
    this._tripInfoComponent = new TripInfoComponent();

  }

  render(points) {
    const tripMainContainer = this._tripMainContainer;
    const tripEventsContainer = this._tripEventsContainer;
    const tripInfo = this._tripInfoComponent.getElement();

    const tripInfoMainComponent = new TripInfoMainComponent(points);
    const tripInfoCostComponent = new TripInfoCostComponent(points);

    render(tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripInfo, tripInfoCostComponent, RenderPosition.BEFOREEND);

    if (points.length === 0) {
      render(tripEventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(tripInfo, tripInfoMainComponent, RenderPosition.AFTERBEGIN);

    render(tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    render(tripEventsContainer, this._daysComponent, RenderPosition.BEFOREEND);

    const renderEventsByDays = (events) => { // Алгоритм отрисовки точек маршрута по дням:
      const tripDays = tripEventsContainer.querySelector(`.trip-days`);
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
  }
}
