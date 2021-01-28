import {Month} from '../const.js';

export const getTripInfoTemplate = (points) => {
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
