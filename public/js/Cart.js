import { CartItem } from "./CartItem.js";

export const Cart = {
    inject: ['getJson', 'postJson', 'putJson', 'delJson'],
    components: {
        CartItem
    },
    data() {
        return {
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
            let find = this.items.find(el => el.id_product === product.id_product);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                return;
            }

            let cartItem = Object.assign({ quantity: 1 }, product);
            this.postJson(`/api/cart`, cartItem)
                .then(data => {
                    if (data.result) {
                        this.items.push(cartItem);
                    }
                });
        },
        removeProductFromCart(cartItem) {
            if (--cartItem.quantity <= 0) {
                this.delJson(`/api/cart/${cartItem.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.items.splice(this.items.indexOf(cartItem), 1);
                        } else {
                            cartItem.quantity++;
                        }
                    });
            }
            else {
                this.putJson(`/api/cart/${cartItem.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (!data.result) {
                            find.quantity++;
                        }
                    });
            }
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
        this.$root.getJson('/api/cart')
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