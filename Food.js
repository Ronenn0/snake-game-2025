import { Game } from "/Game.js";
export class Food {
    game;
    row;
    column;

    constructor(game) {
        this.game = game;
        this.createSelf();
    }

    createSelf() {
        const element = document.createElement('img');
        element.src = 'images/apple.png';
        element.className = 'food';
        Game.container.appendChild(element);
        this.self = element;
        this.randomPosition();
    }

    randomPosition() {
        const row = Math.ceil(Game.getRowsCount() * Math.random());
        const column = Math.ceil(Game.getColumnsCount() * Math.random());

        this.row = row;
        this.column = column;
        this.self.style['grid-row'] = row;
        this.self.style['grid-column'] = column;
    }
}