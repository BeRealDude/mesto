import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__text"));
  }

  _getInputValues() {
    this._inputListValues = {};
    this._inputList.forEach(
      (input) => (this._inputListValues[input.name] = input.value)
    );

    return this._inputListValues;
  }

  changeSubmit(newHandleFormSubmit) {
    this._handleFormSubmit = newHandleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}
