
const patterns = {
    name: /^[\w]+$/i,
    phone: /^\+\d\([\d]{3}\)[\d]{3}\-[\d]{4}$/i,
    mail: /^[\w]{1}[\w\.\-]+@[\w]+\.[a-z]{2,4}$/i
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.footer_feedback');
    const validate = new Validate(form, ['name', 'phone', 'mail'], patterns);
    form.addEventListener('submit', e => {
        if (!validate.check()) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});

import { Products } from './Products.js';
import { Cart } from './Cart.js';
import { Search } from './Search.js';
import { Error } from './ErrorAllert.js';

const Shop = {
    components: {
        Products,
        Cart,
        Search,
        Error
    },
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
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
                .catch(error => {
                    this.$root.$refs.error.setError(error);
                })
        }
    }
};

Vue.createApp(Shop).mount(`#shop`)