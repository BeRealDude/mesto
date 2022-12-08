class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._imageLink = this._element.querySelector(".elements__maskGroup");
    this._imageName = this._element.querySelector(".elements__title");

    this._imageLink.src = this._link;
    this._imageName.textContent = this._name;
    this._imageName.alt = this._name;

    return this._element;
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
      this._handleCardClick(this._link, this._name);
    });
  }

  _likeCard() {
    this._buttonLike.classList.toggle("button-like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
