import whale from '../images/thomas-lipke-kkXDhAUnxYI-unsplash.jpg';
import kostroma from '../images/alexandra-tran-ytgQImo6ugg-unsplash.jpg';
import jellyfish from "../images/joel-filipe-_AjqGGafofE-unsplash.jpg";


export const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button');
export const popupAddCardOpenBtn = document.querySelector('.profile__add-button');

export const cardSwitch = document.getElementById('cards').content.querySelector('.card');


//Массив из первого пункта 
export const initialCards = [{
        name: "Архыз",
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: "Кострома",
        link: kostroma
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        name: "Медузы",
        link: jellyfish
    },
    {
        name: "Кит",
        link: whale
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
];

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
    closeBtnSelector: 'popup__button-close',
}

export const profileConfiguration = {
    titleSelector: 'profile__name',
    jobSelector: 'profile__description',
}

export const viewPopupConfiguration = {
    imageSelector: 'popup__image',
    captionSelector: 'popup__text',
}

export const cardsContainerSelector = 'elements__table';
export const newPlacePopupSelector = 'popup_add-card';
export const profilePopupSelector = 'popup_edit-profile';
export const imagePopupSelector = 'popup_big_image';
export const newPlaceFormName = 'add-image';
export const profileFormName = 'profileData';


export const myId = '59d05da5ea81d432f473a759';