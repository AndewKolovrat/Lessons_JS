class Product {
    constructor(product, img = 'https://placehold.it/250x150') {
        let { title, price = 0, id } = product;
        this.title = title;
        this.img = img;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<li class="products_item">
                  <img src="${this.img}" alt="${this.title}">
                  <div class="products_item_desc">
                      <h3>${this.title}</h3>
                      <p>${this.price}</p>
                      <button class="products_item_buy-btn">Купить</button>
                  </div>
              </li>`
    }
}

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData();
        this._render();
        console.log(`Total product price - ${this.some()}.`);
    }

    some() {
        let totalPrices = 0;
        for (let el of this.products) totalPrices += el.price;
        return totalPrices;
    }

    _fetchData() {
        this.data = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Keyboard', price: 200 },
            { id: 3, title: 'Mouse', price: 100 },
            { id: 4, title: 'Gamepad' },
        ];
    }

    _render() {
        for (let dataEl of this.data) {
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

const list = new ProductsList();

// Класс корзины
class Cart {
    constructor() {
        // хранение данных полученых от сервера
        this.data = [];
        // преобразованные данные. Элементы CartItem.
        this.items = [];
        // получаем данные корзины
        _fetchData();
        // отрисовка корзины
        this._render();
    }
    // функция получение полной стоимости корзины
    some() {
        let totalPrices = 0;
        for (let el of this.items) totalPrices += el.some();
        return totalPrices;
    }
    // функция получения данных корзины от сервера
    _fetchData() { }
    // функция отрисовки (вывода на страницу) корзины
    _render() { }
}

// Класс элемента корзины. наследник Product
class CartItem extends Product {
    // конструктор 
    constructor(product, count = 1) {
        // вызываем родительский конструктор
        super(product);
        // добавляем нужную нам переменную
        // количество товаров на данную позицию.
        this.count = count;
    }
    // позиции возвращает стоимость товара согластно
    // кол-ву и цене на данную позицию
    some() {
        return this.price * this.count;
    }
    // позиции для генерации HTML элемента.  
    render() { }
}