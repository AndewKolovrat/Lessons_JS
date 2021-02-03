export const Search = {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        check(text) {
            return new RegExp(this.value, 'i').test(text);
        }
    },
    template: `<form action="#" class="search-form">
                    <input type="search" v-model.lazy="value" class="search-form_field">
                </form>`
};