import { CartItem } from "./CartItem.js";

export const Cart = {
    components: {
        CartItem
    },
    data() {
        return {
            catalogUrl: '/getBasket.json',
            isVisibleCart: false,
            items: [],
            imgCatalog: 'https://placehold.it/100x75',
        }
    },
    methods: {
        _createCartItem(product) {
            return Object.assign({ quantity: 1 }, product)
        },
        showOrHide() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        addProductToCart(product) {
            this.$root.getJson(this.$root.API + '/addToBasket.json')
                .then(data => {
                    if (data.result) {
                        let find = this.items.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity += 1;
                        }
                        else {
                            this.items.push(this._createCartItem(product));
                        }
                    }
                });
        },
        removeProductFromCart(product) {
            this.$root.getJson(this.$root.API + '/deleteFromBasket.json')
                .then(data => {
                    if (data.result) {
                        product.quantity -= 1;
                        if (!product.quantity) {
                            this.items.splice(this.items.indexOf(product), 1);
                        }
                    }
                })
        }
    },
    computed: {
        getCartItemsCount() {
            return this.items.length;
        },
        getAllPrices() {
            return this.items.reduce((accumulator, it) => {
                return accumulator += it.price * it.quantity;
            }, 0);
        }
    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.catalogUrl}`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let item of data.contents) {
                    this.items.push(item);
                }
            });
    },
    template: `<ul class="header_cart" v-show="isVisibleCart">
                    <li class="header_cart_item">
                        <p>Image</p>
                        <h4>Имя товара</h4>
                        <p>Цена ед.</p>
                        <p>Количество</p>
                        <p>Цена за позицию</p>
                        <p>Удалить позицию</p>
                    </li>
                    
                    <h3 v-show="!this.items.length" align='center'>
                        Cart is empty
                    </h3>

                    <CartItem
                        v-for="el of items" 
                        :key="el.id_product" 
                        :img="imgCatalog"
                        :cartItem="el">
                    </CartItem>
                    
                </ul>
                <p align="center">Всего {{getCartItemsCount}} товаров на сумму - {{getAllPrices}}</p>`
};