/* После нажатия на how are you showing up должно выскакивать окно с инфой. Это все на странице модулс */

export default class ShowInfo {
    constructor (triggers) {
        this.btns = document.querySelectorAll(triggers); // если селектор не будет передан то оброзуется пустой массив - ошибки трай кетч не будет
    }
    init() {
        this.btns.forEach(btn => {
            btn.addEventListener("click", () => {
                const sibling = btn.closest('.module__info-show').nextElementSibling.style.display = "block"; /* с помощью 
closest найдем родителя потому что мы будем кликать в плюсик а это родитель.
 btn.closest('.module__info-show').nextElementSibling. - так мы получим элемент и кстати ВОТ ТЕБЕ ОТВЕТ ДЛЯ ЧЕГО НУЖНЫ ПЕРЕМЕННЫЕ
 ВЕДЬ ПРОПИСЫВАТЬ ТАКОЙ БОЛЬШОЙ ФУНКЦИОНАЛ ПОСТОЯННО ЕСЛИ БУДЕМ ИСПОЛЬЗОВАТЬ ЭТОТ ЭЛЕМЕНТ НЕ НУЖНО*/

                sibling.classList.toggle('msg');
                sibling.style.marginTop = '20px';
/* Теперь будет открывать и закрываться с помощью тоггл, а марджинТоп вписали потому что немного отсутп лишний  */
            });
        });
    }
}