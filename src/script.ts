let mouseX: number | undefined;
let mouseY: number | undefined;

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let centerX: number;
let centerY: number;

document.onmousemove = function (e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

document.addEventListener('DOMContentLoaded', () => {
  const canvasElement = document.getElementById('canvas');
  if (!(canvasElement instanceof HTMLCanvasElement)) {
    console.error("Canvas element not found or is not a canvas!");
    return;
  }
  canvas = canvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D context!");
    return;
  }
  context = ctx;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  const fps = (fps: number) => 1000 / fps;
  window.setInterval(render, fps(120));
});

let rotationX: number=0;
let rotationY: number=0;
let FOV: number = 10;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  let mouseScale = 0.005;
  if(mouseY) rotationX = mouseY * mouseScale;
  if(mouseX) rotationY = mouseX * mouseScale;
  rotationX += 0.005;
  rotationY += 0.005;

  cubeEdges.forEach(element => {

    let point1 = cubeVertices[element.start]!.rotate().projection();
    let point2 = cubeVertices[element.end]!.rotate().projection();

    drawLine(point1, point2);
    drawPoint(point1);
    drawPoint(point2);
  });

  // if (mouseX !== undefined && mouseY !== undefined) {
  //   context.strokeRect(mouseX, mouseY, 20, 20);
  // }
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

class Vertex {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  projection(scale:number = 100): projectedCoordinates{
    return new projectedCoordinates(centerX + (FOV * this.x) / (FOV + this.z) * scale, centerY + (FOV * this.y) / (FOV + this.z) * scale);
  }  

  rotate(): Vertex {
    return this.rotateX().rotateY();
  }

  private rotateX(): Vertex {
    let rotation = rotationX;
    return new Vertex (
      this.x,
      Math.cos(rotation) * this.y - Math.sin(rotation) * this.z,
      Math.sin(rotation) * this.y + Math.cos(rotation) * this.z
    )
  }

  private rotateY(): Vertex {
    let rotation = rotationY;
    return new Vertex(
      Math.cos(rotation) * this.x - Math.sin(rotation) * this.z,
      this.y,
      Math.sin(rotation) * this.x + Math.cos(rotation) * this.z
    )
  }
}

class projectedCoordinates{
  x: number;
  y: number;

  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
}

class Edge {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

// TEST DATA CUBE
const cubeVertices: Vertex[] = [
  new Vertex(-1, -1, -1),
  new Vertex(-1,  1, -1),
  new Vertex( 1,  1, -1),
  new Vertex( 1, -1, -1),

  new Vertex(-1, -1, 1),
  new Vertex(-1,  1, 1),
  new Vertex( 1,  1, 1),
  new Vertex( 1, -1, 1),
];

const cubeEdges: Edge[] = [
  new Edge(0, 1), 
  new Edge(0, 3),
  new Edge(0, 4),
  new Edge(1, 2),
  new Edge(1, 5),
  new Edge(2, 3),
  new Edge(2, 6),
  new Edge(3, 7),
  new Edge(4, 5), 
  new Edge(4, 7),
  new Edge(5, 6),
  new Edge(6, 7)
];
