import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formElement, popupConfig, { inputSelector, submitBtnSelector, formSelector }, errorsResetCallBack, submitCallBack, getterCallBack = null) {
        super(popupSelector, popupConfig);
        this._formElement = formElement;
        this._submitCallBack = submitCallBack;
        this._inputSelector = inputSelector;
        this._submitBtnSelector = submitBtnSelector;
        this._getterCallBack = getterCallBack;
        this._formSelector = formSelector;
        this._inputs = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
        this._submitBtn = this._formElement.querySelector(`.${this._submitBtnSelector}`);
        this._errorsResetCallBack = errorsResetCallBack;
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach((inputElement) => {
            values[inputElement.id] = inputElement.value;
        })
        return values;
    }

    _setInputValues(values) {
        this._inputs.forEach((inputElement) => {
            inputElement.value = values[inputElement.id];
        })
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._submitBtn.disabled = true;
        this._submitCallBack(this._getInputValues());
    }

    setSubmitButtonText = (buttonText) => {
        this._submitBtn.textContent = buttonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._handleSubmit);
    }

    open = () => {
        if (this._getterCallBack) {
            this._setInputValues(this._getterCallBack());
        } else {
            this._formElement.reset();
        }
        this._errorsResetCallBack();
        super.open();

    }

    close() {
        super.close();
        this._formElement.reset();

    }
}