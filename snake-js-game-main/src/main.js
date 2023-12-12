import '../css/style.css';

// Uses the canva 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Consts about some of the game information
const SQUARE_WIDTH = 16;              // Only works with 8, 16, 32
const SQUARE_HEIGHT = 16;             // Only works with 8, 16, 32
const PLAY_TABLE_WIDTH = canvas.width
const PLAY_TABLE_HEIGHT = canvas.height
const SNAKE_WIDTH = PLAY_TABLE_WIDTH / SQUARE_WIDTH;
const SNAKE_HEIGHT = PLAY_TABLE_HEIGHT / SQUARE_HEIGHT;
const APPLE_WIDTH = SNAKE_WIDTH;
const APPLE_HEIGHT = SNAKE_HEIGHT;

// Consts about the colors of the game
const SNAKE_COLOR = 'blue';
const APPLE_COLOR = 'red';
const TABLE_COLOR = 'black';

// Consts that take the classes .GameOver and .Score so that we can modify them
const gameOver = document.querySelector(".GameOver");
const score = document.querySelector(".Score")

// Variables for the coordinates
// Snake
let coordX = 100;
let coordY = 300;

// Apple
let appleX = 0;
let appleY = 0;

// Bool variables for the movement
let goRight = false;
let goLeft = false;
let goUp = false;
let goDown = false;
let didAMovement = false;

let compteur = 0;

// Variable that makes the snake alive of dead
let isSnakeAlive = true;

// variable that is used to see if the snake ate the apple or still not
let isAppleAlive = false;

// Will store the score of the player
let scoreValue = 0;

// Array that has the values of the snake
let partOfTheSnake = [{
  x: coordX,
  y: coordY,
  w: SNAKE_WIDTH,
  h: SNAKE_HEIGHT
},
{
  x: coordX + SNAKE_WIDTH,
  y: coordY,
  w: SNAKE_WIDTH,
  h: SNAKE_HEIGHT
}, {
  x: coordX + SNAKE_WIDTH * 2,
  y: coordY,
  w: SNAKE_WIDTH,
  h: SNAKE_HEIGHT
}];

function move() {
  // Makes all the events of the game
  events();

  // If the snake is dead it will show GameOver
  if (!isSnakeAlive) {
    if (scoreValue <= SQUARE_HEIGHT * SQUARE_WIDTH - 3) {
      gameOver.textContent = "GameOver";
    }
    else {
      gameOver.textContent = "You Win !";
    }
    return;
  }

  // Shows the current score
  score.textContent = "Score : " + scoreValue

  // Draws the game board
  ctx.fillStyle = TABLE_COLOR;
  ctx.fillRect(0, 0, PLAY_TABLE_WIDTH, PLAY_TABLE_HEIGHT);

  // Reads the input from the user
  readInput();

  // Makes the apple spawn
  appleSpawn();

  // Draws and updates the snake movement
  drawSnake();

  // Refreshes each 100ms
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 100);
  canMove = true;
}

requestAnimationFrame(move);

// Draws and moves the snake
function drawSnake() {
  // Draws the snake's head
  ctx.fillStyle = SNAKE_COLOR;
  partOfTheSnake.some(v => {
    ctx.fillRect(v.x, v.y, v.w, v.h)
  })

  // Makes the movement according to the input 
  if (goUp && coordY > - 10) {
    coordY -= SNAKE_HEIGHT;
  }
  else if (goDown && coordY + SNAKE_HEIGHT < PLAY_TABLE_HEIGHT + 10) {
    coordY += SNAKE_HEIGHT;
  }
  else if (goRight && coordX + SNAKE_WIDTH < PLAY_TABLE_WIDTH + 10) {
    coordX += SNAKE_WIDTH
  }
  else if (goLeft && coordX > -10) {
    coordX -= SNAKE_WIDTH;
  }

  // If the snake makes a movement, it unshows the last square (tail) and puts it in front (Becomes the head)
  if (didAMovement) {
    partOfTheSnake.pop();
    partOfTheSnake.unshift({
      x: coordX,
      y: coordY,
      w: SNAKE_WIDTH,
      h: SNAKE_HEIGHT
    });
  }
}

// Reads the input of the user
function readInput() {
  // Is used when the key is down
  document.addEventListener('keydown', function (event) {
    // For the left
    if (event.keyCode == 37 && !goRight && didAMovement) {
      goLeft = true;
      goDown = false;
      goUp = false;
      goRight = false;
      didAMovement = true;
    }
    // For the top
    else if (event.keyCode == 38 && !goDown && didAMovement) {
      goUp = true;
      goDown = false;
      goLeft = false;
      goRight = false;
      didAMovement = true;
    }
    // For the right
    else if (event.keyCode == 39 && !goLeft) {
      goRight = true;
      goLeft = false;
      goDown = false;
      goUp = false;
      didAMovement = true;
    }
    // For below
    else if (event.keyCode == 40 && !goUp && didAMovement) {
      goDown = true;
      goUp = false;
      goLeft = false;
      goRight = false;
      didAMovement = true;
    }
  }, false)
}

// Treats the different events that occur in the game (Snake dies, eats apple)
function events() {
  // Events that allows to know if the snake is dead by the borders
  // Right Border
  if (coordX >= PLAY_TABLE_WIDTH) {
    isSnakeAlive = false
  }
  // Left Border
  else if (coordX < 0) {
    isSnakeAlive = false
  }
  // Top Border
  else if (coordY < 0) {
    isSnakeAlive = false
  }
  // Down Border
  else if (coordY >= PLAY_TABLE_HEIGHT) {
    isSnakeAlive = false
  }

  // If the snakes touches himself he dies
  if (partOfTheSnake.some((segment, index) => index !== 0 && segment.x === partOfTheSnake[0].x && segment.y === partOfTheSnake[0].y)) {
    compteur++;
    if (compteur !== 1) {
      isSnakeAlive = false;
    }
  }

  // Event that allows the snake to eat the apple
  if (appleX == coordX && appleY == coordY) {
    partOfTheSnake.unshift({
      x: coordX,
      y: coordY,
      w: SNAKE_WIDTH,
      h: SNAKE_HEIGHT
    });
    isAppleAlive = false;
    scoreValue++;
  }

}

// Makes the apple spawn
function appleSpawn() {
  if (!isAppleAlive) {
    // Makes random numbers for the square that the apple will spawn
    appleX = Math.floor(Math.random() * SQUARE_WIDTH);
    appleY = Math.floor(Math.random() * SQUARE_HEIGHT);

    // Makes the width and the ehight of the apple
    appleX = appleX * APPLE_WIDTH;
    appleY = appleY * APPLE_HEIGHT;

    // If the apple spawns in a square that's already occupied by the snake, we spawn it again
    if (partOfTheSnake.some((segment) => appleX == segment.x && appleY == segment.y)) {
      console.log("a");
      appleSpawn();
    }

    // Resets value
    isAppleAlive = true;
  }
  // Shows the apple
  ctx.fillStyle = APPLE_COLOR
  ctx.fillRect(appleX, appleY, APPLE_WIDTH, APPLE_HEIGHT)
}