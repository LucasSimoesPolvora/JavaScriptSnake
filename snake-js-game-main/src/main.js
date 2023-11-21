import '../css/style.css';
import '../src/snake.js'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const NBR_BOX_HEIGHT = 8;
const NBR_BOX_WIDTH = 8;
const SNAKE_WIDTH = 50;
const SNAKE_HEIGHT = 50;
const PLAY_TABLE_HEIGHT = 800;
const PLAY_TABLE_WIDTH = 800;

const gameOver = document.querySelector(".GameOver")

let snakePar

let coordX = 300;
let coordY = 300;

let goRight = false;
let goLeft = false;
let goUp = false;
let goDown = false;

let isSnakeAlive = true

const move = () => {
  if(!isSnakeAlive){
    gameOver.textContent = "GameOver";
    return;
  }
  

  // Dessine la grille de jeu
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, PLAY_TABLE_WIDTH, PLAY_TABLE_HEIGHT);
  readInput();

  
  ctx.fillStyle = 'blue';
  ctx.fillRect(coordX, coordY, SNAKE_WIDTH, SNAKE_HEIGHT)

  snakeMovement();

  // Rafraichit à chaque seconde
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 100);

  isSnakeStillAlive();

  
};

requestAnimationFrame(move);

function snakeMovement() {
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
}

function readInput() {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37 && !goRight) {
      goLeft = true;
      goDown = false;
      goUp = false;
      goRight = false;
    }
    else if (event.keyCode == 38 && !goDown) {
      goUp = true;
      goDown = false;
      goLeft = false;
      goRight = false;
    }
    else if (event.keyCode == 39 && !goLeft) {
      goRight = true;
      goLeft = false;
      goDown = false;
      goUp = false;
    }
    else if (event.keyCode == 40 && !goUp) {
      goDown = true;
      goUp = false;
      goLeft = false;
      goRight = false;
    }

  }, false)
}

function isSnakeStillAlive(){
  if(coordX >= PLAY_TABLE_WIDTH){
    isSnakeAlive = false
  }

  else if(coordX < 0){
    isSnakeAlive = false
  }

  else if(coordY < 0){
    isSnakeAlive = false
  }

  else if (coordY >= PLAY_TABLE_HEIGHT){
    isSnakeAlive = false
  }
}