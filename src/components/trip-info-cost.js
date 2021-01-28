import {createElement} from '../utils';

const createTripInfoCostTemplate = (points) => {

  const priceTotal = points.reduce((sum, current) => sum + current.basePrice, 0);

  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceTotal}</span>
    </p>`);
};

export default class TripEventsItem {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._points);
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
