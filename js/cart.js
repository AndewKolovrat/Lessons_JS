// Класс корзины
class Cart {
    constructor(container = '.cart') {

        this.container = document.querySelector(container);
        // хранение данных полученых от сервера
        this.data = [];
        // преобразованные данные. Элементы CartItem.
        this.items = [];
        // получаем данные корзины
        this._fetchData()
            .then(() => {
                // отрисовка корзины
                this._render();
            });
        document.querySelector('.header_cart-btn').addEventListener('click', () => this._show());
    }

    // Добавление товара в корзину
    addItem(item) {
        const index = this._getIndexByID(item.id);
        if (index !== -1) {
            this.items[index].count += 1;
        }
        else {
            this.items.push(new CartItem(item));
        }
        console.log(this.items, new CartItem(item));
        this._render();
    }

    // удаление товара из корзины
    removeItem(item) { }

    // очистка корзины
    clear() {
        this.items.clear();
    }

    // оформление заказа
    createOrder() { }

    getCount() {
        return this.items.length;
    }

    // функция получение полной стоимости корзины
    getTotalPrice() {
        return this.items.reduce((accum, item) => accum += item.getTotalPrice(), 0);
    }

    _show() {
        this.container.classList.toggle('hidden');
    }

    // функция получения данных корзины от сервера
    _fetchData() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(res => {
                this.data = res;
                for (const i of this.data.contents) {
                    this.items.push(new CartItem(i));
                }
            });
    }
    // функция отрисовки (вывода на страницу) корзины
    _render() {
        // очистка
        this.container.innerHTML = '';
        for (let ci of this.items) {
            this.container.insertAdjacentHTML('beforeend', ci.render())
            document.getElementById(`del${ci.id}`).addEventListener('click', () => this._btnDelClick(ci));
        }
        document.querySelector('.header_cart-btn').textContent = `Cart (${this.getCount()})`;
        console.log(`Total cart price - ${this.getTotalPrice()}.`);
    }
    _btnDelClick(event) {
        const index = this._getIndexByID(event.id);
        if (index === -1) return;
        if (this.items[index].count > 1) {
            this.items[index].count -= 1;
        }
        else {
            this.items.splice(index, 1);
        }
        this._render();
    }
    _getIndexByID(id) {
        // здесь намеренно использую не строгое сравнение
        return this.items.findIndex(item => item.id == id);
    }
}

// Класс элемента корзины. наследник Product
class CartItem extends Product {
    // конструктор 
    constructor(product, count = 1) {
        super(product);
        // добавляем нужную нам переменную
        // количество товаров на данную позицию.
        this.count = count;
    }
    // позиции возвращает стоимость товара согластно
    // кол-ву и цене на данную позицию
    getTotalPrice() {
        return this.price * this.count;
    }
    // позиции для генерации HTML элемента.  
    render() {
        return `<li class="cart_item">
                  <h4>${this.title}</h4>
                  <p>${this.price}</p>
                  <p>${this.count}</p>
                  <p>${this.getTotalPrice()}</p>
                  <button class="cart_item_del-btn" id="del${this.id}">Delete</button>
              </li>`
    }
}