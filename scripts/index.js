// Плучить элементы

const popupOpenedButton = document.querySelector(".profile-info__open-popup");
const popup = document.querySelector(".popup");
const popupClouseButton = popup.querySelector(".popup__clouse");

let profileName = document.querySelector(".profile-info__name");
let profileActivity = document.querySelector(".profile-info__activity");

let form = document.querySelector(".form");

let nameInput = document.querySelector("#name");
let activityInput = document.querySelector("#activity");

profileName.textContent = "Жак-Ив Кусто";
profileActivity.textContent = "Исследователь океана";

function popupAdd() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
}

function popupRemove() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  popupRemove();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
}

popupClouseButton.addEventListener("click", popupRemove);
popupOpenedButton.addEventListener("click", popupAdd);
form.addEventListener("submit", formSubmitHandler);