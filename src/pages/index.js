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
    avatarFormName,
    avatarPopupSelector,
    cardsContainerSelector,
    cardSwitch,
    confirmationButtonSelector,
    confirmationPopupSelector,
    formConfiguration,
    formValidators,
    imagePopupSelector,
    newPlaceFormName,
    newPlacePopupSelector,
    popupAddCardOpenBtn,
    popupAvatarOpenBtn,
    popupConfiguration,
    popupEditProfileOpenBtn,
    profileConfiguration,
    profileFormName,
    profilePopupSelector,
    validConfig,
    viewPopupConfiguration,
} from "../utils/constanst";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
        authorization: '8d3c6a15-ceca-43f0-a891-5377cbbfaafe',
        'Content-Type': 'application/json'
    }
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([InitialCards, userData]) => {
        userId = userData._id;
        user.setUserInfo({ title: userData.name, job: userData.about });
        user.setUserAvatar({ avatar: userData.avatar });
        cardsSection.renderAllInitialItems(InitialCards);
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });

const user = new UserInfo(profileConfiguration);

const createCard = (data) => {
    const newCard = new Card(
        data,
        cardSwitch,
        userId,
        data._id,
        data.owner._id, {
            handleCardClick: (name, image) => {
                viewPopup.open(name, image);
            },
            handleDeleteClick: (cardId) => {
                confirmationPopup.open();
                confirmationPopup.setCallback(() => {
                    confirmationPopup.setSubmitButtonText('Удаление...')
                    api
                        .deleteCard(cardId)
                        .then(() => {
                            newCard.deletePlace();
                            confirmationPopup.close();
                            confirmationPopup.setSubmitButtonText('Да')
                        })
                        .catch((err) => {
                            console.log(`Error: ${err}`);
                            confirmationPopup.setSubmitButtonText('Да')
                        })
                });
            },
            handleLikeClick: (cardId) => {
                api
                    .setLike(cardId)
                    .then((data) => {
                        newCard.handleLikeCard(data);
                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                    });
            },
            handleRemoveLike: (cardId) => {
                api
                    .deleteLike(cardId)
                    .then((data) => {
                        newCard.handleLikeCard(data);
                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                    });
            },
        }
    );
    return newCard.generateCard();
};

const cardsSection = new Section({
        renderer: (data) => {
            cardsSection.addItem(createCard(data));
        },
    },
    cardsContainerSelector
);

const handleAvatarSubmit = (data) => {
    avatarPopup.setSubmitButtonText('Сохранение...');
    api.patchAvatarInfo(data)
        .then((result) => {
            user.setUserAvatar({ avatar: result.avatar });
            avatarPopup.close();
            avatarPopup.setSubmitButtonText('Сохранить');
        })
        .catch((err) => {
            console.log(err);
            avatarPopup.setSubmitButtonText('Сохранить');
        })
};

const handleProfileFormSubmit = (data) => {
    profilePopup.setSubmitButtonText('Сохранение...');
    api.patchUserInfo(data)
        .then((result) => {
            user.setUserInfo({ title: result.name, job: result.about });
            profilePopup.close();
            profilePopup.setSubmitButtonText('Сохранить');
        })
        .catch((err) => {
            console.log(err);
            profilePopup.setSubmitButtonText('Сохранить');
        })
};

Array.from(document.forms).forEach(formElement => {
    formValidators[formElement.name] = new FormValidator(validConfig, formElement);
    formValidators[formElement.name].enableValidation();
});

const viewPopup = new PicturePopup(imagePopupSelector, popupConfiguration, viewPopupConfiguration);
viewPopup.setEventListeners();

const handleCardSubmit = (data) => {
    newCardPopup.setSubmitButtonText('Создание...')
    api
        .addNewCard(data)
        .then((data) => {
            cardsSection.addItem(createCard(data));
            newCardPopup.close();
            newCardPopup.setSubmitButtonText('Создать')
        })
        .catch((err) => {
            console.log(`Form error: ${err}`);
            newCardPopup.setSubmitButtonText('Создать')
        })
};

const getFormByName = (formName) => document.forms[formName]

const newCardPopup = new PopupWithForm(
    newPlacePopupSelector,
    getFormByName(newPlaceFormName),
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
    getFormByName(profileFormName),
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
    getFormByName(avatarFormName),
    popupConfiguration,
    formConfiguration,
    formValidators[avatarFormName].resetValidation,
    handleAvatarSubmit
);

const confirmationPopup = new PopupWithConfirmation(
    confirmationPopupSelector,
    popupConfiguration,
    confirmationButtonSelector,
    getFormByName(newPlaceFormName),
);

//Открытие попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', handleProfilePopupOpen);
popupAvatarOpenBtn.addEventListener('click', handleAvatarPopupOpen);
popupAddCardOpenBtn.addEventListener('click', openAddCardPopup);
avatarPopup.setEventListeners();
confirmationPopup.setEventListeners();