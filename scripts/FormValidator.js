

class FormValidator {
  constructor(objSettings, form) {
    (this._objSettings = objSettings),
      (this._form = form),
      (this._input = objSettings.input),
      (this._submitButton = objSettings.submitButton),
      (this._inactiveButton = objSettings.inactiveButton),
      (this._inputError = objSettings.inputError),
      (this._errorClass = objSettings.errorClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
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

    inputElement.classList.add(this._inputError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._turnOffBtn();
    } else {
      this._turnOnBtn();
    }
  }

  _turnOffBtn() {
    this._buttonElement.classList.add(this._inactiveButton);
    this._buttonElement.disabled = true;
  }

  _turnOnBtn() {
    this._buttonElement.classList.remove(this._inactiveButton);
    this._buttonElement.disabled = false;
  }
}

export default FormValidator;
