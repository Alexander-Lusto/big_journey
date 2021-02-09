import AbstractComponent from './abstract-component';

const createTripDaysItemTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`);
};

export default class EventsList extends AbstractComponent {
  getTemplate() {
    return createTripDaysItemTemplate(this._point, this._counter);
  }
}
