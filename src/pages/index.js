import '../pages/index.css';

import Section from "../components/Section.js";
import { Card } from "../components/Сard";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Api } from "../components/Api";

import { UserInfo } from "../components/UserInfo.js";
import { PicturePopup } from "../components/PicturePopup";
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import {
    popupEditProfileOpenBtn,
    popupAddCardOpenBtn,
    cardSwitch,
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
    confirmationPopupSelector,
    confirmationButtonSelector,
    popupAvatarOpenBtn,
    avatarPopupSelector,
    avatarFormName,
} from "../utils/constanst";

let userId;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
        authorization: '8d3c6a15-ceca-43f0-a891-5377cbbfaafe',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards])=>{
        //попадаем сюда когда оба промиса будут выполнены
        userId = userData._id
        user.setUserInfo({ title: userData.name, job: userData.about });
        user.setUserAvatar({ avatar: userData.avatar });

        cardsContainer.renderAllInitialItems(initialCards.reverse());
    })
    .catch((err)=>{
        //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
    })

const user = new UserInfo(profileConfiguration);

const handleAvatarSubmit = (data) => {
    api.patchAvatarInfo(data)
        .then((result) => {
            user.setUserAvatar({ avatar: result.avatar });
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
};

const openDeletePopup = (data) => {
    deletePopup.setEventListeners(data);
    deletePopup.open();
}

const createCard = (item) => {
    const card = new Card({ item },
        cardSwitch,
        viewPopup.open.bind(viewPopup),
        userId,
        openDeletePopup,
        api,
    );
    return card.generateCard();
};

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

const cardsContainer = new Section(
    {
        renderer: (item) => {
            cardsContainer.addItem(createCard(item));
        },
    },
    cardsContainerSelector
);

const handleCardSubmit = (data) => {
    api.addNewCard(data)
        .then(result => {
            cardsContainer.addItem(createCard(result));
            newCardPopup.close();
        })
        .catch((err) => {
            console.log(err)
        });
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

const openAddCardPopup = () => {
    newCardPopup.open();
};

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

const handleAvatarPopupOpen = () => {
    avatarPopup.open();
}

const avatarPopup = new PopupWithForm(
    avatarPopupSelector,
    avatarFormName,
    popupConfiguration,
    formConfiguration,
    formValidators[avatarFormName].resetValidation,
    handleAvatarSubmit
);

const deletePopup = new PopupWithConfirmation(
    confirmationPopupSelector,
    popupConfiguration,
    confirmationButtonSelector,
    api,
);

//Открытие попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', handleProfilePopupOpen);
popupAvatarOpenBtn.addEventListener('click', handleAvatarPopupOpen);
popupAddCardOpenBtn.addEventListener('click', openAddCardPopup);
avatarPopup.setEventListeners();