

const profilePopupOpenBtn = document.querySelector(".profile-info__open-popup");
const profilePopup = document.querySelector(".profile-popup");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__clouse");

const profileName = document.querySelector(".profile-info__name");
const profileActivity = document.querySelector(".profile-info__activity");

const profileForm = profilePopup.querySelector("#user");
const nameInput = document.querySelector("#user-name");
const activityInput = document.querySelector("#user-activity");

const userNameError = document.querySelector("#user-name-error");
const activityError = document.querySelector("#user-activity-error");

const formSubmitBtn = document.querySelector(".form__submit-btn");


profileName.textContent = "Жак-Ив Кусто";
profileActivity.textContent = "Исследователь океана";

function openPopup(profilePopup) {
  profilePopup.classList.add("popup_opened");
}

function closePopup(profilePopup) {
  profilePopup.classList.remove("popup_opened");

  userNameError.textContent = "";
  activityError.textContent = "";
 
  nameInput.classList.remove('popup__text_error');
  activityInput.classList.remove('popup__text_error'); 


  pointTitleError.textContent = "";
  pointPlaceError.textContent = "";
 
  titleInput.classList.remove('popup__text_error');
  placeInput.classList.remove('popup__text_error'); 

  titleInput.value = "";
  placeInput.value = "";

 
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



//Закрытие попапа на Escape
const closePopupByEscape = (evt) => { 
  const PopupByEscape = document.querySelector(".popup");
  if(evt.key === "Escape"){
    closePopup(PopupByEscape);
    closePopup(popupAddPlace);
    closePopup(popupImg);
    console.log(evt)
  }
}
document.addEventListener("keydown", closePopupByEscape)




//Закрытие попа по клику на оверлей

const popupOverlay = Array.from(document.querySelectorAll(".popup"));
popupOverlay.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget){
      closePopup(overlay);
      
      
    }
  });
});

 //Закрытие попа по клику на оверлей (а можно так)
/*const closePopupByOverlay = function (event) {
  if(event.target === event.currentTarget){
    closePopup(popupOverlay);
    
  }
};
popupOverlay.addEventListener("click", closePopupByOverlay)
*/
 


/*
function closePopupByEscape (e) {
  const PopupByEscape = document.querySelector(".popup")
  if(e.key === "Escape"){
    closePopup(PopupByEscape);
  }
}

document.addEventListener("keydown", closePopupByEscape)*/


profilePopupOpenBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  //turnOnBtn(formSubmitBtn);
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
const popupAddOpenBtn = document.querySelector(".profile__open-popup");
const popupAddPlace = document.querySelector(".elements-popup");
const popupAddCloseBtn = popupAddPlace.querySelector("#popup-add-close");

const pointTitleError = document.querySelector("#point-title-error");
const pointPlaceError = document.querySelector("#point-place-error");
 


popupAddCloseBtn.addEventListener("click", () => {
  closePopup(popupAddPlace);
  
  /*pointTitleError.textContent = "";
  pointPlaceError.textContent = "";
 
  titleInput.classList.remove('popup__text_error');
  placeInput.classList.remove('popup__text_error'); 

  titleInput.value = "";
  placeInput.value = "";
*/

  

  
});

popupAddOpenBtn.addEventListener("click", () => {
  openPopup(popupAddPlace);
  enableValidation(settings)
});

//Добавление новых карточек

const formAdd = popupAddPlace.querySelector("#point");

const ulElements = document.querySelector(".elements");
const template = document.querySelector(".template");

const titleInput = document.querySelector("#point-title");
const placeInput = document.querySelector("#point-place");

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
  
  const card = createCardNode(titleInput.value, placeInput.value);
  ulElements.prepend(card);
  //evt.target.reset();
  closePopup(popupAddPlace);
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



  /*const over = Array.from(document.querySelectorAll('.popup'));
  over.forEach((overlay) => {
    overlay.addEventListener('click', (evt) => {
      evt.target.classList.remove("popup_opened");
    });
    
});*/