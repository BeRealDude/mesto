export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._arrayInitialCards = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._arrayInitialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
