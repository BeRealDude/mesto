import {
  openPopup,
  popupImage,
  imageOfPopup,
  captionImageOfPopup,
} from "../pages/index.js";
class Card {
  constructor(data, templateSelector) {
    (this._name = data.name), (this._link = data.link);
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".elements__button-like");
    this._buttonDelete = this._element.querySelector(
      ".elements__button-delete"
    );
    this._buttonOpenPopupImg = this._element.querySelector(
      ".elements__popup-img"
    );

    this._buttonLike.addEventListener("click", () => {
      this._likeCard();
    });

    this._buttonDelete.addEventListener("click", () => {
      this._deleteCard();
    });

    this._buttonOpenPopupImg.addEventListener("click", () => {
      this._handleClickImage();
    });
  }

  _likeCard() {
    this._element
      .querySelector(".elements__button-like")
      .classList.toggle("button-like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleClickImage() {
    openPopup(popupImage);
    imageOfPopup.src = this._link;
    imageOfPopup.alt = this._name;
    captionImageOfPopup.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__maskGroup").src = this._link;
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__maskGroup").alt = this._name;

    return this._element;
  }
}

export default Card;
