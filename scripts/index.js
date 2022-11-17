import { settings, initialCards } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profilePopupOpenBtn = document.querySelector(".profile-info__open-popup");
const profilePopup = document.querySelector(".profile-popup");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile-info__name");
const profileActivity = document.querySelector(".profile-info__activity");
const profileForm = profilePopup.querySelector("#user");
const nameInput = document.querySelector("#user-name");
const activityInput = document.querySelector("#user-activity");

//Попап для карточек
const popupAddOpenBtn = document.querySelector(".profile__open-popup");
const popupAddPlace = document.querySelector(".elements-popup");
const popupAddCloseBtn = popupAddPlace.querySelector("#popup-add-close");

const formCard = popupAddPlace.querySelector("#formCard");
const ulElements = document.querySelector(".elements");

const titleInput = document.querySelector("#formCard-title");
const placeInput = document.querySelector("#formCard-place");

//Попап для изображения и заголовка карточек
export const popupImage = document.querySelector(".popup-img");
export const imageOfPopup = popupImage.querySelector(".popup__image");
export const captionImageOfPopup = popupImage.querySelector(".popup__alt");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");

profileName.textContent = "Жак-Ив Кусто";
profileActivity.textContent = "Исследователь океана";

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupByEscape(evt) {
  if (evt.key !== "Escape") {
    return;
  }
  const popupOpened = document.querySelector(".popup_opened");
  closePopup(popupOpened);
}

const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(overlay);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  closePopup(profilePopup);
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  profileValidator.turnOffBtn();
}

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const date = {
    name: titleInput.value,
    link: placeInput.value,
  };
  const card = createCard(date);
  ulElements.prepend(card);

  closePopup(popupAddPlace);
  evt.target.reset();

  placeAddValidator.turnOffBtn();
};

profilePopupOpenBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  profileValidator.clearErrors();
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  profileValidator.turnOffBtn();
});

popupAddOpenBtn.addEventListener("click", () => {
  openPopup(popupAddPlace);
  titleInput.value = "";
  placeInput.value = "";
  placeAddValidator.clearErrors();
  placeAddValidator.turnOffBtn();
});

profilePopupCloseBtn.addEventListener("click", () => {
  closePopup(profilePopup);
});

popupAddCloseBtn.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

formCard.addEventListener("submit", handleCardFormSubmit);

const profileValidator = new FormValidator(settings, profileForm);
const placeAddValidator = new FormValidator(settings, formCard);
profileValidator.enableValidation();
placeAddValidator.enableValidation();

function createCard(date) {
  const card = new Card(date, ".template");
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const card = createCard(item);
  ulElements.append(card);
});
