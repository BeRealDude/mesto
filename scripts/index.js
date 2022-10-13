const popupOpenedButton = document.querySelector(".profile-info__open-popup");
const popup = document.querySelector(".profile-popup");
const popupClouseButton = popup.querySelector(".popup__clouse");

const profileName = document.querySelector(".profile-info__name");
const profileActivity = document.querySelector(".profile-info__activity");

const form = document.querySelector(".form");

const nameInput = document.querySelector("#name");
const activityInput = document.querySelector("#activity");

profileName.textContent = "Жак-Ив Кусто";
profileActivity.textContent = "Исследователь океана";

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  closePopup(popup);
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
}

popupClouseButton.addEventListener("click", () => {
  closePopup(popup);
});

popupOpenedButton.addEventListener("click", () => {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});

form.addEventListener("submit", formSubmitHandler);

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
const clousePopupAdd = document.querySelector("#close-elements-popup");

clousePopupAdd.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

openPopupAdd.addEventListener("click", () => {
  openPopup(popupAddPlace);
});

//Добавление новых карточек

const formAdd = document.querySelector("#formAdd");

const ulElements = document.querySelector(".elements");
const template = document.querySelector(".template");

const titleInput = document.querySelector("#title");
const placeInput = document.querySelector("#place");

const render = () => {
  initialCards.forEach((card) => {
    const currentItem = createCardNode(card.name, card.link);

    ulElements.append(currentItem);
  });

  formAdd.addEventListener("submit", formAddSubmitHandler);
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

const formAddSubmitHandler = (evt) => {
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

const clousePopupImg = document.querySelector("#close-img-popup");

clousePopupImg.addEventListener("click", () => {
  closePopup(popupImg);
});