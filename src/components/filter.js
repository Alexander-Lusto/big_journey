const FILTER_NAMES = [
  `Everything`,
  `Future`,
  `Past`,
];
const activeFilter = FILTER_NAMES[0];

const createFilterTemplate = (filters) => {
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

export const getFilterTemplate = () => {
  return (`
    <form class="trip-filters" action="#" method="get">
      ${createFilterTemplate(FILTER_NAMES)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};
