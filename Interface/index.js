const SCREEN_SIE = 600;

// Configuración básica del escenario y la capa
const stage = new Konva.Stage({
  container: 'container', // Div donde se cargará el lienzo
  width: SCREEN_SIE,
  height: SCREEN_SIE,
});

const layer = new Konva.Layer();
stage.add(layer);

// Tamaño de la cuadrícula
const direction_status = {
  right: 0,
  down: 1,
  left: 2, 
  up: 3,
};
const direction_backward_change = {
  0: 2,
  1: 3,
  2: 0,
  1: 3,
};
let current_status = direction_status.right;
let isFinishGame = false;
const GRID_SIZE = 100; // Tamaño de cada celda (en píxeles)
const GRID_ROWS = stage.height() / GRID_SIZE;
const GRID_COLS = stage.width() / GRID_SIZE;
const gridSize = GRID_COLS;
let playerPosition = { x: 0, y: 0 };
let timetou;

// Agregar un rectángulo para representar al personaje
let player = new Konva.Image({
  x: GRID_SIZE / 2,  // Establece la posición inicial
  y: GRID_SIZE / 2,  // Establece la posición inicial
  width: GRID_SIZE / 2, // Tamaño de la imagen
  height: GRID_SIZE / 2, // Tamaño de la imagen
});

function playAnotherSound(sound) {
   
    if (!sound) {
      const anotherAudio = new Audio('Game_Over.wav');
      anotherAudio.play().then(() => {
          console.log('Otro sonido reproducido correctamente');
      }).catch(err => {
          console.error('Error al reproducir el otro sonido:', err);
      });
    }else{
      const anotherAudio = new Audio('Game_Won.wav');
      anotherAudio.play().then(() => {
          console.log('Otro sonido reproducido correctamente');
      }).catch(err => {
          console.error('Error al reproducir el otro sonido:', err);
      });    
    }
}

function getRandomValueGrid() {
  return Math.floor(Math.random() * 6); // Genera un número entre 0 y 5
}

function getRandomNumber(min) {
  if (min >= 5) {
      console.error("El parámetro debe ser menor a 5");
      return null;
  }
  const max = 5; 
  const randomNumber = Math.floor(Math.random() * (max - min)) + min + 1;
  return randomNumber;
}

function getRandomNumberInRange(min, max) {
  // Asegurarnos de que min sea menor que max
  if (min >= max) {
      console.error("El valor de 'min' debe ser menor que el valor de 'max'");
      return null;
  }

  // Generar un número aleatorio entre min (incluido) y max (excluido)
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
}

const ramdonX = getRandomNumber(2);
const ramdonY = getRandomNumber(3);
const obstacleCamdonX = getRandomNumber(1);
const obstacleCamdonY = getRandomNumber(1);
const obstacleCamdonX1 = getRandomNumber(1);
const obstacleCamdonY1 = getRandomNumber(1);
const META_COLOR = "#6aa95f";
const OBSTACLE_COLOR = "#b7d3e6";
const x_history = { 0: 0 };
const y_history = { 0: 0 };

console.log('dssdf', x_history);
console.log('y_history', y_history);

// Agregar un rectángulo para representar al personaje
let meta = new Konva.Image({
  x: (ramdonX * GRID_SIZE),  // Establece la posición inicial
  y: (ramdonY * GRID_SIZE),  // Establece la posición inicial
  // x: 2 * GRID_SIZE,
  // y: 0 * GRID_SIZE,
  width: GRID_SIZE, // Tamaño de la imagen
  height: GRID_SIZE, // Tamaño de la imagen
  fill: META_COLOR,
  // obstaculos fill: "#",
  cornerRadius: 5,
  opacity: 0.7
});

Object.assign(x_history, { [ramdonX]: ramdonX });
Object.assign(y_history, { [ramdonY]: ramdonY });

