import { Game } from "/Game.js";


export class Snake {
    game;
    parts;
    direction;
    growing;
    canChangeDirection;
    speed = 1;
    static directions = {
        'ArrowRight': {
            column: 1,
            row: 0,
            axisMove: 'horizontal'
        }, 'ArrowLeft': {
            column: -1,
            row: 0,
            axisMove: 'horizontal'
        }, 'ArrowUp': {
            column: 0,
            row: -1,
            axisMove: 'vertical'
        }, 'ArrowDown': {
            column: 0,
            row: 1,
            axisMove: 'vertical'
        }
    }

    constructor(game, row, column) {
        this.game = game;
        this.parts = [{
            row, column,
            self: this.createSnakePart(row, column)
        }, {
            row: 1,
            column: 4,
            self: this.createSnakePart(1, 4)
        }, {
            row: 1,
            column: 3,
            self: this.createSnakePart(1, 3)
        }];
        this.direction = 'ArrowRight';
    }

    /**
     * 
     * @param {number} row -> grid row
     * @param {number} column -> grid column
     * @returns the created Div element for a specific part of the snake.
     */
    createSnakePart(row, column) {
        let element = document.createElement('div');
        element.className = 'snake-part';
        element.style['grid-row'] = row;
        element.style['grid-column'] = column;
        Game.container.appendChild(element);
        return element;
    }

    /**
     * 
     * Handles moving the snake based on the current direction.
     * checks eating a food
     * checks if the head of the snake collapses with another part.
     * ...
     */
    move() {
        const directionPlus = Snake.directions[this.direction];
        const rowsPlus = directionPlus.row;
        const columnsPlus = directionPlus.column;
        const newHead = this.parts[this.parts.length - 1];

        const newGridRow = Number(this.parts[0].self.style['grid-row']) + rowsPlus;
        const newGridColumn = Number(this.parts[0].self.style['grid-column']) + columnsPlus;

        if (this.collapsed(newGridRow, newGridColumn) ||
            newGridRow == 0 || newGridColumn == 0 ||
            newGridRow == Game.getRowsCount() + 1 || newGridColumn == Game.getColumnsCount() + 1) {
            this.game.over = true;
            return;
        }
        newHead.self.style['grid-row'] = newGridRow;
        newHead.self.style['grid-column'] = newGridColumn;
        newHead.column = newGridColumn;
        newHead.row = newGridRow;

        this.parts.pop();

        if (this.growing) {
            this.growing = false;
            this.parts.push({
                row: this.parts[this.parts.length - 1].row,
                column: this.parts[this.parts.length - 1].column,
                self: this.createSnakePart(this.parts[this.parts.length - 1].row, this.parts[this.parts.length - 1].column)
            });
        }

        this.parts.unshift(newHead);

        this.parts.forEach(part => {
            part.self.classList.remove('head');
        });
        newHead.self.classList.add('head');
        this.checkEat();

        this.canChangeDirection = true;
    }

    /**
     * 
     * @param {string} newDirection -> example ArrowLeft
     * changes direction if it should else it doesn't change direction.
     */
    changeDirection(newDirection) {
        if (this.game.paused) return;
        if (!this.canChangeDirection) return;
        if (!Object.keys(Snake.directions).includes(newDirection)) return;
        const currentAxisMove = Snake.directions[this.direction].axisMove;
        const newAxisMove = Snake.directions[newDirection]?.axisMove;
        if (currentAxisMove == newAxisMove) return; //Prevent 180 reversal
        this.direction = newDirection;
        this.canChangeDirection = false;
    }

    /**
     * 
     * @returns the head of the snake.
     */
    getHead() {
        return this.parts[0];
    }

    /**
     * 
     * @param {number} newGridRow -> grid row
     * @param {number} newGridColumn -> grid column
     * @returns true if the head collapsed with any other part of the snake.
     * else it @returns false.
     */
    collapsed(newGridRow, newGridColumn) {
        if (this.parts.length == 1) return;
        for (let i = 0; i < this.parts.length; i++) {
            const currentPart = this.parts[i];
            if (newGridColumn == currentPart.column && newGridRow == currentPart.row) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if the head of the snake is above the food which means it should eat it.
     * And Handles eating the food.
     */
    checkEat() {
        if (this.getHead().row == this.game.food.row && this.getHead().column == this.game.food.column) {
            //eating sound
            this.game.food.randomPosition();
            this.game.playEatSound();
            this.growing = true;
            this.game.foodEaten++;
        }
    }
}
