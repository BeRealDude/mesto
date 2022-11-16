

const popupImage = document.querySelector(".popup-img");
const imageOfPopup = popupImage.querySelector(".popup__image");
const captionImageOfPopup = popupImage.querySelector(".popup__alt");
const closePopupImage = popupImage.querySelector(".popup__close");

const popups = Array.from(document.querySelectorAll(".popup"));

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
    this._element
      .querySelector(".elements__button-like")
      .addEventListener("click", () => {
        this._likeCard();
      });

    this._element
      .querySelector(".elements__button-delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._element
      .querySelector(".elements__popup-img")
      .addEventListener("click", () => {
        this._openPopupImg();
      });

    closePopupImage.addEventListener("click", () => {
      this._closePopupImg();
    });
  }

  _likeCard() {
    this._element
      .querySelector(".elements__button-like")
      .classList.toggle("button-like_active");
  }

  _deleteCard() {
    this._element.closest(".elements__item").remove();
  }

  _openPopupImg() {
    popupImage.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupByEscape);
    imageOfPopup.src = this._link;
    imageOfPopup.alt = this._name;
    captionImageOfPopup.textContent = this._name;
  }

  _closePopupImg() {
    popupImage.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupByEscape);
  }

  _closePopupByEscape = (evt) => {
    if (evt.key !== "Escape") {
      return;
    }
    const popupOpened = document.querySelector(".popup_opened");
    this._closePopupImg(popupOpened);
  };

  _closeByOverlay() {
    popups.forEach((overlay) => {
      overlay.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
          this._closePopupImg(overlay);
        }
      });
    });
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
