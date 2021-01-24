class Product {

    constructor(product, img = 'https://placehold.it/250x150') {
        let { product_name, price = 0, id_product } = product;
        this.title = product_name;
        this.img = img;
        this.price = price;
        this.id = id_product;
        this.rendered = false
    }

    render() {
        this.rendered = true;
        return `<li class="products_item" data-id='${this.id}'>
                  <img src="${this.img}" alt="${this.title}">
                  <div class="products_item_desc">
                      <h3>${this.title}</h3>
                      <p>${this.price}</p>
                      <button class="products_item_buy-btn" data-id="${this.id}">Купить</button>
                  </div>
              </li>`
    }

    _updateRender() { }
}

class CartItem extends Product {

    constructor(product, count = 1) {
        super(product);
        this.count = count;
    }

    // позиции возвращает стоимость товара согластно
    // кол-ву и цене на данную позицию
    getTotalPrice() {
        return this.price * this.count;
    }

    changeCount(delta) {
        this.count += delta;
        this._updateRender();
    }

    remove() {
        document.querySelector(`.cart_item[data-id="${this.id}"]`).remove();
    }

    // позиции для генерации HTML элемента.  
    render() {
        this.rendered = true;
        return `<li class="cart_item" data-id="${this.id}">
                  <h4>${this.title}</h4>
                  <p>${this.price}</p>
                  <p class="cart_item_count">${this.count}</p>
                  <p class="cart_item_total_price">${this.getTotalPrice()}</p>
                  <button class="cart_item_del-btn" data-id="${this.id}">Delete</button>
              </li>`
    }

    _updateRender() {
        const block = document.querySelector(`.cart_item[data-id="${this.id}"]`);
        block.querySelector('.cart_item_count').textContent = this.count;
        block.querySelector('.cart_item_total_price').textContent = this.getTotalPrice();
    }

}

class List {
    static API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
    static itemsMap = {
        Cart: CartItem,
        ProductsList: Product
    };

    constructor(url, container = '.products') {
        this.url = url;
        this.list = [];
        this.container = document.querySelector(container);
        this.init();
    }

    init() {
        return false;
    }

    calcSum() {
        return this.list.reduce((accum, item) => accum += item.price, 0);
    }

    getJson(url) {
        return fetch(url ? url : `${List.API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    handleData(data) {
        for (let dataEl of data) {
            const product = new List.itemsMap[this.constructor.name](dataEl);
            this.list.push(product);
        }
        this._render();
    }

    getItem(id) {
        return this.list.find(product => product.id == id);
    }

    filter(value) {
        this._render(value);
    }

    _render(filtr = '') {
        const regexp = new RegExp(filtr, 'i');
        for (let item of this.list) {
            if (this.constructor.name === 'ProductsList') {
                if (regexp.test(item.title)) {
                    if (!item.rendered) {
                        this.container.insertAdjacentHTML('beforeend', item.render());
                    }
                } else if (item.rendered) {
                    const block = document.querySelector(`.products_item[data-id="${item.id}"]`);
                    item.rendered = false;
                    block.remove();
                }
            }
            else if (!item.rendered) {
                this.container.insertAdjacentHTML('beforeend', item.render());
            }
        }
        this.updateRender();
    }

    updateRender() { }

}

class ProductsList extends List {

    constructor(cart, url = '/catalogData.json', container = '.products') {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then((data) => this.handleData(data));
    }

    init() {
        this.container.addEventListener('click', e => {
            if (e.target.classList.contains('products_item_buy-btn')) {
                const id = e.target.dataset['id'];
                this.cart.addProduct(this.getItem(id));
            }
        });

        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector(`.search-form_field`).value);
        });

    }

    updateRender() {
        console.log(`Total product price - ${this.getTotalPrice()}.`);
    }

    getTotalPrice() {
        return this.list.reduce((accum, item) => accum += item.price, 0);
    }

}

class Cart extends List {

    constructor(url = '/getBasket.json', container = '.cart') {
        super(url, container);
        this.getJson()
            .then((data) => this.handleData(data.contents));
    }

    init() {
        this.container.addEventListener('click', e => {
            if (e.target.classList.contains('cart_item_del-btn')) {
                const id = +e.target.dataset['id'];
                this.removeProduct(this.getItem(id));
            }
        });
        document.querySelector('.header_cart-btn').addEventListener('click', () => {
            this.container.classList.toggle('hidden');
        })
    }

    updateRender() {
        document.querySelector('.header_cart-btn').textContent = `Cart (${this.getPositionCount()})`;
        console.log(`Total cart price - ${this.getTotalPrice()}.`);
    }

    // функция получение полной стоимости корзины
    getTotalPrice() {
        return this.list.reduce((accum, item) => accum += item.getTotalPrice(), 0);
    }

    getPositionCount() {
        return this.list.length;
    }

    addProduct(product) {
        this.getJson(`${List.API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.list.find(el => el.id === product.id);
                    if (find) {
                        find.changeCount(1);
                    } else {
                        let prod = Object.assign({ count: 1, product_name: product.title, id_product: product.id }, product);
                        this.handleData([prod]);
                    }
                } else {
                    console.log('error');
                }
            })
    }

    removeProduct(product) {
        this.getJson(`${List.API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    if (product.count > 1) {
                        product.changeCount(-1)
                    } else {
                        this.list.splice(this.list.indexOf(product), 1);
                        product.remove();
                        this.updateRender();
                    }
                } else {
                    console.log('error');
                }
            })
    }
}