import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', container: '.page'});
    slider.render();

    // Первый слайдер
    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider', // это контейнер где внутри карточки со слайдерами
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    // Второй слайдер
    const modulesSlider = new MiniSlider({ // Обрати внимание что класс ОДИН И ТОТ ЖЕ, но ЭКЗЕМПЛЯРЫ классов разные
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next', // Все эти классы были взяты из верстки
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    // Третий слайдер
    const feedSlider = new MiniSlider({ // Назовем feed, потому что последний из слайдеров служит отоброжением отзывов клиентов
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();
    /* В этом слайдере у нас БАГ, верстка иногда выходит. У нас есть див контейнер где находятся все слайды с классом feed__slider,
и прям в нем находятся кнопки для переключения. И так как мы внутри контейнера получали всех детей, кнопки ТОЖЕ СЧИТАЮТСЯ КАК ОТДЕЛЬНЫЕ
СЛАЙДЫ. ЭТО ОЧЕНЬ ВАЖНО ! Когда мы нажимаем на кнопку вперед, мы помни что первый слайд уходит на место последнего и если протыкать
все слайды, то в какой-то момент кнопки станут первым элементами !!! Но сами кнопки не двигаются как слайды потому что у них стоит
position: absolute ! */

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();
});