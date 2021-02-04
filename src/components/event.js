import {createElement} from '../utils';

const createTripEventsItemTemplate = (point) => {

  const {type, destination, basePrice, offers, dateFrom, dateTo} = point;

  const typeCapitalized = type[0].toUpperCase() + type.slice(1);
  const preposition = (type === `check-in` || type === `sightseeing` || type === `restaurant`) ? `in` : `to`;
  const duration = Math.round((dateTo - dateFrom) / 1000 / 60);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const getOffersTemplate = (array) => {
    return array.map((el) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${el.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${el.price}</span>
        </li>`);
    }).join(``);
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeCapitalized} ${preposition} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-19T11:20">
              ${dateFrom.getHours() >= 10 ? dateFrom.getHours() : `0` + dateFrom.getHours()}
              :
              ${dateFrom.getMinutes() >= 10 ? dateFrom.getMinutes() : `0` + dateFrom.getMinutes()}
            </time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-19T13:00">
            ${dateTo.getHours() >= 10 ? dateTo.getHours() : `0` + dateTo.getHours()}
            :
            ${dateTo.getMinutes() >= 10 ? dateTo.getMinutes() : `0` + dateTo.getMinutes()}
            </time>
          </p>
          <p class="event__duration">${hours > 0 ? hours + `H` : ``} ${minutes}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOffersTemplate(offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class Event {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripEventsItemTemplate(this._point);
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
