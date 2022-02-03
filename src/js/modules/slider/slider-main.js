import Slider from './slider';

export default class MainSlider extends Slider {

    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        if (n > this.slides.length) { /* В консоли ошибка что мы не можем найти length у второго хтмл у какого-то слайдера
потому что у нас контейнер на той страницу равен налл, и мы не получили его детей */
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

    // В самом конце урока Ваня сказал что у нас метод render сильно разрося и мы можем парочку вещей вынести
    bindTriggers() {
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

        // Реализуем слайдер в нижнем меню второй страницы
        document.querySelectorAll('.prevmodule').forEach(item => {/* all потому этих кнопочек для переключение много : на каждой страничке, на 
на каждом модуле их много */
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1); // так как мы возвращаемся на один модуль назад в слайдере то мы передадим -1
            });
        }); 

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1); 
            });
        });    
/* У нас после нижнего слайдера появился баг что после нажатия вперед перескакивает текущий слайд на два , те со 2 на 4 потом на 6.
Здесь нужно вспомнить за всплытие событий, открываем верстку и видим что у стрелочки вперед имеет общик блок, который оборачиваем
всю эту стрелочку и стрелочку nextmodule который мы использовали, имеет класс next этот общий модуль. И У ГЛАВНОГО СЛАЙДЕРА,
КОТОРЫЙ СТРАНИЦЫ СЧЕЛКАЕТ ТОЖЕ ЕГО ИМЕЕТ И ПРИ КЛИКЕ НА НИЖНИЙ СЛАДЙ У НЕГО ПЛЮССЛАЙД СРАБАТЫВАЕТ ДВА РАЗА. ПО ЭТОМУ ПЕРЕДАЕМ
ОБЪЕКТ СОБЫТИЯ ЕВЕНТ И ПЕРЕД ТЕМ КАК ЗАПУСКАТЬ ПЛЮССЛАЙДС МЫ ПРОПИШЕМ e.stopPropagation(); и так как это ссылка лучше еще
превентдефолт добавить */
    }

    // Теперь рендер не такой большой
    render() {
        if (this.container) { // те если есть на странице такой элемент (не андефайнд), то произойдет код ниже
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}
    
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }    
    } 
}