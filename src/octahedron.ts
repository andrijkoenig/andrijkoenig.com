class Octahedron implements Shape {
  vertices: Vertex[];
  edges: Edge[];

  constructor(x: number, y: number, z: number, size: number = 100) {
    this.vertices = [
      new Vertex(x, y, z),                 // bottom
      new Vertex(x, y, z + size),          // top
      new Vertex(x - size, y, z + size/2), // left
      new Vertex(x + size, y, z + size/2), // right
      new Vertex(x, y - size, z + size/2), // front
      new Vertex(x, y + size, z + size/2), // back
    ];

    this.edges = [
      new Edge(0, 2, getRandomColor()),
      new Edge(0, 3, getRandomColor()),
      new Edge(0, 4, getRandomColor()),
      new Edge(0, 5, getRandomColor()),
      new Edge(1, 2, getRandomColor()),
      new Edge(1, 3, getRandomColor()),
      new Edge(1, 4, getRandomColor()),
      new Edge(1, 5, getRandomColor()),
      new Edge(2, 4, getRandomColor()),
      new Edge(2, 5, getRandomColor()),
      new Edge(3, 4, getRandomColor()),
      new Edge(3, 5, getRandomColor()),
    ];
  }

  drawAt(drawItem: DrawItem): void{
    this.edges.forEach((edge) => {
      const p1 = this.vertices[edge.start]!.AddCameraMovement(drawItem.rotationXAngle, drawItem.rotationYAngle).project(drawItem.screenPosition.x, drawItem.screenPosition.y);
      const p2 = this.vertices[edge.end]!.AddCameraMovement(drawItem.rotationXAngle, drawItem.rotationYAngle).project(drawItem.screenPosition.x, drawItem.screenPosition.y);
      renderer.drawLine(p1, p2, edge.color);
    });
  }
}
