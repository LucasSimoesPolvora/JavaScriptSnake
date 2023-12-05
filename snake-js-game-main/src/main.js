import '../css/style.css';

// Reprend le canvas présent dans l'html
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Constantes sur de certaines informations sur le jeux
const SQUARE_WIDTH = 16;
const SQUARE_HEIGHT = 16;
const PLAY_TABLE_WIDTH = canvas.width
const PLAY_TABLE_HEIGHT = canvas.height
const SNAKE_WIDTH = PLAY_TABLE_WIDTH / SQUARE_WIDTH;
const SNAKE_HEIGHT = PLAY_TABLE_HEIGHT / SQUARE_HEIGHT;
const APPLE_WIDTH = SNAKE_WIDTH;
const APPLE_HEIGHT = SNAKE_HEIGHT;

// Constantes sur les couleurs des objets
const SNAKE_COLOR = 'blue';
const APPLE_COLOR = 'red';
const TABLE_COLOR= 'black';

// Constante qui reprend la balise <p> dans l'html avec la classe .GameOver
const gameOver = document.querySelector(".GameOver");
const score = document.querySelector(".Score")

// Variables pour les coordonnées
// Snake
let coordX = 100;
let coordY = 300;

// Apple
let appleX = 0;
let appleY = 0;

// Variables bool pour le mouvemement
let goRight = false;
let goLeft = false;
let goUp = false;
let goDown = false;
let didAMovement = false;

let compteur = 0;

// Variable qui dit si le serpent est mort
let isSnakeAlive = true;

// Variable pour savoir si une pomme est présente dans le programme
let isAppleAlive = false;

let scoreValue = 0;

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

function move() {
  // Fait tous les events du jeu
  events();

  // Si le serpent est mort on affiche le gameover
  if (!isSnakeAlive) {
    gameOver.textContent = "GameOver";
    return;
  }

  score.textContent="Score : " + scoreValue

  // Dessine la grille de jeu
  ctx.fillStyle = TABLE_COLOR;
  ctx.fillRect(0, 0, PLAY_TABLE_WIDTH, PLAY_TABLE_HEIGHT);

  // Reads the input from the user
  readInput();

  // Makes the apple spawn
  appleSpawn();

  // Draws and updates the snake movement
  drawSnake();

  // Rafraichit à chaque 100ms
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 100);
}

requestAnimationFrame(move);

// Dessine et bouge le snake
function drawSnake(){

  // Affiche la tête du serpent
  ctx.fillStyle = SNAKE_COLOR;
  ctx.fillRect(partOfTheSnake[0].x, partOfTheSnake[0].y, SNAKE_WIDTH, SNAKE_HEIGHT);

  // Affiche le corps du serpent
  ctx.fillstyle = SNAKE_COLOR;
  for(let i = 0; i < partOfTheSnake.length; i++){
    ctx.fillRect(partOfTheSnake[i].x, partOfTheSnake[i].y, SNAKE_WIDTH, SNAKE_HEIGHT)
  }

  // Fait le mouvement du snake en fonction de l'input de l'utilisateur
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

  // Si le serpent fait un mouvement on enlève la queue et ensuite on replace une tête à l'avant
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

function events(){
  // Event that allows to know if the snake is dead
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
   
  if (partOfTheSnake.some((segment, index) => index !== 0 && segment.x === partOfTheSnake[0].x && segment.y === partOfTheSnake[0].y)) {
    compteur++;
    if (compteur !== 1) {
        isSnakeAlive = false;
    }
}

  // Event that allows the snake to eat the apple
  if(appleX == coordX && appleY == coordY){
    partOfTheSnake.unshift({
      x : coordX,
      y : coordY,
      w : SNAKE_WIDTH,
      h : SNAKE_HEIGHT
    });
    isAppleAlive = false;
    scoreValue++;
  }
  
}

function appleSpawn(){
  if(!isAppleAlive){
    appleX = Math.floor(Math.random() * SQUARE_WIDTH);
    appleY = Math.floor(Math.random() * SQUARE_HEIGHT);
    // Si elle spawn dans le serpent on refait
    for(let i = 1; i < partOfTheSnake.length; i++){
      if(appleX === partOfTheSnake[i].x && appleY === partOfTheSnake[i].y){
         appleSpawn();
      }
    }
    isAppleAlive = true;
    appleX = appleX*SNAKE_WIDTH
    appleY = appleY*SNAKE_HEIGHT
  }  

  // Affiche la pomme
  ctx.fillStyle = "red"
  ctx.fillRect(appleX,appleY,SNAKE_WIDTH,SNAKE_HEIGHT)
}