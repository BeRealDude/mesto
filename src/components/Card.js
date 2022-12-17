class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeCard}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._currentUserId = data.currentUserId;
    this._owner = data.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  putLike(newLikes) {
    this._likes = newLikes;
    this._likeQuantityEl.textContent = this._likes.length;
  }

  isLiked() {
    const userLikeCard = this._likes.find(user => user._id === this._currentUserId)
    return userLikeCard
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._likeQuantityEl = this._element.querySelector(".elements__quantity-like");

    this._imageLink = this._element.querySelector(".elements__maskGroup");
    this._imageName = this._element.querySelector(".elements__title");

    this._imageLink.src = this._link;
    this._imageName.textContent = this._name;
    this._imageName.alt = this._name;
    this.putLike(this._likes);


    if(this._owner !== this._currentUserId) {
      this._element.querySelector(".elements__button-delete").style.display = "none"
    }

    
    if(this.isLiked()) {
      this.likeCard();
    }

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
      this._handleLikeCard(this);
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._buttonOpenPopupImg.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  likeCard() {
    this._buttonLike.classList.toggle("button-like_active");
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._id;
  }
}

export default Card;
