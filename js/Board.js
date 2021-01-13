class Board {
    constructor() {
        this.boardEl = document.getElementById("game");
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек.
     * @param {Snake} snake объект змейки.
     */
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
        this.walls = new Array(this.settings.wallCount);
    }

    getCellEl(x, y) {
        return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    clearBoard() {
        const tdElems = document.querySelectorAll('td');
        tdElems.forEach(function (td) {
            td.className = "";
        });
    }

    /**
     * Получаем набор тегов td, представляющих тело змейки.
     * @param {array} bodyCoords массив объектов с координатами
     * @returns {HTMLTableCellElement[]|null} возвращается набор тегов td если были
     * переданы координаты, иначе null.
     */
    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (const cell of bodyCoords) {
                const elem = this.getCellEl(cell.x, cell.y);
                bodyElems.push(elem)
            }
            return bodyElems;
        }
        return null;
    }

    /**
     * Метод отрисовывает игровое поле.
     */
    renderBoard() {
        this.boardEl.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    renderSnake() {
        const snakeBody = this.getSnakeBodyElems(this.snake.body);
        if (snakeBody) {
            for (const cell of snakeBody) {
                cell.classList.add('snakeBody')
            }
        }
    }

    renderFood(coords) {
        const foodCell = this.getCellEl(coords.x, coords.y);
        foodCell.classList.add('food')
    }

    renderWalls() {
        for (const i of this.walls) {
            const wallsCell = this.getCellEl(i.x, i.y);
            wallsCell.classList.add('wall')
        }
    }

    setNewWalls() {
        this.walls = new Array(this.settings.wallCount);
        for (let index = 0; index < this.walls.length; index++) {
            this.walls[index] = new Wall(this.settings, this.snake, this);
            this.walls[index].setNewWall();
        }
        this.renderWalls();
    }

    /**
     * Является ли следующий шаг, шагом в стену.
     * @param {Object} nextCellCoords - координаты ячейки, куда змейка собирается сделать шаг.
     * @param {number} nextCellCoords.x
     * @param {number} nextCellCoords.y
     * @returns {boolean}
     */
    isNextStepToWall(nextCellCoords) {

        if (nextCellCoords.y > this.settings.rowsCount) this.snake.body[0].y = 1;
        if (nextCellCoords.y === 0) this.snake.body[0].y = this.settings.rowsCount;

        if (nextCellCoords.x > this.settings.colsCount) this.snake.body[0].x = 1;
        if (nextCellCoords.x === 0) this.snake.body[0].x = this.settings.colsCount;

        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        if (nextCell) return nextCell.classList.contains('wall');

        return false;
    }


    /**
     * Метод проверяет съела ли змейка еду.
     * @returns {boolean} true если змейка находится на еде, иначе false.
     */
    isHeadOnFood() {
        return this.boardEl.querySelector('.food').classList.contains('snakeBody');
    }
}