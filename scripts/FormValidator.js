class FormValidator {
  constructor(objSettings, form) {
    (this._objSettings = objSettings),
      (this._form = form),
      (this._selectorInput = objSettings.selectorInput),
      (this._selectorSubmitButton = objSettings.selectorSubmitButton),
      (this._selectorInactiveButton = objSettings.selectorInactiveButton),
      (this._selectorInputError = objSettings.selectorInputError),
      (this._selectorErrorClass = objSettings.selectorErrorClass);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectorInput)
    );
    this._buttonElement = this._form.querySelector(this._selectorSubmitButton);
  }

  enableValidation() {
    this._form.addEventListener("submit", () => {});

    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleInputErrorState = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._selectorInputError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._selectorErrorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._selectorInputError);
    errorElement.classList.remove(this._selectorErrorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.turnOffBtn();
    } else {
      this._turnOnBtn();
    }
  }

  turnOffBtn() {
    this._buttonElement.classList.add(this._selectorInactiveButton);
    this._buttonElement.disabled = true;
  }

  _turnOnBtn() {
    this._buttonElement.classList.remove(this._selectorInactiveButton);
    this._buttonElement.disabled = false;
  }

  clearErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

export default FormValidator;
