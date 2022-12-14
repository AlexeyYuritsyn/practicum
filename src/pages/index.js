import '../pages/index.css';

import Section from "../components/Section.js";
import { Card } from "../components/Сard";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Api } from "../components/Api";

import { UserInfo } from "../components/UserInfo.js";
import { PicturePopup } from "../components/PicturePopup";
import {
    popupEditProfileOpenBtn,
    popupAddCardOpenBtn,
    cardSwitch,
    initialCards,
    validConfig,
    formValidators,
    formConfiguration,
    popupConfiguration,
    cardsContainerSelector,
    newPlacePopupSelector,
    newPlaceFormName,
    profileFormName,
    profileConfiguration,
    profilePopupSelector,
    viewPopupConfiguration,
    imagePopupSelector,
    myId,
} from "../components/constanst";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
        authorization: '8d3c6a15-ceca-43f0-a891-5377cbbfaafe',
        'Content-Type': 'application/json'
    }
});

api.getUserInfo()
    .then(result => {
        user.setUserInfo({ title: result.name, job: result.about });
        user.setUserAvatar({ avatar: result.avatar });
    })
    .catch((err) => {
        console.log(err);
    });


const openDeletePopup = (data) => {
    deletePopup.setEventListeners(data);
    deletePopup.open();
}

const createCard = (item) => {
    const card = new Card({ item },
        cardSwitch,
        myId,
        viewPopup.open.bind(viewPopup),
        openDeletePopup,
        api,
    );
    return card.generateCard();
};

api.getInitialCards()
    .then(result => {
        const cardsContainer = new Section({
            items: result.reverse(),
            renderer: createCard,
        }, cardsContainerSelector);

        cardsContainer.renderAllInitialItems();
    })
    .catch((err) => {
        console.log(err);
    });

const handleProfileFormSubmit = (data) => {
    api.patchUserInfo(data)
        .then((result) => {
            user.setUserInfo({ title: result.name, job: result.about });
            profilePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
};

Array.from(document.forms).forEach(formElement => {
    formValidators[formElement.name] = new FormValidator(validConfig, formElement);
    formValidators[formElement.name].enableValidation();
});

const viewPopup = new PicturePopup(imagePopupSelector, popupConfiguration, viewPopupConfiguration);
viewPopup.setEventListeners();

const cardsContainer = new Section({
    items: initialCards.reverse(),
    renderer: createCard,
}, cardsContainerSelector);

cardsContainer.renderAllInitialItems();

const handleCardSubmit = (item) => {
    cardsContainer.addItem(item);
};

const newCardPopup = new PopupWithForm(
    newPlacePopupSelector,
    newPlaceFormName,
    popupConfiguration,
    formConfiguration,
    formValidators[newPlaceFormName].resetValidation,
    handleCardSubmit,
);
newCardPopup.setEventListeners();

const addCardSubmitHandler = () => {
    newCardPopup.open();
};


const user = new UserInfo(profileConfiguration);

const profilePopup = new PopupWithForm(
    profilePopupSelector,
    profileFormName,
    popupConfiguration,
    formConfiguration,
    formValidators[profileFormName].resetValidation,
    handleProfileFormSubmit,
    user.getUserInfo,
);

profilePopup.setEventListeners();

const handleProfilePopupOpen = () => {
    profilePopup.open();
};

//Открытие попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', handleProfilePopupOpen);

popupAddCardOpenBtn.addEventListener('click', addCardSubmitHandler);