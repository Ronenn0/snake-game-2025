import { Game } from '/Game.js';

//CSS Variables
const root = document.documentElement;


export function getCSSVariable(variable, isNumber) {
    let value = getComputedStyle(root).getPropertyValue(variable).trim();
    if (isNumber) value = parseFloat(value);
    return value;
}



export let game;

/**
 * Initializes a new game
 */
export function initializeNewGame() {
    game = new Game();
    game.loop();
}

/*  --------------------------  */

initializeNewGame();
allEventListeners();

/*  --------------------------  */

/**
 * 
 * @param {HTMLAudioElement} elementId 
 * Plays a sound
 */
export function playSound(elementId) {
    const soundElement = document.getElementById(elementId);
    soundElement.currentTime = 0;
    soundElement.play().catch(err => {
        console.log(err);
    });
}

/**
 * 
 * @param {number} ms 
 * @returns a promise that takes [ms] milliseconds to finish
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Put all event listeners in one place.
 */
function allEventListeners() {

    //handles changing the snake's direction
    document.addEventListener('keydown', e => {
        const direction = e.key;
        game.snake.changeDirection(direction);
    });

    //restart button -> restarts the game
    const restartBtn = document.querySelectorAll('.restart');
    restartBtn.forEach(restartBtn => {
        restartBtn.addEventListener('click', () => {
            game.restart();
        });
    });

    //pause button -> pauses the game.
    const pauseBtn = document.querySelector('.pause');
    pauseBtn.addEventListener('click', () => {
        if (game.over) return;
        game.pause();
    });

    //play/resume button -> resumes the game.
    const resumeBtn = document.querySelector('.play');
    resumeBtn.addEventListener('click', () => {
        if (game.over) return;
        game.resume();
    });


    //Phone controls -> on click changes the direction of the snake.
    const controls = document.querySelectorAll('.controls i');
    controls.forEach(arrow => {
        arrow.addEventListener('click', () => {
            game.snake.changeDirection(arrow.getAttribute('value'));
        });
    })
}
