import {createElement} from '../utils';

const createTripDaysItemTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`);
};

export default class EventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._point, this._counter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
