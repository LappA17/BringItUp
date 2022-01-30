export default class Slider {
/* Заменили page на контейнер что бы было понятней что это свойство отображает */
/* Меняем значение свойств вместо пустой строки на null, таким образом команды querySelector ошибки выдавать не будут*/
    constructor({container = null,
        btns = null,
        next = null, 
        prev = null,
        activeClass = '', /* Добавляем activeClass и так как это класс можно добавить пустую строку*/
        animate,
        autoplay } = {}){
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);

        /* создадим два новых свойства в наш объект слайдер */
        this.prev = document.querySelector(prev); // даже если прев не передадем то передасться null и ошибки не будет
        this.next = document.querySelector(next); // Мы добавили некст и прев что бы в слайдерМини обращаться к этим двум свойствам

        // Передаем эти три новых значение в слайдермини 
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}