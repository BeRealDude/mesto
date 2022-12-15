import "./index.css";

import { settings, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import { data, info } from "autoprefixer";

let currentUserId

api.getInfo().then((info) => {
  console.log("info", info);
  profileInfoUsers.setUserInfo(info);

  currentUserId = info._id
});

api.getCards().then((items) => {
  console.log("items", items);
  items.forEach((data) => {
    cards.addItem(createCard(data));
  });
});

const profilePopupOpenBtn = document.querySelector(".profile-info__open-popup");
const profilePopup = document.querySelector(".profile-popup");

const avatar = document.querySelector(".profile__avatarImg");
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
const formAvatar = document.querySelector("#formAvatar");

//Попап для изображения и заголовка карточек
export const popupImage = document.querySelector(".popup-img");
export const imageOfPopup = popupImage.querySelector(".popup__image");
export const captionImageOfPopup = popupImage.querySelector(".popup__alt");

//profileName.textContent = "Жак-Ив Кусто";
//profileActivity.textContent = "Исследователь океана";

/*const infoUserProfile = {
  profileName: "userName",
  profileActivity: "userActivity",
};*/

const handleCardClick = (name, link) => {
  popupPicture.open(name, link);
};



const profileValidator = new FormValidator(settings, profileForm);
const placeAddValidator = new FormValidator(settings, formCard);
const popupAvatarValidator = new FormValidator(settings, formAvatar); 
profileValidator.enableValidation();
placeAddValidator.enableValidation();
popupAvatarValidator.enableValidation();

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
  data.currentUserId = currentUserId;
   const card = new Card(
    { data, handleCardClick, handleDeleteClick, handleLikeCard},
    ".template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const handleLikeCard = (card) => {
 if(card.isLiked()) {
  api.dltLike(card.getId())
  .then((res) => {
    console.log("res", res);
    card.likeCard()
    card.putLike(res.likes)
  });
}else {

  api.addLike(card.getId())
  .then((res) => {
    console.log("res", res);
    card.likeCard()
    card.putLike(res.likes)
  });
}
}

const handleDeleteClick = (card) => {
  console.log("id", card.getId());
  popupDeleteCard.open();
  popupDeleteCard.changeSubmit(() => {
    api.dltCard(card.getId()).then((res) => {
      console.log("res", res);
      card.deleteCard()
    });
  });
};

const profileInfoUsers = new UserInfo({
  profileName: profileName,
  profileActivity: profileActivity,
  avatar: avatar
});
 
const btnProfile = profilePopup.querySelector(".form__submit-btn")

const handleFormSubmit = (info) => {
  btnProfile.textContent = "Сохранение..."
  api.editInfo(info).then((info) => {
    profileInfoUsers.setUserInfo(info);
    btnProfile.textContent = "Сохранить"
  });
};


const btnPopupAddPlace = popupAddPlace.querySelector(".form__submit-btn")

const handleCardFormSubmit = (data) => {
  btnPopupAddPlace.textContent = "Сохранение..."
  api.addNewCard(data).then((data) => {
    console.log("data", data);
    cards.addItem(createCard(data));
    btnPopupAddPlace.textContent = "Создать"
  });
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

const popupDelete = document.querySelector(".delete-popup");
const popupDeleteCard = new PopupWithForm(
  popupDelete /*, () => {
  console.log("удалить")
  api.dltCard(id)
  .then(res => {
    console.log("res", res)
  })
}*/
);
popupDeleteCard.setEventListeners();

const popupAvatarOpenBtn = document.querySelector(".profile__avatar");
const profilePopupAvatar = document.querySelector(".profile-popup-avatar");
const btnPopupAvatar = profilePopupAvatar.querySelector(".form__submit-btn")

const handleFormSubmitAvatar = (info) => {
  console.log("av")
  btnPopupAvatar.textContent = "Сохранение..."
  api.editAvatar(info).then((info) => {
    profileInfoUsers.setUserInfo(info);
    btnPopupAvatar.textContent = "Сохранить"
  });
};



const popupAvatar = new PopupWithForm(profilePopupAvatar, handleFormSubmitAvatar);
popupAvatar.setEventListeners();





popupAvatarOpenBtn.addEventListener("click", () => {
  popupAvatar.open();
  popupAvatarValidator.clearErrors();
  /*const { profileActivity, profileName } = profileInfoUsers.getUserInfo();
  nameInput.value = profileName;
  activityInput.value = profileActivity;*/
  popupAvatarValidator.turnOffBtn();
});


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
