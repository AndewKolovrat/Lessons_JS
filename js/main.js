import { division, addition, subtraction, multiplying } from './math.js'

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

///////////////////////////// SPECS ////////////////////////////////////
describe('Функция division', () => {
    it('При аргументах 12 и 3 должно возвращаться 4', () => {
        expect(division(12, 3)).toBe(4);
    });
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(division(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(division(2, null)).toBeNull();
    });
    it('должна возвращать null при аргументах (null, null)', () => {
        expect(division(null, null)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(division(undefined, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(division(2, undefined)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(division("string", 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, "string")', () => {
        expect(division(2, "string")).toBeNull();
    });
});

describe('Функция addition', () => {
    it('При аргументах 12 и 3 должно возвращаться 15', () => {
        expect(addition(12, 3)).toBe(15);
    });
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(addition(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(addition(2, null)).toBeNull();
    });
    it('должна возвращать null при аргументах (null, null)', () => {
        expect(addition(null, null)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(addition(undefined, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(addition(2, undefined)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(addition("string", 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, "string")', () => {
        expect(addition(2, "string")).toBeNull();
    });
});

describe('Функция subtraction', () => {
    it('При аргументах 12 и 3 должно возвращаться 9', () => {
        expect(subtraction(12, 3)).toBe(9);
    });
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(subtraction(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(subtraction(2, null)).toBeNull();
    });
    it('должна возвращать null при аргументах (null, null)', () => {
        expect(subtraction(null, null)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(subtraction(undefined, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(subtraction(2, undefined)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(subtraction("string", 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, "string")', () => {
        expect(subtraction(2, "string")).toBeNull();
    });
});

describe('Функция multiplying', () => {
    it('При аргументах 12 и 3 должно возвращаться 36', () => {
        expect(multiplying(12, 3)).toBe(36);
    });
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(multiplying(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(multiplying(2, null)).toBeNull();
    });
    it('должна возвращать null при аргументах (null, null)', () => {
        expect(multiplying(null, null)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(multiplying(undefined, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, undefined)', () => {
        expect(multiplying(2, undefined)).toBeNull();
    });
    //
    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(multiplying("string", 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (2, "string")', () => {
        expect(multiplying(2, "string")).toBeNull();
    });
});