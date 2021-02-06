import { division } from './math.js'
class Calculator {
    constructor(container) {
        this.container = document.querySelector(container);
        this.output;
        this.btnList;
        this._init();
        this._type = '';
    }

    _init() {
        this.output = this._createElement(this.container, 'textarea', 0);
        this.output.addEventListener('keydown', ev => {
            const re = /[a-z]/i;
            if (re.test(ev.key)) {
                ev.preventDefault();
            }
        });
        this.btnList = this._createElement(this.container, 'ul', '');

        [
            '1', '2', '3', '+',
            '4', '5', '6', '-',
            '7', '8', '9', '/',
            '0', '=', 'c'
        ].forEach((sign) => {
            this._createElement(this.btnList, 'button', sign);
        });

        this.btnList.addEventListener('click', ev => {
            switch (ev.target.innerHTML) {
                case 'c':
                    this.output.value = '0';
                    break;
                case '=':
                    this.output.value = this._calc();
                    break;
                case '*':
                    this._type = '*';
                    this.output.value += ev.target.innerHTML;
                    break;
                case '/':
                    this._type = '/';
                    this.output.value += ev.target.innerHTML;
                    break;
                case '-':
                    this._type = '-';
                    this.output.value += ev.target.innerHTML;
                    break;
                case '+':
                    this._type = '+';
                    this.output.value += ev.target.innerHTML;
                    break;
                default:
                    if (this.output.value === '0') {
                        this.output.value = ev.target.innerHTML;
                    } else {
                        this.output.value += ev.target.innerHTML;
                    }
            }
        });
    }

    _createElement(parent, type, content) {
        const el = document.createElement(type);
        el.className = `${parent.className}_${type}`;
        el.innerHTML = content;
        parent.appendChild(el);
        return el;
    }

    _calc() {
        const [arg, arg2] = this.output.value.split(this._type);
        switch (this._type) {
            case '/':
                return division(arg, arg2);
            case '-':
                return subtraction(arg, arg2);
            case '+':
                return addition(arg, arg2);
            case '*':
                return multiplying(arg, arg2);
            default:
                return eval(this.output.value)
        }
    }
}

window.addEventListener('load', function OnWindowLoaded() {
    new Calculator('.calc');
});