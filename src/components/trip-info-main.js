import AbstractComponent from './abstract-component';
import {Month} from '../const.js';

const createTripInfoMainTemplate = (points) => {
  const rout = points.map((el) => el.destination).join(` &mdash; `);
  const dateFrom = points[0].dateFrom;
  const dateTo = points[points.length - 1].dateTo;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${rout}</h1>

      <p class="trip-info__dates">
          ${Month[dateFrom.getMonth()]}
          ${dateFrom.getDate()}
          &nbsp;&mdash;&nbsp;
          ${dateTo.getDate()}
      </p>
    </div>`);
};

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._points);
  }
}
