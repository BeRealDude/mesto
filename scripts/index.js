// Плучить элементы

const popupOpenedButton = document.querySelector('.profile-info__open-popup');
const popup = document.querySelector('.popup');
const popupClouseButton = popup.querySelector('.popup__clouse');

let profileName = document.querySelector('.profile-info__name');
let profileActivity = document.querySelector('.profile-info__activity');

let form = document.querySelector('.popup__input');

let nameInput = document.querySelector('.popup__text_type_name');
let activityInput = document.querySelector('.popup__text_type_activity');
let formSaveButton = document.querySelector('.form__submit-btn_action_save');

profileName.textContent = 'Жак-Ив Кусто';
profileActivity.textContent = 'Исследователь океана';

function clickForm() {
    nameInput.value = '';
    activityInput.value = ''; 
};
nameInput.addEventListener("click", clickForm);


 function popupAdd() {
    popup.classList.add("popup_opened");
};

 function popupRemove() {
    popup.classList.remove("popup_opened");
};

popupOpenedButton.addEventListener("click", popupAdd);
popupClouseButton.addEventListener("click", popupRemove);

formSaveButton.addEventListener("click", formSubmitHandler);
formSaveButton.addEventListener("click", popupRemove);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value; 
};       

form.addEventListener("submit", formSubmitHandler); 