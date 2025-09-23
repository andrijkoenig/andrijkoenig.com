let renderer: Renderer;
let camera: Camera;
let teapot: Teapot;
let windowWidth: number;
let windowHeight: number;
let lastTime = 0;


let rowCubes: number = 1;
let columnCubes: number = 1;

document.addEventListener('DOMContentLoaded', () => {

  setUpEventHandlers();

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2d context!");
    return;
  }
  renderer = new Renderer(ctx);
  camera = new Camera(0,0,0);

  teapot = new Teapot(4);
  cube1 = new Cube(0,0,0);

  requestAnimationFrame(render);
});

let cube1: Cube;

function render(currentTime: number) {
  camera.moveCamera();
  renderer.clear(windowWidth, windowHeight);

  if (lastTime === 0) lastTime = currentTime;
  // const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;


  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  // DRAW Cube center
  cube1.drawAt(windowWidth / 2, windowHeight/2);

  //DRAW TEAPOT
  teapot.drawAt(centerX, centerY);


  requestAnimationFrame(render);
}


function getGridCenterPoints(rowItems: number, columnItems:number): ProjectedCoordinates[] {
  let rowStep = windowHeight / (rowItems + 1);
  let columnStep = windowWidth / (columnItems + 1);

  let resultArray: ProjectedCoordinates[] = [];

  for (let rowIndex = 1; rowIndex <= rowItems; rowIndex++) {
   for (let columnIndex = 1; columnIndex <= columnItems; columnIndex++) {
      resultArray.push(new ProjectedCoordinates(columnStep * columnIndex, rowStep* rowIndex));
   } 
  } 
  return resultArray;
}

