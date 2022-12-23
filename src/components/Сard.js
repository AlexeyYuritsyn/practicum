export class Card {
    constructor(data, cardSwitch, userId, cardId, ownerId, handlers) {
        this._cardSelector = cardSwitch;
        this._handleCardClick = handlers.handleCardClick;
        this._likes = data.likes;
        this._userId = userId;
        this._cardId = cardId;
        this._ownerId = ownerId;
        this._handleLikeClick = handlers.handleLikeClick;
        this._handleDeleteClick = handlers.handleDeleteClick;
        this._handleRemoveLike = handlers.handleRemoveLike;
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate() {
        return this._cardSelector.cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._likesCount = this._element.querySelector('.card__like-item');
        this._likeButton = this._element.querySelector('.button__like');
        this._deleteBtn = this._element.querySelector('.card__button_remove');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this._likesCount.textContent = this._likes.length;
        this._checkIsLiked();
        this._hasDeleteButton();
        this._setEventListeners();
        return this._element;
    }

    deletePlace() {
        this._element.remove();
        this._element = null;
    }

    _checkIsLiked() {
        if (this._likes.some((user) => {
                return this._userId === user._id;
            })) {
            this._likeButton.classList.add('button__like_active');
        }
    }

    _hasDeleteButton() {
        if (this._userId !== this._ownerId) {
            this._deleteBtn.remove()
        }
    }

    handleLikeCard(data) {
        this._likes = data.likes;
        this._likesCount.textContent = this._likes.length;
        this._likeButton.classList.toggle('button__like_active');
    }

    _setEventListeners() {
        this._deleteBtn.addEventListener('click', () => {
            this._handleDeleteClick(this._cardId);
        });

        this._likeButton.addEventListener("click", () => {
            if (this._likeButton.classList.contains('button__like_active')) {
                this._handleRemoveLike(this._cardId);
            } else { this._handleLikeClick(this._cardId) }
        });

        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });

    }
}