/* импортируем главный слайдер что бы он служил нам как протатип, на основе его мы будем строить главный слайдер */
import Slider from './slider';

export default class MainSlider extends Slider { /* extends Slider - значит что наследуется от Слайдера, и таким образом
мы можем получить все свойства и методы которые будут в этом классе Slider*/

    constructor(page, btns) {
        super(page, btns) /* Благодаря такой записи у нас будет два новых свойства :
        this.page = document.querySelector(page);
        this.btns = document.querySelectorAll(btns); 
Эти два свойства находятся slider.js. 
И кстати this.slides = this.page.children; тоже будет по умолчанию так как он завиит от this.page
 */

/* Методы у нас не будут одинаковы в глобальных слайдерах и в маленьких. Вырезаем код с слайдера и подставляем в 
наш глобальный ведь в самом начале мы создавали наш код для глобального слайдера, те для общего слайда и все
эти методы ему принадлежат*/
    }
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n == 3){
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e){}

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        try {
            this.hanson = document.querySelector('.hanson');
        } catch(e){}

        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}
