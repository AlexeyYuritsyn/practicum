export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(`.${this._containerSelector}`);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderAllInitialItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }
}