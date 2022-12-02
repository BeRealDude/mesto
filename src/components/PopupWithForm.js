import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector(".form");
    this._inputList = Array.from(this._popupSelector.querySelectorAll(".popup__text"));
  }

 _getInputValues() {
    this._inputListValues = {};
    this._inputList.forEach(input => this._inputListValues[input.name] = input.value);

    return this._inputListValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close()
    });
    
  }

  close() {
    super.close();

    this._form.reset();
  }
}