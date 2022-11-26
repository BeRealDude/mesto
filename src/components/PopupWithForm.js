import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._submit = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupSelector
      .querySelector(".form")
      .addEventListener("submit", this._submit);
  }
}
