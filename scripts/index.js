const profilePopupOpenBtn = document.querySelector(".profile-info__open-popup");
const profilePopup = document.querySelector(".profile-popup");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__clouse");

const profileName = document.querySelector(".profile-info__name");
const profileActivity = document.querySelector(".profile-info__activity");

const profileForm = profilePopup.querySelector(".form");

const nameInput = document.querySelector("#name");
const activityInput = document.querySelector("#activity");

profileName.textContent = "Жак-Ив Кусто";
profileActivity.textContent = "Исследователь океана";

function openPopup(profilePopup) {
  profilePopup.classList.add("popup_opened");
}

function closePopup(profilePopup) {
  profilePopup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(profilePopup);
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
}

profilePopupCloseBtn.addEventListener("click", () => {
  closePopup(profilePopup);
});

profilePopupOpenBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

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

//Попап для карточек
const openPopupAdd = document.querySelector(".profile__open-popup");
const popupAddPlace = document.querySelector(".elements-popup");
const clousePopupAdd = popupAddPlace.querySelector(".popup__clouse");

clousePopupAdd.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

openPopupAdd.addEventListener("click", () => {
  openPopup(popupAddPlace);
});

//Добавление новых карточек

const formAdd = popupAddPlace.querySelector(".form");

const ulElements = document.querySelector(".elements");
const template = document.querySelector(".template");

const titleInput = document.querySelector("#title");
const placeInput = document.querySelector("#place");

const render = () => {
  initialCards.forEach((card) => {
    const currentItem = createCardNode(card.name, card.link);

    ulElements.append(currentItem);
  });

  formAdd.addEventListener("submit", handleCardFormSubmit);
};

const createCardNode = (name, link) => {
  const currentItem = template.content.cloneNode(true);
  const elementsImg = currentItem.querySelector(".elements__maskGroup");
  const elementsTitle = currentItem.querySelector(".elements__title");
  elementsImg.src = link;
  elementsImg.alt = name;
  elementsTitle.textContent = name;

  const like = currentItem.querySelector(".elements__buttun-like");
  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("buttun-like_active");
  });

  const deleteBtn = currentItem.querySelector(".elements__buttun-delete");
  deleteBtn.addEventListener("click", deleteCardNode);

  const openPopupImg = currentItem.querySelector(".elements__popup-img");
  openPopupImg.addEventListener("click", () => {
    openPopup(popupImg);
    image.src = link;
    image.alt = name;
    altImg.textContent = name;
  });

  return currentItem;
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  closePopup(popupAddPlace);
  const card = createCardNode(titleInput.value, placeInput.value);
  ulElements.prepend(card);
  titleInput.value = "";
  placeInput.value = "";
};

const deleteCardNode = (e) => {
  const currentEl = e.target.closest(".elements__item");
  currentEl.remove();
};

render();

//Попап для изображения и заголовка карточек

const popupImg = document.querySelector(".popup-img");

const image = popupImg.querySelector(".popup__image");

const altImg = popupImg.querySelector(".popup__alt");

const clousePopupImg = popupImg.querySelector(".popup__clouse");

clousePopupImg.addEventListener("click", () => {
  closePopup(popupImg);
});