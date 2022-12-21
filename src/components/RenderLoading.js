export class RenderLoading {
  constructor({ popup, textLoader }) {
    this._button = popup._formElement.querySelector(".popup__button");

    this._text = textLoader;

    this._textButton = this._button.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = this._text;
    } else {
      this._button.textContent = this._textButton;
    }
  }
}