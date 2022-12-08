import "./index.css";

import { settings, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { data } from "autoprefixer";

const profilePopupOpenBtn = document.querySelector(".profile-info__open-popup");
const profilePopup = document.querySelector(".profile-popup");

const profileName = document.querySelector(".profile-info__name");
const profileActivity = document.querySelector(".profile-info__activity");
const profileForm = profilePopup.querySelector("#user");
const nameInput = document.querySelector("#user-name");
const activityInput = document.querySelector("#user-activity");

//Попап для карточек
const popupAddOpenBtn = document.querySelector(".profile__open-popup");
const popupAddPlace = document.querySelector(".elements-popup");

const formCard = popupAddPlace.querySelector("#formCard");
const ulElements = document.querySelector(".elements");

//Попап для изображения и заголовка карточек
export const popupImage = document.querySelector(".popup-img");
export const imageOfPopup = popupImage.querySelector(".popup__image");
export const captionImageOfPopup = popupImage.querySelector(".popup__alt");

profileName.textContent = "Жак-Ив Кусто";
profileActivity.textContent = "Исследователь океана";

const infoUserProfile = {
  profileName: "user-name",
  profileActivity: "user-activity",
};

const handleCardClick = (name, link) => {
  popupPicture.open(name, link);
};

const profileValidator = new FormValidator(settings, profileForm);
const placeAddValidator = new FormValidator(settings, formCard);
profileValidator.enableValidation();
placeAddValidator.enableValidation();

const cards = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cards.addItem(createCard(data));
    },
  },
  ulElements
);

cards.renderItems();

function createCard(data) {
  const card = new Card({ data, handleCardClick }, ".template");
  const cardElement = card.generateCard();
  return cardElement;
}

const profileInfoUsers = new UserInfo({
  profileName: profileName,
  profileActivity: profileActivity,
  inputsNames: infoUserProfile,
});

const handleFormSubmit = (info) => {
  profileInfoUsers.setUserInfo(info);
};

const handleCardFormSubmit = (data) => {
  cards.addItem(createCard(data));
};

const popupAddPlaceForm = new PopupWithForm(
  popupAddPlace,
  handleCardFormSubmit
);
popupAddPlaceForm.setEventListeners();

const popupPicture = new PopupWithImage(popupImage);
popupPicture.setEventListeners();

const profileInfoForm = new PopupWithForm(profilePopup, handleFormSubmit);
profileInfoForm.setEventListeners();

profilePopupOpenBtn.addEventListener("click", () => {
  profileInfoForm.open();
  profileValidator.clearErrors();
  const { profileActivity, profileName } = profileInfoUsers.getUserInfo();
  nameInput.value = profileName;
  activityInput.value = profileActivity;
  profileValidator.turnOffBtn();
});

popupAddOpenBtn.addEventListener("click", () => {
  placeAddValidator.clearErrors();
  placeAddValidator.turnOffBtn();
  popupAddPlaceForm.open();
});
