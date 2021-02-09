import AbstractComponent from './abstract-component';
import {SortType} from '../const';

// const sortTypes = SortType.keys();
const SORT_TYPES = Object.values(SortType);
const SORT_TYPE_DEFAULT = SortType.DAY;

const createSortMarkup = (sortTypes) => {
  return sortTypes.map((type) => {
    return (`
      <div class="trip-sort__item  trip-sort__item--${type.toLowerCase()}">
        <input
          id="sort-${type.toLowerCase()}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${type.toLowerCase()}"
          data-sort-type="${type}"
          ${SORT_TYPE_DEFAULT === type ? `checked` : ``}
          >
        <label class="trip-sort__btn" for="sort-${type.toLowerCase()}">
          ${type}
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>
    `);
  }).join(``);
};

const createSortTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortMarkup(SORT_TYPES)}
    </form>`);
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SORT_TYPE_DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }
      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
