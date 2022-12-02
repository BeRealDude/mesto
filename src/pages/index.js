import { settings, initialCards} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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



/*const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  //const date = {
   // name: titleInput.value,
   // link: placeInput.value,
  //};
  const card = new Card(
    { name: titleInput.value, link: placeInput.value },
    ".template"
  );
  //createCard(date);
  cards.addItem(card.generateCard());

  closePopup(popupAddPlace);
  evt.target.reset();

  placeAddValidator.turnOffBtn();
};*/

/*profilePopupOpenBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  profileValidator.clearErrors();
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  profileValidator.turnOffBtn();
});*/

/*popupAddOpenBtn.addEventListener("click", () => {
  formCard.open();
  titleInput.value = "";
  placeInput.value = "";
  placeAddValidator.clearErrors();
  placeAddValidator.turnOffBtn();
});*/

/*profilePopupCloseBtn.addEventListener("click", () => {
  closePopup(profilePopup);
});

popupAddCloseBtn.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});*/

//profileForm.addEventListener("submit", handleProfileFormSubmit);

//formCard.addEventListener("submit", handleCardFormSubmit);

const infoUserProfile = {
  profileName: "user-name",
  profileActivity: "user-activity"
}


const handleCardClick = (name, link) => {
  popupPicture.open(name, link);
};

const profileValidator = new FormValidator(settings, profileForm);
const placeAddValidator = new FormValidator(settings, formCard);
profileValidator.enableValidation();
placeAddValidator.enableValidation();

/*initialCards.forEach((item) => {
  const card = createCard(item);
  ulElements.append(card);
});*/

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

const handleCardFormSubmit = () => cards.addItem(createCard({ name: titleInput.value, link: placeInput.value }));

const profileInfoUsers = new UserInfo({
  profileName: profileName,
  profileActivity: profileActivity,
  inputsNames: infoUserProfile
});


const handleFormProfileSubmit = (info) => {
  profileInfoUsers.setUserInfo(info);
};

const popupAddPlaceForm = new PopupWithForm(popupAddPlace, handleCardFormSubmit);
popupAddPlaceForm.setEventListeners();

const popupPicture = new PopupWithImage(popupImage);
popupPicture.setEventListeners();


const profileInfoForm = new PopupWithForm(profilePopup, handleFormProfileSubmit)
profileInfoForm.setEventListeners();

profilePopupOpenBtn.addEventListener("click", () => {
  profileInfoForm.open();
 profileValidator.clearErrors();
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  profileValidator.turnOffBtn();
  
});



popupAddOpenBtn.addEventListener("click", () => {
  titleInput.value = "";
  placeInput.value = "";
  placeAddValidator.clearErrors();
  placeAddValidator.turnOffBtn();
  popupAddPlaceForm.open();
});




