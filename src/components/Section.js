export default class Section {
  constructor({ items, renderer }, container) {
    this._arrayInitialCards = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._arrayInitialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
