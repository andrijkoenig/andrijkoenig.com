// Constants
const DEFAULT_SCALE = 100;

// Interfaces
class ProjectedCoordinates {
  x: number;
  y: number;
  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
  }
}

// Classes
class Vertex {
  constructor(public x = 0, public y = 0, public z = 0) {}

  project(centerX: number, centerY: number, scale: number = DEFAULT_SCALE): ProjectedCoordinates {
    const factor = camera.fov / (camera.fov + this.z);
    return {
      x: centerX + this.x * factor * scale,
      y: centerY + this.y * factor * scale,
    };
  }

  rotate(): Vertex {
    return this.rotateZ().rotateX().rotateY();
  }

  private rotateX(): Vertex {
    const cos = Math.cos(camera.rotationX);
    const sin = Math.sin(camera.rotationX);
    return new Vertex(
      this.x,
      cos * this.y - sin * this.z,
      sin * this.y + cos * this.z
    );
  }

  private rotateY(): Vertex {
    const cos = Math.cos(camera.rotationY);
    const sin = Math.sin(camera.rotationY);
    return new Vertex(
      cos * this.x + sin * this.z,
      this.y,
      -(sin * this.x) + cos * this.z
    );
  }

  private rotateZ(): Vertex {
    const cos = Math.cos(camera.rotationZ);
    const sin = Math.sin(camera.rotationZ);
    return new Vertex(
      cos * this.x - sin * this.y,
      sin * this.x + cos * this.y,
      this.z
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
  constructor(public start: number, public end: number) {}
}

