export default class Slider {
    constructor(page, btns){
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        /*Этот блок необходимо показать через 3 секунды после того, как человек попадает на данную страницу: там где мужик 
John Smith вылазит */
        
        /* Поработаем с анимацией */
        try {
            this.hanson.style.opacity = 0; // скрываем блок по умолчанию
            /* Тоже будем использовать try catch потому что если если this.hanson вообще не появилось в блоке где render try catch , то
    то мы ничего не сможем делать со свойством которого просто нет */

            /*теперь нам необходимо определить что мы находимся на 3 странице и делать это будем по аргументу n */
            if (n === 3) {
                this.hanson.classList.add("animated");
                setTimeout(() => {
                    this.hanson.style.opacity = 1; // показываем
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp'); // убираем если пользователь пошел дальше, если еще раз вернется то опять вылезет
            }
        } catch(e) {}

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
/* Некоторые свойства могут существовать в классе изначально, а могут появляться только по надобности и этот блок нам понадобиться
только в специфических случаях. Поэтому будем его получать после того как запускается метод рендер, тимболее наш блок находится аж
на 3 странице и наш пользователь не успеет моментально перелистнуть на 3 страницу и опередить метод рендер */
            this.hanson = document.querySelector(".hanson"); /* hanson потому что так подписан блок. Эта часть кода сработает только
        на 1ой страницы, но слайдеры и на второй стр будут, где блока хансон просто не будет существовать - по этому используем такую
        конструкцию как TRY CATCH. Если мы предпологаем, что этот код может вызвать ошибку и дальнейший код может поломаться, мы должны
        использовать эту конструкцию. Сначала пытается выполнится код в try и если выполняется то все нормально, а если ошибка в try
        то будет catch и код не сломаетсяю. По этому если вдруг будет код который будет работать только на одной конкретной странице,
        но при этом мы как обычно собираем все в одну кучу в main.js, то что бы код не ломал страницу, то просто try catch*/
        } catch(e) {}  

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