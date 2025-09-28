let renderer: Renderer;

let windowWidth: number;
let windowHeight: number;
let lastTime = 0;

let possibleRenderItems: (() => Shape)[] = [
  () => new Cube(100, 100, 100),
  () => new Tetrahedron(0, 0, 0, 100),
  () => new Pyramid(0, 0, 0, 100, 120),
];

let drawArray: Array<DrawItem>;
let rotationXScale = 0.005;
let rotationYScale = 0.005;

class DrawItem {
  angle: number;

  rotationYAngle: number;
  rotationXAngle: number;
  constructor(
    public shape: Shape,
    public screenPosition: ProjectedCoordinates
  ) {
    this.angle = 0;

    this.rotationXAngle = 0;
    this.rotationYAngle = 0;
  }

  calculateNewAngles() {
    this.rotationXAngle += rotationXScale;
    this.rotationYAngle += rotationYScale;
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

   const scale = 0.01 * deltaTime;
    if (Key.A) rotationXScale -= scale;
    if (Key.D) rotationXScale += scale;
    if (Key.W) rotationYScale -= scale;
    if (Key.S) rotationYScale += scale;

  drawArray.forEach((element: DrawItem) => {
    element.calculateNewAngles();
    element.shape.drawAt(element);
  });
  requestAnimationFrame(render);
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

  let padding = 750;
  let itemPadding = 250;

  for (
    let rowIndex = -padding;
    rowIndex <= windowHeight + padding;
    rowIndex += itemPadding
  ) {
    for (
      let columnIndex = -padding;
      columnIndex <= windowWidth + padding;
      columnIndex += itemPadding
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
