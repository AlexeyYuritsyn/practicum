export default class Section {
    constructor({renderer}, container){
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }
    renderAllInitialItems(data) {
        data.reverse().forEach(item => this._renderer(item));
    }
    addItem(element) {
        this._container.prepend(element);
    }
}