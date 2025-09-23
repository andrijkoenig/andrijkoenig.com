class Cube {
  vertices: Vertex[];
  edges: Edge[];

  constructor(
    x: number,
    y: number,
    z: number,
    height: number = 100,
    width: number = 100,
    depth: number = 100
  ) {
    this.vertices = [
      new Vertex(x, y, z),
      new Vertex(x, y + height, z),
      new Vertex(x + width, y + height, z),
      new Vertex(x + width, y, z),
      new Vertex(x, y, z + depth),
      new Vertex(x, y + height, z + depth),
      new Vertex(x + width, y + height, z + depth),
      new Vertex(x + width, y, z + depth),
    ];

    this.edges = [
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
      new Edge(6, 7),
    ];
  }

  drawAt(x: number, y: number) {
    this.edges.forEach((edge) => {
      const p1 = this.vertices[edge.start]!.AddCameraMovement().project(x, y);
      const p2 = this.vertices[edge.end]!.AddCameraMovement().project(x, y);
      renderer.drawLine(p1, p2);
      renderer.drawPoint(p1);
      renderer.drawPoint(p2);
    });
  }
}
