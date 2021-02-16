export const POINT_TYPES = {
  TRANSFER: [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
  ],
  ACTIVITY: [
    `check-in`,
    `sightseeing`,
    `restaurant`,
  ],
};

export const DESTINATIONS = [
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

export const PHOTOS = [
  `1.jpg`,
  `2.jpg`,
  `3.jpg`,
  `4.jpg`,
  `5.jpg`,
];

const DESCRIPTIONS = [
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

const Description = {
  "Amsterdam": `Amsterdam ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "New York": `New York ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "San Francisco": `San Francisco ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "Brooklyn": `Brooklyn ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "Paris": `Paris ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "Pekin": `Pekin ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "Ireland": `Ireland ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "Los Angeles": `Los Angeles ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
  "Silent Hill": `Silent Hill ` + shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
};

export const OFFERS = [
  {
    title: `Add luggage`,
    price: 30,
    id: `luggage`,
  },
  {
    title: `Switch to comfort class`,
    price: 100,
    id: `comfort`,
  },
  {
    title: `Add meal`,
    price: 15,
    id: `meal`,
  },
  {
    title: `Choose seats`,
    price: 5,
    id: `seats`,
  },
  {
    title: `Travel by train`,
    price: 40,
    id: `train`,
  },
];

export const offers = [
  {
    "type": `taxi`,
    "offers": [
      {
        "title": `Upgrade to a business class`,
        "price": 120
      },
      {
        "title": `Choose the radio station`,
        "price": 60
      }]
  },
  {
    "type": `bus`,
    "offers": [
      {
        "title": `Choose seats`,
        "price": 80
      }]
  },
  {
    "type": `flight`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 120
      },
      {
        "title": `Switch to comfort class`,
        "price": 150
      },
      {
        "title": `Choose seats`,
        "price": 80
      }]
  },
  {
    "type": `train`,
    "offers": [
      {
        "title": `Travel by train`,
        "price": 120
      }]
  },
  {
    "type": `ship`,
    "offers": [
      {
        "title": `Add meal`,
        "price": 30
      }]
  },
  {
    "type": `transport`,
    "offers": [
      {
        "title": `Choose seats`,
        "price": 80
      },
      {
        "title": `Choose the radio station`,
        "price": 60
      }
    ]
  },
  {
    "type": `drive`,
    "offers": [
      {
        "title": `Choose seats`,
        "price": 80
      },
      {
        "title": `Choose the radio station`,
        "price": 10
      }
    ]
  },
  {
    "type": `check-in`,
    "offers": [
      {
        "title": `Add meal`,
        "price": 80
      },
      {
        "title": `Upgrade to a business apartment`,
        "price": 120
      },
    ]
  },
  {
    "type": `sightseeing`,
    "offers": []
  },
  {
    "type": `restaurant`,
    "offers": [
      {
        "title": `Add meal`,
        "price": 80
      }
    ]
  }
];

let date = Number(new Date(2021, 2, 6, 6, 0));

const generatePoint = () => {
  return {
    basePrice: getRandomNumber(0, 1000),
    dateFrom: new Date(date),
    dateTo: new Date(date += 1000 * 60 * getRandomNumber(1, 60) * getRandomNumber(1, 24)),
    isFavorite: Math.random() >= 0.5 ? true : false,
    type: Math.random() >= 0.5 ? POINT_TYPES.TRANSFER[getRandomNumber(0, POINT_TYPES.TRANSFER.length - 1)] : POINT_TYPES.ACTIVITY[getRandomNumber(0, POINT_TYPES.ACTIVITY.length - 1)],
    destination: DESTINATIONS[getRandomNumber(0, DESTINATIONS.length - 1)],
    offers: shuffleArray(OFFERS).slice(0, getRandomNumber(0, 5)),
    info: {
      description: shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(1, 5)).join(` `),
      photos: PHOTOS,
    },
  };
};

const generatePoints = (number) => {
  const array = [];
  for (let i = 1; i <= number; i++) {
    date += 1000 * 60 * getRandomNumber(1, 60) * getRandomNumber(1, 24);
    array.push(generatePoint());
  }
  return array;
};

export {generatePoints, Description};
