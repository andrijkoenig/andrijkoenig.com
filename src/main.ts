let renderer: Renderer;
let camera: Camera;

let windowWidth: number;
let windowHeight: number;
let lastTime = 0;

let possibleRenderItems: (() => Shape)[] = [
  () => new Cube(100, 100, 100),
  () => new Tetrahedron(0, 0, 0, 100),
  () => new Pyramid(0, 0, 0, 100, 120),
  // () => new Octahedron(0, 0, 0, 80),
  // () => new Prism(0, 0, 0),
  // () => new Sphere(0, 0, 0, 80, 12, 12),
];

let drawArray: Array<DrawItem>;

class DrawItem {
  angle: number;

  rotationYScale: number;
  rotationXScale: number;

  rotationYAngle: number;
  rotationXAngle: number;
  constructor(
    public shape: Shape,
    public screenPosition: ProjectedCoordinates
  ) {
    this.angle = 0;
    this.rotationXScale = Math.random();
    this.rotationYScale = Math.random();

    this.rotationXAngle =0 ;
    this.rotationYAngle =0 ;
  }

  calculateNewAngles(deltaTime : number){
    this.rotationXAngle+= this.rotationXScale *deltaTime;
    this.rotationYAngle+= this.rotationYScale *deltaTime;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeGlobalVariables();
  requestAnimationFrame(render);
});

function render(currentTime: number) {
  renderer.clear(windowWidth, windowHeight);

  if (lastTime === 0) lastTime = currentTime;
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  drawArray = moveInCircle(
    drawArray,
    deltaTime,
    5,
    2
  );

  camera.moveCamera();

  drawArray.forEach((element: DrawItem) =>
  {
    element.calculateNewAngles(deltaTime);
    element.shape.drawAt(element);
  }
  );
  requestAnimationFrame(render);
}

function moveInCircle(
  drawArray: Array<DrawItem>,
  deltaTime: number,
  revolutionTime: number,
  radius: number,
): Array<DrawItem> {
  const angularVelocity = (2 * Math.PI) / revolutionTime;

  drawArray.forEach((item) => {
    // Update angle
    item.angle += angularVelocity * deltaTime;
    if (item.angle > Math.PI * 2) item.angle -= Math.PI * 2;

    // Update position
    item.screenPosition.x = item.screenPosition.x + Math.cos(item.angle) * radius;
    item.screenPosition.y = item.screenPosition.y + Math.sin(item.angle) * radius;
  });

  return drawArray;
}
function initializeDrawArray(): Array<DrawItem> {
  return calculateDrawingPositions().map((x, index) => {
    const wrappedIndex = index % possibleRenderItems.length;
    let item = possibleRenderItems[wrappedIndex]!();
    return new DrawItem(item, x);
  });
}

// TODO refactor for better algo and maybe sclae the drawAt with screensize
// TODO MAKE PADDING 5 % of screen and the shape height also percentage points
//      recalculate the percentage points every resize then the teleport should work
function calculateDrawingPositions(): ProjectedCoordinates[] {
  let resultArray: ProjectedCoordinates[] = [];

  let padding = 250;

  for (
    let rowIndex = -250;
    rowIndex <= windowHeight + 250;
    rowIndex += padding
  ) {
    for (
      let columnIndex = -250;
      columnIndex <= windowWidth + 250;
      columnIndex += padding
    ) {
      resultArray.push(new ProjectedCoordinates(columnIndex, rowIndex));
    }
  }
  return resultArray;
}

function initializeGlobalVariables() {
  setUpKeyboardListener();

  let canvas = initializeCanvas();
  if (!canvas) return;

  let context = initialize2dDrawingContext(canvas);
  if (!context) return;
  renderer = new Renderer(context);
  camera = new Camera();

  drawArray = initializeDrawArray();
}

function initialize2dDrawingContext(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2d context!");
    return null;
  }

  return ctx;
}

function initializeCanvas(): HTMLCanvasElement | null {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    console.error("Canvas element not found!");
    return null;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  return canvas;
}

function getRandomShape(): Shape {
  const idx = Math.floor(Math.random() * possibleRenderItems.length);
  return possibleRenderItems[idx]!();
}
