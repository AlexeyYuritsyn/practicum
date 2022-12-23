import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor (popupSelector, popupConfig, confirmationButtonSelector, formElement) {
        super(popupSelector, popupConfig);
        this._formElement = formElement;
        this._confirmationButton = this._popup.querySelector(`.${confirmationButtonSelector}`);
    }

    setCallback(callback) {
        this._handleSubmit = callback;
    }

    setSubmitButtonText = (buttonText) => {
        this._confirmationButton.textContent = buttonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmationButton.addEventListener("click", () => {
            this._handleSubmit();
        });
    }
}