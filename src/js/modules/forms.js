export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
/* Теперь открываем хтмл и смотрим что бы нужная нам форма была обернута в тег форм, что бы можно было навесить нормальный обработчик
submit и блоки в информации о пользователе должны быть инпутами, либо определенными дивами, которые не могут быть инпутами.
Если форма просто то должен быть инпут а не див, хотя можно реализовать фционал так что везде где пользователь что-то вводил 
шло к нам на сервер как мы это делали раньшею.
Очень важно что бы был атрибут name. Если этого атрибута не будет либо он задан как-то некоректно, то объект форм-дейта, при помощи
которого мы собираем инфу с формы, у нас не сформируется. И это касается не только инпута, но и select. Те любые интерактивные элементы
с формы должны содержать уникальный атрибут нейм */

        this.inputs = document.querySelectorAll("input"); /* будем очищать инпуты. Получим все инпуты которые есть на стрнице
Как альетрнатима можно получать инпуты иммено в конкретно формы внутри форИч просто. ЭТО ОЧЕНЬ ВАЖНО ДЛЯ ПОНИМАНИЕ ЗАЧЕМ ВАНЯ 
ИНОГДА СОЗДАЕТ ПЕРЕМЕННЫЕ ВНУТРИ ЦИКЛА */

        this.message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
        };
        this.path = 'assets/question.php'; // url

        /* Наша функция будет иметь две формы и только один запрос. По этому этот запрос можно поместить прям в класс формы */
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = "";
        }); // теперь просто передаем в finally
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) { /* Теперь нам нужно запретить кирилицу, плюс мы разрешаем вводить цифры,
сабачку и точку что бы пользователь мог ввести почту ! Точку вводим через обратный слеш */
                    e.preventDefault();
                }
            }); 
        });
    }

    //  Маска
/* Обрати внимание что внутри этого метода много контекста вызова this и jshint нам его подсвечивает говоря будь-те аккуратны. Но его
можно использовать потому что этот контект ссылается на абсолютно другие вещи, а не на наши классы  */    
    initMask() {

        let setCursorPosition = (pos, elem) => {
            elem.focus();
            
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___-____', // USA
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]'); // инпут номера телефона

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    // обрати внимание как в методе async стот
    async postData(url, data) {
        let res = await fetch (url, {
            method: "POST",
            body: data
        });
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initMask();

        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => { // у нас форма отправляется с ajax по этому привентдефолт
                e.preventDefault();

                // Теперь фционал по отправки формы
                let statusMessage = document.createElement('div'); // информаия о загрузки, ошибки или ок
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
/* margin-top - что бы сообщение немного отодвинулось от основной формы
   font-size - что бы текст не терялся на странице*/                
                item.parentNode.appendChild(statusMessage); /* помещаем на страницу. Мы говорим что к родительскому блоку который будет
у формы, мы добавляем наш новый див */

                statusMessage.textContent = this.message.loading; // так как это объект

                // теперь нужно сформулировать данные
                const formData = new FormData(item); // во внутрь помещаем форму на которой произошло событие

                // отправляем их на сервер с помощью постДаты
                this.postData(this.path, formData) /* this.path - путь на который мы отправялем и данные  */
                    .then(res => { /* Дальше так как нам возвращается промис, мы будем его обрабатывать через then. 
Еще одна ремарка - this.path задан статично прямо внутри класса, это мы можем исправить поместив в констуктор еще один аргумент url,
который мы будем подставлять уже в this.path. Изначально было вот так this.path = 'assets/question.php'. Но пока что мы будем
использовать один адресс и мы его оставим внутри в качестве свойства  */

                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();

                        /* Если мы несколько раз отправляем одну и ту же форму - образуется нагромождение из сообщений */
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}