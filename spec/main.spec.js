import { division } from './math.js'

describe('Функция _division', () => {
    it('При аргументах 12 и 3 должно возвращаться 4', () => {
        expect(division(12, 3)).toBe(4);
    });
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(division(null, 2)).toBeNull();
    });
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(division(2, null)).toBeNull();
    });
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(division(null, null)).toBeNull();
    });
});