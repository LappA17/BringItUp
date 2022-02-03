export default class Slider {
    constructor({container = null,
        btns = null,
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}){
        this.container = document.querySelector(container); // контейнер не выдает ошибку потому что он равен нал
        try {this.slides = this.container.children;}catch(e){} // чилдрен выдает ошибку потому что мы пытаемся найти детей у нал
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev); 
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}