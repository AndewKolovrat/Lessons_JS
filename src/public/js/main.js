
import { Products } from './Products.js';
import { Cart } from './Cart.js';
import { Search } from './Search.js';
import { Error } from './ErrorAllert.js';
import { FeedBack } from './feedback.js';

export const Shop = {
    components: {
        Products,
        Cart,
        Search,
        Error,
        FeedBack
    },
    provide() {
        return {
            API: this.API,
            getJson: this.getJson,
            postJson: this.postJson,
            putJson: this.putJson,
            delJson: this.delJson
        }
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
                .catch(error => this.$refs.error.setError(error));
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        delJson(url) {
            return fetch(url, {
                method: 'DELETE',
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        }
    }
};

Vue.createApp(Shop).mount(`#shop`)