export const FeedBack = {
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
    template: `<form action="#" class="footer_feedback">
                    <input type="text" placeholder="Your name:" class="footer_feedback_name">
                    <input type="text" placeholder="Your phone: +7(000)000-0000" class="footer_feedback_phone">
                    <input type="text"  placeholder="Your email: mymail@mail.ru или my.mail@mail.ru или my-mail@mail.ru" class="footer_feedback_email">
                    <textarea name="message" placeholder="Your message:" cols="30" rows="10" class="footer_feedback_msg"></textarea>
                    <p id="warningMsg" class="footer_feedback_warning"></p>
                    <button class="footer_feedback_btn">Submit</button>
                </form>`
};

// const patterns = {
//     name: /^[\w]+$/i,
//     phone: /^\+\d\([\d]{3}\)[\d]{3}\-[\d]{4}$/i,
//     mail: /^[\w]{1}[\w\.\-]+@[\w]+\.[a-z]{2,4}$/i
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('.footer_feedback');
//     const validate = new Validate(form, ['name', 'phone', 'mail'], patterns);
//     form.addEventListener('submit', e => {
//         if (!validate.check()) {
//             e.preventDefault();
//             e.stopPropagation();
//         }
//     });
// });