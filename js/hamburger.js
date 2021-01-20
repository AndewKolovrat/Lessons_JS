// Маленький (50 рублей, 20 калорий).
// Большой (100 рублей, 40 калорий). 
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// С сыром (+10 рублей, +20 калорий).
// С салатом (+20 рублей, +5 калорий).
// С картофелем (+15 рублей, +10 калорий). 
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и 
// полить майонезом (+20 рублей, +5 калорий). 
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 

// Класс описывающие компоненты
class ComponentList {

    constructor() {
        // массивы объектов с описанием
        this.sizes = [
            { name: 'Большой', price: 100, cal: 40 },
            { name: 'Маленький', price: 50, cal: 20 }
        ]
        this.filles = [
            { name: 'С сыром', price: 10, cal: 20 },
            { name: 'С салатом', price: 20, cal: 5 },
            { name: 'С картошкой', price: 15, cal: 10 }
        ]
        this.topings = [
            { name: 'Приправа', price: 15, cal: 0 },
            { name: 'Майонез', price: 20, cal: 5 }
        ]
    }
}

// класс связывающий компоненты и бургер с ГУИ
class HamburgerBuilder {

    constructor() {
        this.components = new ComponentList();
        this.burger = new Hamburger(this.components.sizes[0], this.components.filles[0]);
        this._createGUI();
        this._updateUI();
    }

    // функция для вывода информации
    _updateUI() {
        document.querySelector('.info_content_cost').innerHTML = this.burger.price;
        document.querySelector('.info_content_cal').innerHTML = this.burger.cal;
        console.log(this.burger);
    }

    // функция для создания GUI компонентов
    _createGUI() {
        const sizeSelect = document.querySelector('.burger_container_size_select');
        const sizeSelectHTML = this.components.sizes.reduce((sum, item) => {
            return `${sum} <option value="${item.name}">${item.name}</option>`;
        }, '');
        sizeSelect.innerHTML = sizeSelectHTML;
        sizeSelect.firstElementChild.checked = true;
        sizeSelect.addEventListener("change", () => {
            this._change('size', sizeSelect);
        });
        const fillSelect = document.querySelector('.burger_container_fill_select');
        const fillSelectHTML = this.components.filles.reduce((sum, item) => {
            return `${sum} <option value="${item.name}">${item.name}</option>`;
        }, '');
        fillSelect.innerHTML = fillSelectHTML;
        fillSelect.firstElementChild.checked = true;
        fillSelect.addEventListener("change", () => {
            this._change('fill', fillSelect);
        });

        const topingSelect = document.querySelector('.burger_container_topings_list');
        const topingSelectHTML = this.components.topings.reduce((sum, item) => {
            let res = `	<li class="burger_container_topings_list_item">
                                <input class="burger_container_topings_list_item_input" type="checkbox" id="${item.name}">
                                <label class="burger_container_topings_list_item_label" for="${item.name}">${item.name}</label>
                            </li>`
            return sum + res;
        }, '');
        topingSelect.innerHTML = topingSelectHTML;
        topingSelect.addEventListener("change", () => {
            this._change('toping', topingSelect);
        });
    }

    // обработка изменений
    _change(type, obj) {
        switch (type) {
            case 'size':
                for (const sz of this.components.sizes) {
                    if (sz.name === obj.value) {
                        this.burger.changeSize(sz);
                    }
                }
                break;
            case 'fill':
                for (const fl of this.components.filles) {
                    if (fl.name === obj.value) {
                        this.burger.changeStuffing(fl);
                    }
                }
                break;
            case 'toping':
                const toppingInputs = document.querySelectorAll('.burger_container_topings_list_item_input');
                for (const tp of this.components.topings) {
                    for (const cb of toppingInputs) {
                        if (tp.name === cb.id) {
                            if (cb.checked) this.burger.addTopping(tp);
                            else this.burger.removeTopping(tp);
                        }
                    }
                }
                break;
        }
        this._updateUI();
    }
}

// класс описывающий бургер
class Hamburger {

    constructor(size, fill, topings = []) {
        this.size = size;
        this.fill = fill;
        this.topings = topings;
        this.price = this.size.price + this.fill.price;
        this.cal = this.size.cal + this.fill.cal;
    }

    // функция меняющая размер
    changeSize(size) {
        const oldSize = this.size;
        if (oldSize !== size) {
            this.price -= oldSize.price;
            this.cal -= oldSize.cal;
            this.price += size.price;
            this.cal += size.cal;
            this.size = size;
        }
    }

    // функция меняющая начинку
    changeStuffing(stuf) {
        const oldStuf = this.fill;
        if (oldStuf !== stuf) {
            this.price -= oldStuf.price;
            this.cal -= oldStuf.cal;
            this.fill = stuf;
            this.price += stuf.price;
            this.cal += stuf.cal;
        }
    }

    // функция добавляющая "добавку"
    addTopping(topping) {
        if (this.topings.indexOf(topping) === -1) {
            this.topings.push(topping);
            this.price += topping.price;
            this.cal += topping.cal;
        }
    }
    // функция удаляющая "добавку"
    removeTopping(topping) {
        const index = this.topings.indexOf(topping);
        if (index !== -1) {
            this.price -= topping.price;
            this.cal -= topping.cal;
            this.topings.splice(index, 1);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const builder = new HamburgerBuilder();
});
