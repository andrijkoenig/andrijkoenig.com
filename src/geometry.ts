class ProjectedCoordinates {
  x: number;
  y: number;
  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
  }
}

class Vertex {
  constructor(public x = 0, public y = 0, public z = 0) {
  }

  project(centerX: number, centerY: number): ProjectedCoordinates {
    const factor = 500 / (500 + this.z);
    return {
      x: centerX + this.x * factor ,
      y: centerY + -this.y * factor ,
    };
  }

  AddCameraMovement(xRotationScale: number, yRotationScale: number): Vertex{
    return this.rotateX(xRotationScale).rotateY(yRotationScale);
  }

  private rotateX(angle:number): Vertex {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vertex(
      this.x,
      cos * this.y - sin * this.z,
      sin * this.y + cos * this.z
    );
  }

  private rotateY(angle:number): Vertex {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vertex(
      cos * this.x + sin * this.z,
      this.y,
      -(sin * this.x) + cos * this.z
    );
  }
}

class Triangle {
  points: [Vertex, Vertex, Vertex];
  constructor(p1: Vertex, p2: Vertex, p3: Vertex) {
    this.points = [p1, p2, p3];
  }
}

class Edge {
  constructor(public start: number, public end: number, public color:string = "#FFF") {}
}

