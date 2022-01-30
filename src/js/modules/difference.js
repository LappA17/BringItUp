// Реализуем 6 задание
export default class Difference {
    /* Карточки на странице можно подгружать с сервера как мы это делали раньше, а можно с вертски если они уже есть
как в нашем случае.
    Там где обучение 10 лет назад, то там класс один, там где сейчас класс другой у дивов, но все карточки и там и там
имеют одинаковый класс */

    constructor(oldOfficer, newOfficer, items) { // в айтемс будем передавать селекторы всех карточек которые есть в проекте
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items); /* Что бы не было повторения кода, выносим его в отдельный контекст.
И на этом моменты мы можем избавиться от this.items, потому что мы будем его использовать только внутри констуктора, оно нам приходит
в виде аргумента и мы его сразу здесь и используем */

        this.newItems = this.newOfficer.querySelectorAll(items);
        // this.items = items; // здесь я не буду получать элементы, а просто передаю селектор который прийдет ИЗ-ВНЕ
        this.oldCounter = 0; // счетчик левых карточек
        this. newCounter = 0; // счетчик правого
    }

    // Метод присвоения обработчиков событий
    /* ОПТИМИЗАЦИЯ КОДА В КОНЦЕ УРОКА. Мы передаем container внутри которого будет скать плюсик. 
МЫ ЗАМЕНЯЕМ this.oldOfficer на container 
ТЕПЕРЬ ЭЛЕМЕНТЫ ВНУТРИ КОНТЕЙНЕРА КОТОРЫЕ ПОДПИСАНЫ КАК this.oldItems либо newItems меняем на items
counter заменяем на this.oldCounter 
Тепреь код стал намного чище и фции все равно с какими элементами работать и их нужно просто передать как аргументы */
    bindTriggers(container, items, counter) {
        /* Тут все просто, мы можем прям с методы достучаться до плюса(это тот на который нужно нажимать что бы добавлять карточки) и
сразу вешаем на него обработчик события */
        container.querySelector(".plus").addEventListener("click", () => { // после клика на плюсик мы создадим новое условие

            /* Вэтом условие я должен проверить что у меня сейчас открывается не последний элемент. Нужно что бы наш счетчик который 
считает в каждом из столбиков будет не равен кству этих карточек минус 2. Потому что там в верстке 3 элемента скрыто, последний показывается
и если два элемента уже показаны, то после нажатия плюсика мы должны знать что счетчик перевалил по значению за айтемс.ленг - 2.
Только что в конце урока все понял, когда у меня уже есть 2 карточки, при клике еще раз на click to show - она удаляется и вместо
нее приходит 3 карточка */
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex'; /* Мы просто по очередно будет открывать элементы */
                counter++; // после показа одного блока, увеличиваем счетчик на 1чку
            } else {
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            } /* Читаю код else по русски : если мы дошли последней карточки this.oldItems[this.oldCounter].style.display = "flex";
которую нам нужно показать. То мы ее показываем и после этого удаляем последний блок this.oldItems.length - 1(это его индекс) */
        });

     /*  ЭТОТ КОД УЖЕ МОЖЕМ УБРАТЬ
         this.newOfficer.querySelector(".plus").addEventListener("click", () => {
            if (this.newCounter !== this.newItems.length - 2) {
                this.newItems[this.newCounter].style.display = "flex";
                this.newCounter++;
            } else {
                this.newItems[this.newCounter].style.display = "flex";
                this.newItems[this.oldItems.length - 1].remove();
            } 
        }); */
    }

    /* Нам нужно скрыть карточки и оставить последнюю (клик ту шоу, но она имеет такой же класс как и другие) */
    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }
          /*  this.oldItems.forEach((item, i, arr) => {
 this.oldOfficer.querySelectorAll(this.items) - это будет html коллекция и это псевдомассив, который мы можем перебрать
item - каждоя карточка . i - номер по порядку. arr - ссылка на массив который сейчас перебираем. Делаем это для того что бы можно было
оставить последний элемент на странице клик ту шоу        

            if (i !== arr.length - 1) { // если тот элемент который перебирается в данный момент и его номер попорядку не является последним
                item.style.display = "none";
            } 
        });

        this.newItems.forEach((item, i, arr) => {      
            if (i !== arr.length - 1) { 
                item.style.display = "none";
            }
        }); 
        ЭТО ВСЕ БЫЛО В ХАЙД АЙТЕМС, НО В КОНЦЕ ВАНЯ СТАЛ ОПТИМИЗИРОВАТЬ ПОВТОРЕНИЕ КОДА*/
    

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter); // Здесь будет всё для левой колонки
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter); // Правая

        /* Ищначально было только this.hideItems();
                                  this.bindTriggers() */
    }
    /* В конце урока Ваня стал оптимизировать код, потому что у нас идет много повторения кода */
}