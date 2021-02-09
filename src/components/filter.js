import AbstractComponent from './abstract-component';
import {FILTER_NAMES} from '../const';

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

export default class Filter extends AbstractComponent {
  getTemplate() {
    return createFilterTemplate();
  }
}
