import EventComponent from '../components/event';
import EventEditorComponent from '../components/event-editor';
import {render, RenderPosition, replace} from '../utils/render';
import {Description, offers} from '../mock/point';

const getOffersByType = (type, array) => {
  let result = array.find((el) => type === el[`type`]);
  console.log(result);
  return result.offers;
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
}

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this.tripEventItemComponent = null;
    this.tripEventEditorComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._replaceEventToEdit = this._replaceEventToEdit.bind(this);
    this._replaceEditToEvent = this._replaceEditToEvent.bind(this);

    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  render(point) {
    const oldTripEventItemComponent = this.tripEventItemComponent;
    const oldTripEventEditorComponent = this.tripEventEditorComponent;

    this.tripEventItemComponent = new EventComponent(point);
    this.tripEventEditorComponent = new EventEditorComponent(point);

    this.tripEventItemComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this.tripEventEditorComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this.tripEventEditorComponent.setFavoriteButtonClickHandler(() => {
      const changedPoint = Object.assign({}, point, {isFavorite: !point.isFavorite});
      this._onDataChange(this, point, changedPoint);
    });

    this.tripEventEditorComponent.setTypeHandler((evt) => {
      const changedPoint = Object.assign({}, point, {
        destination: ``,
        type: evt.target.value,
        offers: getOffersByType(evt.target.value, offers),
      });
      this._onDataChange(this, point, changedPoint);
    });

    this.tripEventEditorComponent.setDestenationHandler((evt) => {
      const changedPoint = Object.assign({}, point, {
        destination: evt.target.value,
        info: {
          description: Description[evt.target.value],
        }
      });
      this._onDataChange(this, point, changedPoint);
    });

    if (oldTripEventItemComponent && oldTripEventEditorComponent) { // если есть старые компоненты - заменить
      replace(this.tripEventItemComponent, oldTripEventItemComponent);
      replace(this.tripEventEditorComponent, oldTripEventEditorComponent);
    } else { // если нет старых, отрендерить точку маршрута
      render(this._container, this.tripEventItemComponent, RenderPosition.BEFOREEND);
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    this._container.replaceChild(this.tripEventEditorComponent.getElement(), this.tripEventItemComponent.getElement());
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    this._container.replaceChild(this.tripEventItemComponent.getElement(), this.tripEventEditorComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `ESC`;
    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
