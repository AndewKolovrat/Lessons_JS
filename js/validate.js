
class Validate {

    constructor(form, fields = [], patterns) {
        this.form = form;
        this.patterns = patterns;
        this._formFields = [];
        this._warningMsg;
        this._init(fields);
    }


    check() {
        this._check();
        return this.form.querySelectorAll('.invalid').length === 0;
    }

    _check() {
        for (const field of this._formFields) {
            if (!this.patterns[field.id].test(field.value)) {
                field.classList.add('invalid');
                this._warningMsg.textContent = `Invalid field ${field.id}`;
                this._watchField(field);
            }
        }
    }

    _init(fields) {
        for (const f of fields) {
            const field = this.form.querySelector(`#${f}`);
            if (field) {
                this._formFields.push(field);
            }
        }
        this._warningMsg = this.form.querySelector('#warningMsg');
    }

    _watchField(field) {
        field.addEventListener('input', () => {
            if (this.patterns[field.id].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (this._warningMsg.textContent) {
                    this._warningMsg.textContent = '';
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
            }
        });
    }

}