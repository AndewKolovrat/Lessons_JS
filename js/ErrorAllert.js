export const Error = {
    data() {
        return {
            error: ''
        }
    },
    methods: {
        setError(error) {
            this.error = error;
        },
        resetError() {
            this.error = '';
        }
    },
    template: `<div class='error' v-show="this.error" align="center">
                    <strong> Error </strong>
                    <slot>{{error}}</slot>
                </div> `
};