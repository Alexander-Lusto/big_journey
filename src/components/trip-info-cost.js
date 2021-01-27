export const getTripInfoCostTemplate = (points) => {

  const priceTotal = points.reduce((sum, current) => sum + current.basePrice, 0);

  return (`
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceTotal}</span>
      </p>`);
};
