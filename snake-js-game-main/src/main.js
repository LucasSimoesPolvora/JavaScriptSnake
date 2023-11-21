import '../css/style.css';
import {snakeClass} from './snake';

// Reprend le canvas présent dans l'html
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Constantes sur de certaines informations sur le jeux
const SNAKE_WIDTH = 50;
const SNAKE_HEIGHT = 50;
const PLAY_TABLE_HEIGHT = 800;
const PLAY_TABLE_WIDTH = 800;
const SNAKE_COLOR = 'blue';

// Constante qui reprend la balise <p> dans l'html avec la classe .GameOver
const gameOver = document.querySelector(".GameOver");

// Variables pour les coordonnées
let coordX = 100;
let coordY = 300;

// Variables bool pour le mouvemement
let goRight = false;
let goLeft = false;
let goUp = false;
let goDown = false;
let didAMovement = false;

// Variable qui dit si le serpent est mort
let isSnakeAlive = true

// Tableau des valeurs des carrés qui représentent le snake
let partOfTheSnake = [{
        x : coordX,
        y : coordY,
        w : SNAKE_WIDTH,
        h : SNAKE_HEIGHT
      },
      {
        x : coordX + SNAKE_WIDTH,
        y : coordY,
        w : SNAKE_WIDTH,
        h : SNAKE_HEIGHT
      },{
        x : coordX + SNAKE_WIDTH * 2,
        y : coordY,
        w : SNAKE_WIDTH,
        h : SNAKE_HEIGHT
       }];

const move = () => {
  isSnakeStillAlive();
  if(!isSnakeAlive){
    gameOver.textContent = "GameOver";
    return;
  }
  

  // Dessine la grille de jeu
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, PLAY_TABLE_WIDTH, PLAY_TABLE_HEIGHT);
  readInput();

  
  ctx.fillStyle = 'blue';
  // Il marche
  //ctx.fillRect(coordX, coordY, SNAKE_WIDTH, SNAKE_HEIGHT)
  ctx.fillRect(partOfTheSnake[0].x, partOfTheSnake[0].y, SNAKE_WIDTH, SNAKE_HEIGHT);
  console.log(partOfTheSnake[0].x);

  // il ne marche pas
  // ctx.fillstyle = 'blue';
  // for(let i = 0; i < partOfTheSnake.length; i++){
  //   ctx.fillRect(partOfTheSnake[i].x, partOfTheSnake[i].y, SNAKE_WIDTH, SNAKE_HEIGHT)
  // }

  draw();
  Movement();

  // Rafraichit à chaque seconde
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 100);


};

requestAnimationFrame(move);

function draw(){
  ctx.fillstyle = SNAKE_COLOR;
  for(let i = 0; i < partOfTheSnake.length; i++){
    ctx.fillRect(partOfTheSnake[i].x, partOfTheSnake[i].y, SNAKE_WIDTH, SNAKE_HEIGHT)
  }
}

function Movement() {
  
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
  if(didAMovement){
    partOfTheSnake.pop();
    partOfTheSnake.unshift({
      x : coordX,
      y : coordY,
      w : SNAKE_WIDTH,
      h : SNAKE_HEIGHT
    });
  }
}

function readInput() {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37 && !goRight && didAMovement) {
      goLeft = true;
      goDown = false;
      goUp = false;
      goRight = false;
      didAMovement = true;
    }
    else if (event.keyCode == 38 && !goDown && didAMovement) {
      goUp = true;
      goDown = false;
      goLeft = false;
      goRight = false;
      didAMovement = true;
    }
    else if (event.keyCode == 39 && !goLeft) {
      goRight = true;
      goLeft = false;
      goDown = false;
      goUp = false;
      didAMovement = true;
    }
    else if (event.keyCode == 40 && !goUp && didAMovement) {
      goDown = true;
      goUp = false;
      goLeft = false;
      goRight = false;
      didAMovement = true;
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