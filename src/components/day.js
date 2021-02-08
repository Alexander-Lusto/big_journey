import AbstractComponent from './abstract-component';
import {Month} from '../const.js';


const createTripDaysItemTemplate = (point, counter) => {
  const date = point.dateFrom.getDate();
  const month = point.dateFrom.getMonth();
  const fullYear = point.dateFrom.getFullYear();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time
          class="day__date"
          datetime="${fullYear}-${month >= 10 ? month : `0` + month}-${date >= 10 ? date : `0` + date}"
        >${Month[month]} ${date}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`);
};

export default class Day extends AbstractComponent {
  constructor(point, counter) {
    super();
    this._point = point;
    this._counter = counter;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._point, this._counter);
  }
}
