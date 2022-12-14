export class Card {
    constructor({ item }, cardSwitch, openPopupImage, myId, openDeletePopup, api) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        //this._numberLikes = item.likes.length;
        this._myId = myId;
        this._cardSelector = cardSwitch; //switch
        this._openPopupImage = openPopupImage;
        this._openDeletePopup = openDeletePopup;
        this._api = api;
    }


    // Создание template
    _getTemplate() {
        const cardTemplate = this._cardSelector.cloneNode(true)
        return cardTemplate;
    }



    //Лайк
    _like = () => {
        this._likeButton.classList.toggle('button__like_active');
    }


    // _like = () => {
    //     if(!this._hasMyLikes(this._item.likes)){
    //       this._api.setLike(this._item)
    //       .then((result) => {
    //         this._likes.textContent = result.likes.length;
    //         this._likeButton.classList.add('button_type_like-active');
    //         this._item.likes = result.likes;
    //       })
    //     } else {
    //       this._api.deleteLike(this._item)
    //       .then((result) => {
    //         this._likes.textContent = this._item.likes.length - 1;
    //         this._likeButton.classList.remove('button_type_like-active');
    //         this._item.likes = result.likes;
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //     }
    //   }


    //Удаление карточки
    _removeImage = () => {
        this._element.remove()
    }


    // _openPopup = () => {
    //     this._openDeletePopup(this);
    //   }


    _handleCardClick = () => { // _handleImageClick
        this._openPopupImage({ name: this._name, link: this._link });
    }

    //   _setEventListeners() {

    //     this._likeButton.addEventListener ('click', this._like); //лайк
    //     this._element.querySelector('.button_type_remove').addEventListener('click', this._openPopup); //Удаление картинки
    //     this._element.querySelector('.button_type_card').addEventListener('click', this._handleImageClick); //открытие картинки
    //   }


    _setEventListeners() {
        this._likeButton = this._element.querySelector('.button__like');
        this._likeButton.addEventListener('click', () => this._like()); //лайк
        this._element.querySelector('.card__button_remove').addEventListener('click', () => this._removeImage()); //Удаление картинки
        this._element.querySelector('.button__card').addEventListener('click', this._handleCardClick); //открытие картинки

    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');

        //     this._likes = this._element.querySelector('.card__like-item');
        //     this._likeButton = this._element.querySelector('.button_type_like');

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        //     this._likes.textContent = this._numberLikes;
        //     this._activeRemoveButton();

        return this._element;
    }
}