// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const settings = {
  form: '.form',
  input: '.popup__text',
  submitButton: '.form__submit-btn',         
  inactiveButton: '.form__submit-btn_invalid',
  inputError: '.popup__text_error',
  errorClass: '.form__error'
}; 
  
function turnOffBtn(buttonElement) {
  buttonElement.classList.add("form__submit-btn_invalid");
}

function turnOnBtn(buttonElement) {
  buttonElement.classList.remove("form__submit-btn_invalid");
}


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__text_error'); 
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__error_active'); 
 };
 
 const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__text_error'); 
  errorElement.classList.remove('form__error_active');
  errorElement.textContent = '';
 };


 const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
 } else {
  hideInputError(formElement, inputElement);
 } 
 };




function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text')); 
  const buttonElement = formElement.querySelector('.form__submit-btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
}); 
}


function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.form'));  
  
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
}); 
}

enableValidation()



function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}



  function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)) {
      turnOffBtn(buttonElement);
  } else {
    turnOnBtn(buttonElement);
  } 
    }
  