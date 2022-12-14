import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor (popupSelector, popupConfig, confirmationButtonSelector, api) {
        super(popupSelector, popupConfig);
        this._confirmationButton = this._popup.querySelector(`.${confirmationButtonSelector}`);
        this._api = api;
    }

    removeCard(data) {
        this._api.deleteCard(data._item._id)
            .then(() => {
                data.removeImage();
            })
            .catch((err) => {
                console.log(err)
            });
        this.close();
    }

    setEventListeners(data) {
        super.setEventListeners();
        this.removeCardCallback = () => {this.removeCard(data)};
        this._confirmationButton.addEventListener('click', this.removeCardCallback)
    }

    close() {
        this._confirmationButton.removeEventListener('click', this.removeCardCallback);
        super.close();
    }
}