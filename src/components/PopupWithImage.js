import Popup from "./Popup.js";
import { imageOfPopup, captionImageOfPopup } from "../pages/index.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image) {
    this._link = image._link;
    this._name = image._name;

    imageOfPopup.src = this._link;
    imageOfPopup.alt = this._name;
    captionImageOfPopup.textContent = this._name;

    super.open();
  }
}