let obstacle1 = new Konva.Image({
  x: (typeof x_history[obstacleCamdonX] !== 'number' ? (obstacleCamdonX) : (getRandomNumber(1))) * GRID_SIZE,  // Establece la posición inicial
  y: (typeof y_history[obstacleCamdonY] !== 'number' ? (obstacleCamdonY) : (getRandomNumber(1))) * GRID_SIZE,  // Establece la posición inicial 
  // x: 2 * GRID_SIZE,
  // y: 0 * GRID_SIZE,
  width: GRID_SIZE, // Tamaño de la imagen
  height: GRID_SIZE, // Tamaño de la imagen
  fill: OBSTACLE_COLOR,
  cornerRadius: 5,
  opacity: 0.7
});

Object.assign(x_history, { [obstacleCamdonX]: obstacleCamdonX });
Object.assign(y_history, { [obstacleCamdonY]: obstacleCamdonY });

let obstacle2 = new Konva.Image({
  x: (typeof x_history[obstacleCamdonX1] !== 'number' ? (obstacleCamdonX1) : (getRandomNumber(1))) * GRID_SIZE,  // Establece la posición inicial
  y: (typeof y_history[obstacleCamdonY1] !== 'number' ? (obstacleCamdonY1) : (getRandomNumber(1))) * GRID_SIZE,  // Establece la posición inicial 
  // x: 2 * GRID_SIZE,
  // y: 0 * GRID_SIZE,
  width: GRID_SIZE, // Tamaño de la imagen
  height: GRID_SIZE, // Tamaño de la imagen
  fill: OBSTACLE_COLOR,
  cornerRadius: 5,
  opacity: 0.7
});

Object.assign(x_history, { [obstacleCamdonX1]: obstacleCamdonX1 });
Object.assign(y_history, { [obstacleCamdonY1]: obstacleCamdonY1 });

player.offset({
  x: player.width() / 2, // 0 píxeles desde el borde izquierdo
  y: player.height() / 2, // 0 píxeles desde el borde superior
});

layer.add(obstacle1);
layer.add(obstacle2);
layer.add(meta);
layer.add(player);

function imagePath (_direction) {
  return `./bot/${_direction}.png`;
}

// Funciones de dibujo de la cuadrícula
function drawGrid() {
  // Dibujar las líneas horizontales
  for (let i = 0; i <= GRID_ROWS; i++) {
 
    const line = new Konva.Line({
      points: [0, i * GRID_SIZE, stage.width(), i * GRID_SIZE],
      stroke: '#ddd',
      strokeWidth: 1,
    });
    layer.add(line);
  }

  // Dibujar las líneas verticales
  for (let i = 0; i <= GRID_COLS; i++) {
    const line = new Konva.Line({
      points: [i * GRID_SIZE, 0, i * GRID_SIZE, stage.height()],
      stroke: '#ddd',
      strokeWidth: 1,
    });
    layer.add(line);
  }
}

// Validación de límites para el jugador
function gridPlayerOutLimit() {
  if (playerPosition.x > 5 || playerPosition.x < 0 || playerPosition.y > 5 || playerPosition.y < 0) {
    console.log('El jugador está fuera de los límites');
    return true;
  }
  return false;
}

// Funciones de movimiento
function moveRight() {
  if (playerPosition.x < 5) { // Solo mueve a la derecha si no está en el límite
    playerPosition.x += 1;
    player.x(player.x() + GRID_SIZE);
    layer.batchDraw();
  } else {
    showError('Error: El jugador intenta salir de la grid al avanzar.');
    console.log('No se puede mover más a la derecha');
  }
}

function moveLeft() {
  if (playerPosition.x > 0) { // Solo mueve a la izquierda si no está en el límite
    playerPosition.x -= 1;
    player.x(player.x() - GRID_SIZE);
    layer.batchDraw();
  } else {
    console.log('No se puede mover más a la izquierda');
    showError('Error: El jugador intenta salir de la grid al avanzar.');
  }
}

function moveUp() {
  if (playerPosition.y > 0) { // Solo mueve hacia arriba si no está en el límite superior
    playerPosition.y -= 1;
    player.y(player.y() - GRID_SIZE);
    layer.batchDraw();
  } else {
    console.log('No se puede mover más arriba');
    showError('Error: El jugador intenta salir de la grid al avanzar.');
  }
}

