import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', container: '.page'});
    slider.render();

    const modulePageSlider = new MainSlider({container: ".moduleapp", btns: ".next"}); 
    modulePageSlider.render();

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

    // Плеер на первой странице
    new VideoPlayer('.showup .play', '.overlay').init(); // убрали переменую плеер и сразу добавили инит как метод
    new VideoPlayer('.module__video-item .play', '.overlay').init();
/* Это будут два разных ВИДЕОПЛЕЕРА с разныи методами инит 
Внутри этого класса '.module__video-item четко будет кнопка play ЧТО БЫ ЕСЛИ ВДРУГ У НАС ГДЕ ТО БУДЕТ КЛАСС ПЛЕЙ ЧТО БЫ ОН НЕ ПЕРЕСИКАЛСЯ
С ЭТИМ  ФУНКЦИОНАЛОМ*/

    new Difference(".officerold", ".officernew", ".officer__card-item").init();

    new Form('.form').init(); 
});