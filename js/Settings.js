class Settings {
    /**
     * @param {Object} params - Парметры игры.
     * @param {number} params.rowsCount - количество строк игрового поля.
     * @param {number} params.colsCount - количество колонок игрового поля.
     * @param {number} params.speed - скорость перемещения змейки.
     * @param {number} params.winLength - какую длину надо наесть, чтобы выиграть.
     * @param {number} params.wallCount - какую длину надо наесть, чтобы выиграть.
     * @throws {Error} если переданы не верные настройки выбрасывается
     * соответствующая ошибка.
     */
    init(params) {
        let defaultParams = { rowsCount: 21, colsCount: 21, speed: 2, winLength: 10, wallCount: 3 };

        defaultParams = { ...defaultParams, ...params }; // spread

        // TODO: error handling;

        this.rowsCount = defaultParams.rowsCount;
        this.colsCount = defaultParams.colsCount;
        this.speed = defaultParams.speed;
        this.winLength = defaultParams.winLength;
        this.wallCount = defaultParams.wallCount;
    }
}