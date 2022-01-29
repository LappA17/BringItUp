import Slider from "./modules/slider";
import VideoPlayer from "./modules/playVideo";

window.addEventListener('DOMContentLoaded' , () => {
    const slider = new Slider('.page', '.next');
    slider.render();

    const player = new VideoPlayer(".showup .play", ".overlay");
/* showup - это общая секция и у кнопки есть класс play */
    player.init(); //запустить работу плеера

    /* в index html на 1017 удаляем  iframe со всеми параметрами ширины высоты и тд
    подставляем <div id="frame"></div> потому что код который мы будем запускать в createPlayer что мы подставили
    с верстки нам его сгенерируют автоматически c тем видео что нам понадобиться */
});