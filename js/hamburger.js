// Маленький (50 рублей, 20 калорий).
// Большой (100 рублей, 40 калорий). 
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// С сыром (+10 рублей, +20 калорий).
// С салатом (+20 рублей, +5 калорий).
// С картофелем (+15 рублей, +10 калорий). 
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и 
// полить майонезом (+20 рублей, +5 калорий). 
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 

// массивы объектов с описанием
const sizes = [
    { name: 'big', cost: 100, cal: 40 },
    { name: 'small', cost: 50, cal: 20 }
]
const filles = [
    { name: 'С сыром', cost: 10, cal: 20 },
    { name: 'С салатом', cost: 20, cal: 5 },
    { name: 'С картошкой', cost: 15, cal: 10 }
]
const topings = [
    { name: 'Приправа', cost: 15, cal: 0 },
    { name: 'Майонез', cost: 20, cal: 5 }
]

// функция для загрузки списков добавок
const DOMLoading = () => {
    const sizeSelect = document.querySelector('.burger_container_size_select');
    sizeSelect.onSelected = updateView();
    const sizeSelectHTML = sizes.reduce((sum, item) => {
        return `${sum} <option value="${item.name}">${item.name}</option>`;
    }, '');
    sizeSelect.innerHTML = sizeSelectHTML;
    sizeSelect.firstElementChild.checked = true;
    const fillSelect = document.querySelector('.burger_container_fill_select');
    const fillSelectHTML = filles.reduce((sum, item) => {
        return `${sum} <option value="${item.name}">${item.name}</option>`;
    }, '');
    fillSelect.innerHTML = fillSelectHTML;
    fillSelect.firstElementChild.checked = true;

    const topingSelect = document.querySelector('.burger_container_topings_list');
    const topingSelectHTML = topings.reduce((sum, item) => {
        let res = `	<li class="burger_container_topings_list_item">
							<input class="burger_container_topings_list_item_input" type="checkbox" id="${item.name}">
							<label class="burger_container_topings_list_item_label" for="${item.name}">${item.name}</label>
						</li>`
        return sum + res;
    }, '');
    topingSelect.innerHTML = topingSelectHTML;
}
// класс описывающий бургер
class Hamburger {

    // конструктор с параметрами по умолчанию
    constructor(size = sizes[0], fill = filles[0]) {
        this.size = size;
        this.fill = fill;
        this.topings = [];
        this.price = 0;
        this.cal = 0;
        this._calc();
    }

    // функция меняющая размер
    changeSize(size) {
        this.size = size;
        this._calc();
    }

    // функция меняющая начинку
    changeStuffing(stuf) {
        this.fill = stuf;
        this._calc();
    }

    // функция добавляющая "добавку"
    addTopping(topping) {
        if (this.topings.indexOf(topping) === -1)
            this.topings.push(topping);
        this._calc();
    }
    // функция удаляющая "добавку"
    removeTopping(topping) {
        const index = this.topings.indexOf(topping);
        if (index !== -1)
            this.topings.splice(index, 1);
        this._calc();
    }

    // расчет стояимости и каллорий
    _calc() {
        let result = { price: 0, cal: 0 };
        result.price = this.size.cost + this.fill.cost;
        result.cal = this.size.cal + this.fill.cal;
        for (const top of this.topings) {
            result.price += top.cost;
            result.cal += top.cal;
        }
        this.price = result.price;
        this.cal = result.cal;
        return result;
    }
}

// объявление и создание бургера
const myBurger = new Hamburger();

// функция меняющая бургер при изменениях опций
const updateView = () => {

    const sizesD = document.querySelector('.burger_container_size_select').value;
    const fillesD = document.querySelector('.burger_container_fill_select').value;

    for (const sz of sizes) {
        if (sz.name === sizesD)
            myBurger.changeSize(sz);
    }
    for (const fl of filles) {
        if (fl.name === fillesD)
            myBurger.changeStuffing(fl);
    }

    const toppingInputs = document.querySelectorAll('.burger_container_topings_list_item_input');
    toppingInputs.forEach(el => {
        for (const tp of topings) {
            if (tp.name === el.id)
                if (el.checked) myBurger.addTopping(tp);
                else myBurger.removeTopping(tp);
        }
    });

    document.querySelector('.info_content_cost').innerHTML = myBurger.price;
    document.querySelector('.info_content_cal').innerHTML = myBurger.cal;

    console.log(myBurger);
}

window.addEventListener('DOMContentLoaded', () => {
    DOMLoading();
    document.addEventListener('input', () => {
        updateView();
    });
});