function moveDown() {
  if (playerPosition.y < 5) { // Solo mueve hacia abajo si no está en el límite inferior
    playerPosition.y += 1;
    player.y(player.y() + GRID_SIZE);
    layer.batchDraw();
  } else {
    console.log('No se puede mover más abajo');
    showError('Error: El jugador intenta salir de la grid al avanzar.');
  }
}


// Función para mover el jugador según la dirección
function move() {

  switch (current_status) {
    case direction_status.right: moveRight(); break;
    case direction_status.left: moveLeft(); break;
    case direction_status.up: moveUp(); break;
    case direction_status.down: moveDown(); break;
  }
}

function moveForward(){
  move();
  if(player.x() === (obstacle1.x() + 50) && player.y() ===( obstacle1.y() + 50)){
    obstacle1.fill("#cc0000");
    isFinishGame = true;
    showErrorAlert(true);
    playAnotherSound(0);
  }
  if(player.x() === (obstacle2.x() + 50) && player.y() ===( obstacle2.y() + 50)){
    obstacle2.fill("#cc0000");
    isFinishGame = true;
    showErrorAlert(true);
    playAnotherSound(0);
  }
}

function moveBackward(){
  current_status = direction_backward_change[current_status];
  updatePlayerAsset();
  move();
  if(player.x() === (obstacle1.x() + 50) && player.y() ===( obstacle1.y() + 50)){
    obstacle1.fill("red");
    isFinishGame = true;
    showErrorAlert(true);
  }
  if(player.x() === (obstacle2.x() + 50) && player.y() ===( obstacle2.y() + 50)){
    obstacle2.fill("red");
    isFinishGame = true;
    showErrorAlert(true);
  }
}

function updatePlayerAsset (){
  if(current_status === direction_status.down){
    return loadPlayerImage(imagePath('down'));
  }
  if(current_status === direction_status.left){
    return loadPlayerImage(imagePath('left'));
  }
  if(current_status === direction_status.up){
    return loadPlayerImage(imagePath('up'));
  }
  return loadPlayerImage(imagePath('right'));
}

// Función para rotar el jugador
function rotateLeft() {
  current_status = (current_status === direction_status.right) ? direction_status.up : current_status - 1;
  updatePlayerAsset();
}

function rotateRight() {
  current_status = (current_status === direction_status.up) ? direction_status.right : current_status + 1;
  updatePlayerAsset();
}

// Función para cargar la imagen del jugador
function loadPlayerImage(imagePath) {
  const imageObj = new Image();
  imageObj.onload = function () {
    player.image(imageObj);
    layer.batchDraw();
  };
  imageObj.src = imagePath;
}

function placeObstacleAtOrigin() {
  obstacle1.x((getRandomNumberInRange(2, 6) * GRID_SIZE));
  obstacle1.y((getRandomNumberInRange(0, 1) * GRID_SIZE));
  obstacle2.x((getRandomNumberInRange(0, 3) * GRID_SIZE));
  obstacle2.y((getRandomNumberInRange(4, 6) * GRID_SIZE));
  // Redibujar la capa para reflejar los cambios
  obstacle1.fill(OBSTACLE_COLOR);
  obstacle2.fill(OBSTACLE_COLOR);
  showErrorAlert(false);
  layer.batchDraw();
}

function placeMetaAtOrigin() {
  meta.x((getRandomNumberInRange(3, 6) * GRID_SIZE));
  meta.y((getRandomNumberInRange(4, 6) * GRID_SIZE));
  // Redibujar la capa para reflejar los cambios
  layer.batchDraw();
}

function placePlayerAtOrigin() {
  // Actualizar la posición lógica del jugador
  playerPosition = { x: 0, y: 0 };
  current_status = direction_status.right;
  // Actualizar la posición gráfica del jugador
  player.x(GRID_SIZE / 2);
  player.y(GRID_SIZE / 2);

  // Redibujar la capa para reflejar los cambios
  layer.batchDraw();

  console.log('Jugador colocado en la casilla (0, 0)');
}

