import Popup from "./Popup.js";
import { imageOfPopup, captionImageOfPopup } from "../index.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    this._link = link;
    this._name = name;

    imageOfPopup.src = this._link;
    imageOfPopup.alt = this._name;
    captionImageOfPopup.textContent = this._name;

    super.open();
  }
}
