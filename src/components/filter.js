import {FILTER_NAMES} from '../const';
import {createElement} from '../utils';


const activeFilter = FILTER_NAMES[0];

const createFilterMarkup = (filters) => {
  return filters.map((filter) => {
    return `
      <div class="trip-filters__filter">
        <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden"
          type="radio" name="trip-filter" value="${filter.toLowerCase()}"
          ${activeFilter === filter ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
      </div>
    `;
  }).join(``);
};

const createFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
        ${createFilterMarkup(FILTER_NAMES)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
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