function showSuccessAlert(show) { document.getElementById('succes_alert').style.display = show ? 'block' : 'none'; };
function showErrorAlert(show) { document.getElementById('error_alert').style.display = show ? 'block' : 'none'; };
showSuccessAlert(false);
showErrorAlert(false);

function resetGame() {
  isFinishGame = true;
  clearTimeout(timetou);
  // Restablecer posición inicial
  meta.fill(META_COLOR);
  playerPosition = { x: 0, y: 0 };
  playerDirection = 'UP';

  // Restablecer la imagen inicial
  loadPlayerImage(imagePath('right'));
  // Actualizar la posición gráfica
  placePlayerAtOrigin();
  placeMetaAtOrigin();
  placeObstacleAtOrigin();
  console.log('El juego se ha reiniciado.');
  showSuccessAlert(false);
}
function retrytGame() {
  
  isFinishGame = true;
  clearTimeout(timetou);
  // Restablecer posición inicial
  meta.fill(META_COLOR);
  playerPosition = { x: 0, y: 0 };
  playerDirection = 'UP';

  // Restablecer la imagen inicial
  loadPlayerImage(imagePath('right'));
  // Actualizar la posición gráfica
  placePlayerAtOrigin();

  console.log('El juego se ha reiniciado.');
  showSuccessAlert(false);
}

// Función para mostrar un mensaje de error
function showError(message) {
  alert(message);
  resetGame();
}

// Función para ejecutar una instrucción con un retraso de 1 segundo
function executeInstruction(instruction) {
  return new Promise(resolve => {
    timetou = setTimeout(() => {
      switch (instruction) {
        case 'AVANZAR': moveForward(); break;
        case 'RETROCEDER':  moveBackward(); break;
        case 'GIRAR_IZQ': rotateLeft(); break;
        case 'GIRAR_DER': rotateRight(); break;
        case 'ENCENDER_LED': checkGameIsFinish(); break;
        // case 'APAGAR_LED': turnOffLED(); break;
        default: console.log(`Instrucción desconocida: ${instruction}`);
      }
      resolve();
    }, 1000);
  });
}


function checkGameIsFinish(){
  if(player.x() === (meta.x() + 50) && player.y() ===( meta.y() + 50)){
    meta.fill("#ffd15b");
    playAnotherSound(1);
    showSuccessAlert(true);
  }
}

// Función para procesar instrucciones
async function processInstructions(instructions) {
  for (let instruction of instructions) {
    if(isFinishGame){
      break;
    }
    await executeInstruction(instruction);
  }
}

// Función para cargar instrucciones desde un archivo
function loadInstructionsFromFile(file) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const instructions = event.target.result.split('\n').map(instruction => instruction.trim()).filter(Boolean);
    isFinishGame = false;
    processInstructions(instructions);
  };
  reader.readAsText(file);
}

// Event Listener para cargar instrucciones desde un archivo
document.getElementById('loadInstructionsButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length > 0) {
    loadInstructionsFromFile(fileInput.files[0]);
  } else {
    alert('Por favor, selecciona un archivo');
  }
});

// Configurar el evento de teclas presionadas
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    moveUp();
  } else if (event.key === 'ArrowDown') {
    moveDown();
  } else if (event.key === 'ArrowLeft') {
    moveLeft();
  } else if (event.key === 'ArrowRight') {
    moveRight();
  } else if (event.key?.toLowerCase() === 'r') {
    rotateRight();
  } else if (event.key === 'l') {
    rotateLeft();
  } else if (event.key === 'f'){
    moveForward();
  } else if (event.key === 'b'){
    moveBackward();
  }
  layer.batchDraw();
  //console.log('sdfdsf', playerPosition);
});

// Iniciars
drawGrid();
loadPlayerImage(imagePath('right'));
layer.draw();
