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
    template: `<div class="error" v-if="error">
                <p class="error_msg">
                    <button class="error_msg_close-btn" @click="setError('')">
                        &times;
                    </button>
                    {{error}}
                </p>
            </div>`
};