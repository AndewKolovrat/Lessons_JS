class Food {
    x = null;
    y = null;

    init(settings, snake, board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    setNewFood() {
        const foodCoords = this.getRandomCoords();
        this.board.renderFood(foodCoords);
    }

    setFood() {
        this.board.renderFood(this);
    }

    getRandomCoords() {
        while (true) {
            this.x = this.getRandomInt(1, this.settings.colsCount);
            this.y = this.getRandomInt(1, this.settings.rowsCount);
            let cell = this.board.getCellEl(this.x, this.y);

            if (cell.classList.contains('snakeBody')) {
                continue;
            };
            return this;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}