import '../css/style.css';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const NBR_BOX_HEIGHT = 8;
const NBR_BOX_WIDTH = 8;
const SNAKE_WIDTH = 50;
const SNAKE_HEIGHT = 50;
const PLAY_TABLE_HEIGHT = 800;
const PLAY_TABLE_WIDTH = 800;

const gameOver = document.querySelector(".GameOver")

let coordX = 0;
let coordY = 0;

let goRight = false;
let goLeft = false;
let goUp = false;
let goDown = false;

let isSnakeAlive = true



const move = () => {

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


  if(!isSnakeAlive){
    gameOver.textContent = "GameOver"
  }
};

requestAnimationFrame(move);

function snakeMovement() {
  if (goUp && coordY > 10) {
    coordY -= SNAKE_HEIGHT;
  }
  else if (goDown && coordY + SNAKE_HEIGHT < PLAY_TABLE_HEIGHT - 10) {
    coordY += SNAKE_HEIGHT;
  }
  else if (goRight && coordX + SNAKE_WIDTH < PLAY_TABLE_WIDTH - 10) {
    coordX += SNAKE_WIDTH
  }
  else if (goLeft && coordX > 0) {
    coordX -= SNAKE_WIDTH;
  }
}

function readInput() {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
      goLeft = true;
      goDown = false;
      goUp = false;
      goRight = false;
    }
    else if (event.keyCode == 38) {
      goUp = true;
      goDown = false;
      goLeft = false;
      goRight = false;
    }
    else if (event.keyCode == 39) {
      goRight = true;
      goLeft = false;
      goDown = false;
      goUp = false;
    }
    else if (event.keyCode == 40) {
      goDown = true;
      goUp = false;
      goLeft = false;
      goRight = false;
    }

  }, false)
}