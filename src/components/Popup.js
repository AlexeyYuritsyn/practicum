export default class Popup {
    constructor(popupSelector, popupConfig) {
        this._popupSelector = popupSelector;
        this._activeModifier = popupConfig.activeModifier;
        this._buttonCloseSelector = popupConfig.buttonCloseSelector; //_buttonCloseSelector
        this._popup = document.querySelector(`.${this._popupSelector}`);
        this._buttonClose = this._popup.querySelector(`.${this._buttonCloseSelector}`); //_buttonClose
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleCloseBtnClick = () => {
        this.close();
    }

    _handleCloseOverlayClick = (ev) => {
        if (ev.target === ev.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleCloseOverlayClick);
        this._buttonClose.addEventListener('click', this._handleCloseBtnClick);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._activeModifier);
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove(this._activeModifier);
    }
}