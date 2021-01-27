import {Month} from '../const.js';

export const getTripDaysItemTemplate = (point, counter) => {
  const date = point.dateFrom.getDate();
  const month = point.dateFrom.getMonth();
  const fullYear = point.dateFrom.getFullYear();

  return (`
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time
          class="day__date"
          datetime="${fullYear}-${month >= 10 ? month : `0` + month}-${date >= 10 ? date : `0` + date}"
        >${Month[month]} ${date}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>
  `);
};
