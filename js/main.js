const form = document.querySelector('.footer_feedback');
const patterns = {
    name: /^[\w]+$/i,
    phone: /^\+\d\([\d]{3}\)[\d]{3}\-[\d]{4}$/i,
    mail: /^[\w]{1}[\w\.\-]+@[\w]+\.[a-z]{2,4}$/i
}
const validate = new Validate(form, ['name', 'phone', 'mail'], patterns);
form.addEventListener('submit', e => {
    if (!validate.check()) {
        e.preventDefault();
    }
});

const Shop = {
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
            catalogUrl: '/catalogData.json',
            cartUrl: '/getBasket.json',
            products: [],
            cart: [],
            imgCatalog: 'https://placehold.it/200x150',
            isVisibleCart: false,
            search: ''
        }
    },
    computed: {
        getReg() {
            return new RegExp(this.search, 'i');
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProductToCart(product) {
            this.getJson(this.API + '/addToBasket.json')
                .then(data => {
                    if (data.result) {
                        let find = this.cart.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity += 1;
                        }
                        else {
                            product.quantity = 1;
                            this.cart.push(product);
                        }
                    }
                });
        },
        removeProductFromCart(product) {
            this.getJson(this.API + '/deleteFromBasket.json')
                .then(data => {
                    if (data.result) {
                        product.quantity -= 1;
                        if (!product.quantity) {
                            this.cart.splice(this.cart.indexOf(product), 1);
                        }
                    }
                })
        }
    },
    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
        this.getJson(this.API + this.cartUrl)
            .then(data => {
                for (let cartItem of data.contents) {
                    this.cart.push(cartItem);
                }
            });
    }
};

Vue.createApp(Shop).mount(`#shop`)