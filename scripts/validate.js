

const settings = {
  form: ".form",
  input: ".popup__text",
  submitButton: ".form__submit-btn",
  inactiveButton: "form__submit-btn_invalid",
  inputError: "popup__text_error",
  errorClass: "form__error_active",
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.form));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const buttonElement = formElement.querySelector(settings.submitButton);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleInputErrorState(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

const toggleInputErrorState = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(settings.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputError);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    turnOffBtn(buttonElement, settings);
  } else {
    turnOnBtn(buttonElement, settings);
  }
}

function turnOffBtn(buttonElement, settings) {
  buttonElement.classList.add(settings.inactiveButton);
  buttonElement.disabled = true;
}

function turnOnBtn(buttonElement, settings) {
  buttonElement.classList.remove(settings.inactiveButton);
  buttonElement.disabled = false;
}

enableValidation(settings);
