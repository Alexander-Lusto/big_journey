const POINT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const DESTINATIONS = [
  `Amsterdam`,
  `New York`,
  `San Francisco`,
  `Brooklyn`,
  `Paris`,
  `Pekin`,
  `Ireland`,
  `Los Angeles`,
  `Silent Hill`,
];

const OPTIONS = [
  {
    title: `Add luggage`,
    price: 30,
  },
  {
    title: `Switch to comfort class`,
    price: 100,
  },
  {
    title: `Add meal`,
    price: 15,
  },
  {
    title: `Choose seats`,
    price: 5,
  },
  {
    title: `Travel by train`,
    price: 40,
  },
];

const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const generatePoint = () => {
  return {
    basePrice: getRandomNumber(0, 1000),
    dateFrom: new Date(2021, 2, 1, 6, 0),
    dateTo: new Date(2021, 2, 1, 12, 15),
    isFavorite: Math.random() >= 0.5 ? true : false,
    type: POINT_TYPES[getRandomNumber(0, POINT_TYPES.length - 1)],
    destination: DESTINATIONS[getRandomNumber(0, DESTINATIONS.length - 1)],
    offers: shuffleArray(OPTIONS).slice(0, getRandomNumber(0, 5)),
    info: {
      description: shuffleArray(DESCRIPTION).slice(0, getRandomNumber(1, 5)).join(` `),
      photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    },
  };
};

const generatePoints = (number) => {
  const array = [];
  for (let i = 1; i <= number; i++) {
    array.push(generatePoint());
  }
  return array;
};

export {generatePoints};
