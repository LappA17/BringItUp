export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        
/* Здесь тоже есть ошибка, потому что this.oldOfficer к которому мы обращаемся изначально был получен в конструкторе.
this.oldOfficer = document.querySelector(oldOfficer); а сюда у нас олдОфисер передает null , то мы не можем 
this.oldItems = this.oldOfficer.querySelectorAll(items); здесь найти определенные элементы потому что мы ищем у null, то же самое с new
*/
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch(e){}
    }

    bindTriggers(container, items, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                counter++;
            } else {
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }
    
    /* Здесь тоже обернем ведь тоже могут давать ошибки */
    init() {
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
    
            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
        } catch(e){}
    }
}