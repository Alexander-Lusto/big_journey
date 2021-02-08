import AbstractComponent from './abstract-component';

const createEventEditButtonTemplate = () => {
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`);
};

export default class EventEditButton extends AbstractComponent {
  getTemplate() {
    return createEventEditButtonTemplate(this._point);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
