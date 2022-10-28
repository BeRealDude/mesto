// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const settings = {
  form: '.form',
  input: '.popup__text',
  submitButton: '.form__submit-btn',
  inactiveButton: 'form__submit-btn_invalid',
  inputError: '.popup__text_error',
  errorClass: 'form__error_active'
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.form));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const buttonElement = formElement.querySelector(settings.submitButton);
  toggleButtonState(inputList, buttonElement, settings.submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings.inputError, settings.errorClass);
      toggleButtonState(inputList, buttonElement, settings.submitButton);
    });
  });
}

const checkInputValidity = (formElement, inputElement, inputError, errorClass) => {
  console.log(inputElement.validity.valid);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputError, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputError, errorClass);
  }
};

const showInputError = (formElement, inputElement, errorMessage, inputError, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.add(inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputError, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.remove(inputError);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    turnOffBtn(buttonElement, settings.inactiveButton);
  } else {
    turnOnBtn(buttonElement, settings.inactiveButton);
  }
}

function turnOffBtn(buttonElement, inactiveButton) {
  buttonElement.classList.add(inactiveButton);
  buttonElement.disabled = true;
}

function turnOnBtn(buttonElement, inactiveButton) {
  buttonElement.classList.remove(inactiveButton);
  buttonElement.disabled = false;
}

enableValidation(settings)