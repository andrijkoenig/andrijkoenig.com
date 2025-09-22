class Vertex {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  projection(centerX:number, centerY:number, scale:number = 100): projectedCoordinates{
    return new projectedCoordinates(centerX + (FOV * this.x) / (FOV + this.z) * scale, centerY + (FOV * this.y) / (FOV + this.z) * scale);
  }  

  rotate(rotation: number): Vertex {
    return this.rotateX(rotation).rotateY(rotation);
  }

  private rotateX(rotation: number): Vertex {
    return new Vertex (
      this.x,
      Math.cos(rotation) * this.y - Math.sin(rotation) * this.z,
      Math.sin(rotation) * this.y + Math.cos(rotation) * this.z
    )
  }

  private rotateY(rotation: number): Vertex {
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
