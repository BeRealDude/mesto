

const profilePopupOpenBtn = document.querySelector(".profile-info__open-popup");
const profilePopup = document.querySelector(".profile-popup");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile-info__name");
const profileActivity = document.querySelector(".profile-info__activity");
const profileForm = profilePopup.querySelector("#user");
const nameInput = document.querySelector("#user-name");
const activityInput = document.querySelector("#user-activity");
const userNameError = document.querySelector("#user-name-error");
const activityError = document.querySelector("#user-activity-error");

//Попап для карточек
const popupAddOpenBtn = document.querySelector(".profile__open-popup");
const popupAddPlace = document.querySelector(".elements-popup");
const popupAddCloseBtn = popupAddPlace.querySelector("#popup-add-close");
const formCardTitleError = document.querySelector("#formCard-title-error");
const formCardPlaceError = document.querySelector("#formCard-place-error");

const formCard = popupAddPlace.querySelector("#formCard");
const ulElements = document.querySelector(".elements");
const template = document.querySelector(".template");
const titleInput = document.querySelector("#formCard-title");
const placeInput = document.querySelector("#formCard-place");

//Попап для изображения и заголовка карточек
const popupImage = document.querySelector(".popup-img");
const imageOfPopup = popupImage.querySelector(".popup__image");
const captionImageOfPopup = popupImage.querySelector(".popup__alt");
const closePopupImage = popupImage.querySelector(".popup__close");

profileName.textContent = "Жак-Ив Кусто";
profileActivity.textContent = "Исследователь океана";

function removeErrorClass() {
  userNameError.textContent = "";
  activityError.textContent = "";
  nameInput.classList.remove("popup__text_error");
  activityInput.classList.remove("popup__text_error");

  formCardTitleError.textContent = "";
  formCardPlaceError.textContent = "";
  titleInput.classList.remove("popup__text_error");
  placeInput.classList.remove("popup__text_error");
  titleInput.value = "";
  placeInput.value = "";
}

function openPopup(popup) {
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
  removeErrorClass();
}

const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(overlay);
      removeErrorClass();
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(profilePopup);
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
}

const createCardNode = (name, link) => {
  const currentItem = template.content.cloneNode(true);
  const elementsImg = currentItem.querySelector(".elements__maskGroup");
  const elementsTitle = currentItem.querySelector(".elements__title");
  elementsImg.src = link;
  elementsImg.alt = name;
  elementsTitle.textContent = name;

  const like = currentItem.querySelector(".elements__button-like");
  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("button-like_active");
  });

  const deleteBtn = currentItem.querySelector(".elements__button-delete");
  deleteBtn.addEventListener("click", deleteCardNode);

  const openPopupImg = currentItem.querySelector(".elements__popup-img");
  openPopupImg.addEventListener("click", () => {
    openPopup(popupImage);
    imageOfPopup.src = link;
    imageOfPopup.alt = name;
    captionImageOfPopup.textContent = name;
  });

  return currentItem;
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const card = createCardNode(titleInput.value, placeInput.value);
  ulElements.prepend(card);
  closePopup(popupAddPlace);
  evt.target.reset();
};

const deleteCardNode = (e) => {
  const currentEl = e.target.closest(".elements__item");
  currentEl.remove();
};

profilePopupOpenBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});

popupAddOpenBtn.addEventListener("click", () => {
  openPopup(popupAddPlace);
});

profilePopupCloseBtn.addEventListener("click", () => {
  closePopup(profilePopup);
  removeErrorClass();
});

popupAddCloseBtn.addEventListener("click", () => {
  closePopup(popupAddPlace);
  removeErrorClass();
});

closePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

formCard.addEventListener("submit", handleCardFormSubmit);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const renderInitialCards = () => {
  initialCards.forEach((card) => {
    const currentItem = createCardNode(card.name, card.link);

    ulElements.append(currentItem);
  });
};

renderInitialCards();
