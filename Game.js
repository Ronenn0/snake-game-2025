import { game, getCSSVariable, playSound, sleep, initializeNewGame } from './script.js';
import { Snake } from './Snake.js';
import { Food } from './Food.js';

const gameOverContainer = document.querySelector('.game-over');
const scoreSpan = document.querySelector('.current-score');
const actionsContainer = document.querySelector('.actions');


export class Game {
    audioCtx = new window.AudioContext();
    framesCounter;
    score;
    snake;
    food;
    foodEaten;
    over; // is game over
    time; // ms between each frame
    playingGameOverSound;
    paused;
    restarted;
    static container = document.querySelector('main.game'); // game container 'main'


    constructor() {
        this.snake = new Snake(this, 1, 5);
        this.food = new Food(this);
        this.framesCounter = 0;
        this.score = 0;
        this.foodEaten = 0;
        this.time = 90;
        this.paused = false;
        this.restarted = false;
        this.playingGameOverSound = false;
    }

    /**
     * 
     * @returns the size of the game 'main' container in px
     */
    static getSize() {
        return Number(this.container.clientWidth);
        // return getCSSVariable('--game-size', true);
    }

    /**
     * 
     * @returns the rows count in the game's grid
     */
    static getRowsCount() {
        return getCSSVariable('--game-rows', true);
    }

    /**
     * 
     * @returns the columns count in the game's grid
     */
    static getColumnsCount() {
        return getCSSVariable('--game-columns', true);
    }

    /**
     * This is the game's loop
     */
    loop() {
        if (this.restarted) return;
        if (this.paused) return;
        this.snake.move();
        if (this.over) {
            this.displayGameOver();
            return;
        }
        this.framesCounter++;
        this.handleScore();
        if (this.time > 40 && this.framesCounter % 50 == 0) {
            this.time--;
        }
        setTimeout(() => {
            this.loop()
        }, this.time);
    }

    /**
     * Displays game over container
     * saves a high score if the current score is higher than the current high score.
     */
    async displayGameOver() {
        // alert('Game Over');
        this.snake.getHead().self.classList.add('red');
        this.playGameOverSound();
        this.playingGameOverSound = true;
        await sleep(1500);

        const gameOverScore = document.querySelector('.game-over-score');
        gameOverScore.textContent = this.score;

        const gameOverhighestScore = document.querySelector('.game-over-highest-score');
        let highestScore = this.score;
        if (localStorage.getItem('highest-score')) {
            highestScore = Math.max(Number(JSON.parse(localStorage.getItem('highest-score'))), this.score);
        }
        localStorage.setItem('highest-score', highestScore);
        gameOverhighestScore.textContent = highestScore;

        gameOverContainer.classList.remove('hidden');
        this.playingGameOverSound = false;
    }

    /**
     * Plays eating sound
     */
    playEatSound() {
        playSound('eat-sound');
    }

    /**
     * Plays Game over sound
     */
    playGameOverSound() {
        playSound('game-over-sound');
    }

    /**
     * Updates the score's span with the current score.
     */
    handleScore() {
        this.score = Math.floor(this.framesCounter / 20) + this.foodEaten;
        scoreSpan.textContent = this.score;
    }

    /**
     * restarts the game - initializes a new game.
     */
    restart() {
        if (this.playingGameOverSound) return;
        actionsContainer.classList.remove('paused');
        this.restarted = true;
        gameOverContainer.classList.add('hidden');
        Game.container.innerHTML = '';
        initializeNewGame();
    }
    /**
     * Pauses the game.
     */
    pause() {
        this.paused = true;
        actionsContainer.classList.add('paused');
    }

    /**
     * resumes the game.
     */
    resume() {
        this.paused = false;
        actionsContainer.classList.remove('paused');
        this.loop();
    }
}
