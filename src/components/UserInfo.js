export class UserInfo {
    constructor({ titleSelector, jobSelector, avatarSelector }) {
        this._titleSelector = titleSelector;
        this._jobSelector = jobSelector;
        this._titleElement = document.querySelector(`.${this._titleSelector}`);
        this._jobElement = document.querySelector(`.${this._jobSelector}`);
        this._avatarElement = document.querySelector(`.${avatarSelector}`);
    }

    setUserInfo = (data) => {
        this._titleElement.textContent = data.title || '';
        this._jobElement.textContent = data.job || '';
    }

    setUserAvatar = (data) => {
      this._avatarElement.src = data.avatar || 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg';
    }

    getUserInfo = () => {
        return { title: this._titleElement.textContent, job: this._jobElement.textContent };
    }
}