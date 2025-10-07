let drawArray: Array<DrawItem>;
let rotationXScale = 0.005;
let rotationYScale = 0.005;

let geometryEventListeners: ((event: KeyboardEvent) => void)[] = [
  (event) => {
     if (event.ctrlKey && event.key.toLowerCase() === "c") {
      ActivateTerminalMode();
    } 
  },
];


function initializeGeometryMode(){
  drawArray = initializeDrawArray();
  geometryEventListeners.forEach((x)=> window.addEventListener("keydown", x));
}

function destructGeometryMode(){
  geometryEventListeners.forEach((x)=> window.removeEventListener("keydown", x));
}


let possibleRenderItems: (() => Shape)[] = [
  () => new Cube(100, 100, 100),
  () => new Tetrahedron(0, 0, 0, 100),
  () => new Pyramid(0, 0, 0, 100, 120),
];

function RenderScreenSaverMode(deltaTimeInMs: number){
  if(needNewFrame(deltaTimeInMs) == false) return;
  renderer.clear();

  const scale = 0.001;
  if (Key.A) rotationXScale -= scale;
  if (Key.D) rotationXScale += scale;
  if (Key.W) rotationYScale -= scale;
  if (Key.S) rotationYScale += scale;

  drawArray.forEach((element: DrawItem) => {
    element.calculateNewAngles();
    element.shape.drawAt(element);
  });
}

let teapot: Teapot;
let rotateXTeapot: number = 0;
let rotateYTeapot: number = 0;

function RenderTeapotMode(deltaTimeInMs: number){
  if(needNewFrame(deltaTimeInMs) == false) return;
  renderer.clear();
  if(!teapot) teapot = new Teapot(100);
 
  if (Key.W) rotateXTeapot += 0.05;
  if (Key.S) rotateXTeapot -= 0.05;
  if (Key.D) rotateYTeapot += 0.05;
  if (Key.A) rotateYTeapot -= 0.05;

  teapot.drawAt(windowWidth/ 2, windowHeight/2, rotateXTeapot, rotateYTeapot);
}

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

function initializeDrawArray(): Array<DrawItem> {
  return calculateDrawingPositions().map((x, index) => {
    const wrappedIndex = index % possibleRenderItems.length;
    let item = possibleRenderItems[wrappedIndex]!();
    return new DrawItem(item, x);
  });
}