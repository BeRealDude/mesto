import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector(".popup__image");
    this._titleImage = this._popup.querySelector(".popup__alt");
  }

  open(link, name) {
    super.open();

    this._link = link;
    this._name = name;

    this._image.src = this._link;
    this._image.alt = this._name;
    this._titleImage.textContent = this._name;
  }
}
