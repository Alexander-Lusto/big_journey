import TripController from './controllers/trip-controller';
import FilterComponent from './components/filter';
import MenuComponent from './components/menu';
import {generatePoints} from './mock/point';
import {render, RenderPosition} from './utils/render';

// data
const POINTS_COUNT = 10;
const points = generatePoints(POINTS_COUNT);
console.log(points);

// containers
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);
const tripControls = tripMain.querySelector(`.trip-controls`);

// components
const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();
const TripControllerComponent = new TripController(tripMain, tripEvents);

// render
render(tripControls, menuComponent, RenderPosition.AFTERBEGIN);
render(tripControls, filterComponent, RenderPosition.BEFOREEND);
TripControllerComponent.renderTripInfo(points);
TripControllerComponent.renderTrip(points);
