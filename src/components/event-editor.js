import AbstractSmartComponent from './abstract-smart-component';
import {POINT_TYPES} from '../mock/point';
import {DESTINATIONS} from '../mock/point';
import {OFFERS} from '../mock/point';
import {PHOTOS} from '../mock/point';


const DEFAULT_POINT_TYPE = POINT_TYPES.TRANSFER[1];
const DEFAULT_DATE = `18/03/19 00:00`;

const TypePreposition = {
  IN: `in`,
  TO: `to`,
};

const createEventTypeListMarkup = (types) => {
  return types.map((type) => {
    const typeCapitalized = type[0].toUpperCase() + type.slice(1);
    return `
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${typeCapitalized}</label>
      </div>`;
  }).join(``);
};

const createDestinationListMarkup = (options) => {
  return options.map((option) => {
    return `<option value="${option}"></option>`;
  }).join(``);
};

const createEventOffersMarkup = (offers) => {
  return offers.map((offer, index) => {
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}">
        <label class="event__offer-label" for="event-offer-${index}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join(``);
};

const createPhotosMarkup = (photos) => {
  return photos.map((photo) => {
    return `<img class="event__photo" src="img/photos/${photo}" alt="Event photo">`;
  });
};

const getCapitalizedString = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const createEventEditorTemplate = (point) => {

  const {type, destination, offers, isFavorite, dateTo, dateFrom, basePrice} = point ? point : ``;
  const {description, photos} = point ? point.info : ``;

  let typePreposition = TypePreposition.TO;
  if (point) {
    POINT_TYPES.ACTIVITY.forEach((el) => {
      if (type === el) {
        typePreposition = TypePreposition.IN;
        return;
      }
    });
  }

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type : DEFAULT_POINT_TYPE}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createEventTypeListMarkup(POINT_TYPES.TRANSFER)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createEventTypeListMarkup(POINT_TYPES.ACTIVITY)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type ? getCapitalizedString(type) : getCapitalizedString(DEFAULT_POINT_TYPE)}
            ${typePreposition}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text"
          name="event-destination" value="${destination ? destination : ``}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationListMarkup(DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
           value="${dateFrom ? dateFrom : DEFAULT_DATE}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
            value="${dateTo ? dateFrom : DEFAULT_DATE}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
            value="${basePrice ? basePrice : ``}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      ${point ? `
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
         ${isFavorite ? `checked` : ``}
        >
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>` : ``}
      </header>
      <section class="event__details ${destination ? `` : `visually-hidden`}">
        <section class="event__section  event__section--offers ${offers ? offers : `visually-hidden`}">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createEventOffersMarkup(offers ? offers : OFFERS)}
          </div>
        </section>

        <section class="event__section  event__section--destination ${destination ? `` : `visually-hidden`}">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${description ? description : ``}
          </p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPhotosMarkup(photos ? photos : PHOTOS)}
            </div>
          </div>
        </section>
      </section>
    </form>`);
};

export default class EventEditor extends AbstractSmartComponent {
  constructor(events) {
    super();
    this._events = events;

    this._submitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._typeHandler = null;
    this._destinationHandler = null;
  }

  getTemplate() {
    return createEventEditorTemplate(this._events);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteButtonClickHandler = handler;
  }

  setTypeHandler(handler) {
    const options = this.getElement().querySelectorAll(`.event__type-list input`);
    options.forEach((type) => {
      type.addEventListener(`change`, handler);
    });
    this._typeHandler = handler;
  }

  setDestenationHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, handler);
    this._destinationHandler = handler;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setTypeHandler(this._typeHandler);
    this.setDestenationHandler(this._destinationHandler);
  }
}
