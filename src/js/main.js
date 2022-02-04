import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

/* В самом конце Ваня запустил команду в терминал что бы все наши скрипты правильно скомпилировались gulp build-prod-js. 
Теперь в папке дист будет полностью оптимизированная версия нашего продукта */

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
    new VideoPlayer('.showup .play', '.overlay').init(); 
    //Плеер на второй
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    new Difference(".officerold", ".officernew", ".officer__card-item").init();

    new Form('.form').init(); 

    new ShowInfo('.plus__content').init(); /* plus content будет тригером при клике на кнопку, он находится в блоке plus */

    new Download('.download').init(); // селектор кнопки передаем
});