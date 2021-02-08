import AbstractComponent from './abstract-component';

const createTripInfoCostTemplate = (points) => {
  const priceTotal = points.reduce((sum, current) => sum + current.basePrice, 0);

  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceTotal}</span>
    </p>`);
};

export default class TripEventsItem extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._points);
  }
}
