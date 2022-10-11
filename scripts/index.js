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
const popupAddPlace = document.querySelector(".popup-add");
const clousePopupAdd = document.querySelector(".popup-add__clouse");

function addPopupOpen() {
  popupAddPlace.classList.add("popup-add_open-popup");
}

function removePopupOpen() {
  popupAddPlace.classList.remove("popup-add_open-popup");
}

clousePopupAdd.addEventListener("click", removePopupOpen);
openPopupAdd.addEventListener("click", addPopupOpen);

//Добавление новых карточек

const formAdd = document.querySelector("#formAdd");
 
const ulElements = document.querySelector(".elements");
const template = document.querySelector(".template");

const titleInput = document.querySelector("#title");
const placeInput = document.querySelector("#place");



const render = () => {
  initialCards.forEach((card) => {
    const currentItem = createCardNode(card.name, card.link);
    const like = currentItem.querySelector(".elements__buttun-like")
  like.addEventListener('click', function (evt) {
    evt.target.classList.toggle('buttun-like_active');
  }); 
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
  
  return currentItem;
};

const formAddSubmitHandler = (evt) => {
  evt.preventDefault();
  removePopupOpen();
  const card = createCardNode(titleInput.value, placeInput.value);
  ulElements.prepend(card);
  titleInput.value = "";
  placeInput.value = "";

  const like = document.querySelector(".elements__buttun-like")
  like.addEventListener('click', function (evt) {
    evt.target.classList.toggle('buttun-like_active');
  }); 
};

render();

