export class FormValidator {
    constructor(validConfig, formElement) {
        this._formSelector = validConfig.formSelector
        this._inputSelector = validConfig.inputSelector;
        this._submitButtonSelector = validConfig.submitButtonSelector;
        this._inactiveButtonClass = validConfig.inactiveButtonClass;
        this._inputErrorClass = validConfig.inputErrorClass;
        this._errorClass = validConfig.errorClass;
        this._formElement = formElement;
        this._buttonSubmit = formElement.querySelector(validConfig.submitButtonSelector);
    }

    //Показывает ошибку валидации
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };


    //Удаляет ошибку валидации
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    };


    //Проверка валидности форм 
    _checkInputValidity(inputElement) {
        const message = inputElement.validationMessage;
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, message);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Для каждого поля из массива проверяем корректно ли его содержимое
    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    // Настройка кнопки submit 
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {

            this.disableSubmitButton()
        } else {

            this.activateSubmitButton()
        }
    };

    //Добавляем события для всех форм 
    _setEventListener() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        this._toggleButtonState();

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    //Кнопка отправки формы стала активной 
    activateSubmitButton() {
        this._buttonSubmit.disabled = false;
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    };

    //Кнопка отправки формы стала не активной 
    disableSubmitButton() {
        this._buttonSubmit.disabled = true;
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
    };

    //Убирает ошибку инпутов
    resetValidation = () => {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        })
        this._toggleButtonState();
    };

    //Вызывает функцию enableValidation
    enableValidation() {
        this._setEventListener();
    };
}