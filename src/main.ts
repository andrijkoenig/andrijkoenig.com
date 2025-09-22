let context: CanvasRenderingContext2D;
let windowWidth: number;
let windowHeight: number;
const FOV: number = 10;
let lastTime:any = 0;
let rotationNumber: number = 0;


document.addEventListener('DOMContentLoaded', () => {
 const canvas = document.getElementById('canvas');
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error("canvas element not found or is not a canvas!");
    return;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("could not get 2d context!");
    return;
  }
  context = ctx;

  let rotation = 0;
  render(rotation);
});

function render(currentTime: any) {
  context.clearRect(0, 0, windowWidth, windowHeight);
  
  // Calculate delta time for smooth animation
  if (lastTime === 0) lastTime = currentTime;
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  renderSpinningCube(deltaTime);

  requestAnimationFrame(render);
}


function renderSpinningCube(deltaTime: number){
  
  rotationNumber += 0.5 * deltaTime;

  let rotation = rotationNumber; 

  const centerX = windowWidth /2;
  const centerY = windowHeight/2;

  cubeEdges.forEach(element => {

    let point1 = cubeVertices[element.start]!.rotate(rotation).projection(centerX, centerY);
    let point2 = cubeVertices[element.end]!.rotate(rotation).projection(centerX, centerY);

    drawLine(point1, point2);
    drawPoint(point1);
    drawPoint(point2);
  });
}


function drawLine(point1: projectedCoordinates, point2: projectedCoordinates) {
  context.beginPath();
  context.moveTo(point1.x, point1.y);
  context.lineTo(point2.x, point2.y);
  context.stroke();
}

function drawPoint(point: projectedCoordinates) {
  context.beginPath();
  context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
  context.fill();
}
