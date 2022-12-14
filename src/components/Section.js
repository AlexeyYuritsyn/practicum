export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(`.${this._containerSelector}`);
    }

    addItem(createCard) {
        this._container.prepend(this._renderer(createCard));
    }

    renderAllInitialItems() {
        this._items.forEach(item => {
            this.addItem(item);
        });
    }
}