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
    template: `<div class="error-block" v-if="error">
                <p class="error-msg">
                    <button class="close-btn" @click="setError('')">&times;</button>
                    {{error}}
                </p>
            </div>`
};