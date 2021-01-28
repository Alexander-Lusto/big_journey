import {Month} from '../const.js';
import {createElement} from '../utils';

const createTripInfoTemplate = (points) => {
  const rout = points.map((el) => el.destination).join(` &mdash; `);
  const dateFrom = points[0].dateFrom;
  const dateTo = points[points.length - 1].dateTo;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${rout}</h1>

        <p class="trip-info__dates">
          ${Month[dateFrom.getMonth()]}
          ${dateFrom.getDate()}
          &nbsp;&mdash;&nbsp;
          ${dateTo.getDate()}
        </p>
      </div>
    </section>`);
};

export default class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
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
