const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getData = (url, cb) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject(() => console.log('error'));
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
        xhr.send();
        // возможно не правильно понял задание.
        // я бы не использовал "колбэк", а просто возвращал промис.
    }).then(result => cb(result));
};
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
        return `<li class="products_item">
                  <img src="${this.img}" alt="${this.title}">
                  <div class="products_item_desc">
                      <h3>${this.title}</h3>
                      <p>${this.price}</p>
                      <button class="products_item_buy-btn" id="buy${this.id}">Купить</button>
                  </div>
              </li>`
    }
}

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData()
            .then(() => this._render());
    }

    getTotalPrice() {
        return this.products.reduce((accum, item) => accum += item.price, 0);
    }

    _fetchData() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = data;
                for (let dataEl of this.data) {
                    this.products.push(new Product(dataEl));
                }
            })
        // для проверки задания
        // return getData(`${API}/catalogData.json`, (res) => {
        //     this.data = JSON.parse(res);
        //     for (let dataEl of this.data) {
        //         this.products.push(new Product(dataEl));
        //     }
        // });
    }

    _render() {
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }
            this.container.insertAdjacentHTML('beforeend', product.render())
            // более класивого решения я не нашел :( 
            document.getElementById(`buy${product.id}`).addEventListener('click', () => this.btnBuyClick(product));
        }
        console.log(`Total product price - ${this.getTotalPrice()}.`);
    }

    btnBuyClick(item) { };
}

class Shop {
    constructor() {
        this.cart = new Cart('.cart');
        this.list = new ProductsList();
        this.list.btnBuyClick = (item) => {
            console.log(item);
            this.cart.addItem(item);
        }
    }
}


window.onload = () => {
    new Shop();
};