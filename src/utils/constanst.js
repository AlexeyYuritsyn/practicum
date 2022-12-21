export const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button');
export const popupAvatarOpenBtn = document.querySelector('.profile__avatar-button');
export const popupAddCardOpenBtn = document.querySelector('.profile__add-button');

export const cardSwitch = document.getElementById('cards').content.querySelector('.card');

// Валидация 
export const validConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const formValidators = {};



export const formConfiguration = {
    inputSelector: 'popup__field',
    submitBtnSelector: 'popup__button-save',
    formSelector: 'form',
}

export const popupConfiguration = {
    activeModifier: 'popup_active',
    buttonCloseSelector: 'popup__button-close',
}

export const profileConfiguration = {
    titleSelector: 'profile__name',
    jobSelector: 'profile__description',
    avatarSelector: 'profile__avatar',
}

export const viewPopupConfiguration = {
    imageSelector: 'popup__image',
    captionSelector: 'popup__text',
}

export const cardsContainerSelector = '.elements__table';
export const newPlacePopupSelector = 'popup_add-card';
export const profilePopupSelector = 'popup_edit-profile';
export const imagePopupSelector = 'popup_big_image';
export const newPlaceFormName = 'add-image';
export const profileFormName = 'profileData';
export const confirmationPopupSelector = 'popup_image_delete';
export const confirmationButtonSelector = 'popup__button_image_delete';
export const avatarPopupSelector = 'popup_edit-avatar';
export const avatarFormName = 'avatar-form';
