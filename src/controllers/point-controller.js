import EventComponent from '../components/event';
import EventEditorComponent from '../components/event-editor';
import {render, RenderPosition, replace} from '../utils/render';

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this.tripEventItemComponent = null;
    this.tripEventEditorComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._replaceEventToEdit = this._replaceEventToEdit.bind(this);
    this._replaceEditToEvent = this._replaceEditToEvent.bind(this);
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

    if (oldTripEventItemComponent && oldTripEventEditorComponent) { // если есть старые компоненты - заменить
      replace(this.tripEventItemComponent, oldTripEventItemComponent);
      replace(this.tripEventEditorComponent, oldTripEventEditorComponent);
    } else { // если нет старых, отрендерить точку маршрута
      render(this._container, this.tripEventItemComponent, RenderPosition.BEFOREEND);
    }
  }

  _replaceEventToEdit() {
    this._container.replaceChild(this.tripEventEditorComponent.getElement(), this.tripEventItemComponent.getElement());
  }

  _replaceEditToEvent() {
    this._container.replaceChild(this.tripEventItemComponent.getElement(), this.tripEventEditorComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `ESC`;
    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
