import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';

/*  Все эти ошибки на второй страницы из-за которых мы обращаемся к try catch связанны с тем что мы напрямую не общаемся
с какими-то элементами и их не модифицируем, например модуль forms.js, мы пытаемся создать класс new Form('.form').init(); 
в нашем main.js, те css класс form и вызвать метод инит
    Потом мы смотрим что в формс у нас есть такой свойство с селектором this.forms = document.querySelectorAll(forms);, 
и так как на страницу у нас нет такого класса том мы this.forms просто помещаем пустой массив, то дальше мы можем его использовать
в тех действиях которые нам нужны.  */

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', container: '.page'});
    slider.render();

    const modulePageSlider = new MainSlider({container: ".moduleapp", btns: ".next"}); // передаем аргументы в любом порядке
/* У нас есть див с классмо moduleapp где много других модулей
И есть еще одна кнопка */

    /*теперь когда объект modulePageSlider создан нам нужно его использовать. После этого слайдер со страницами будет 
работать на второй странице html*/
    modulePageSlider.render();

    /* После этого у нас возникает ошибка в консоли, что мы не можем найти length у undefined. А всё из-за того что класс слайдера
из первой страницы const slider обрабатывается и создает новый объект который помещается в переменную slider, а так как селекторы
кнопок у нас точно такие же, то этот объект слайдеры пытается выполнить точно такие же действие но уже не с существующими элементами
ведь у нас нет container: '.page' на второй странице. По этому переходим в слайдер мейн и там вместо того что бы создавать большой
блок try catch что бы оборачивать весь функционал, мы можем поменять его на условие, если контейнер в слайдер действительно существует на
этой страницу то что то там. Что бы это сделать мы заходим в slider.js и используем this.cotnaier, изначально она ровна null
мы ее передаем в квериселектор и если вдруг в документе не был найден такой элемент, то мы получим  undefined = а это фолс, по этому
просто проверив this.container.  По этому удаляем один трай кетч*/

    // Первый слайдер
    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    // Второй слайдер
    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next', 
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    // Третий слайдер
    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    new Difference(".officerold", ".officernew", ".officer__card-item").init();

    new Form('.form').init(); 
});