import AbstractComponent from './abstract-component';

const createTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`);
};

export default class TripInfo extends AbstractComponent {
  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
