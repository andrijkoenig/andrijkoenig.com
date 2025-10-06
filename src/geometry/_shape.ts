abstract class Shape {
  vertices: Vertex[];
  edges: Edge[];

  constructor(vertices: Vertex[] = [], edges: Edge[] = []) {
    this.vertices = vertices;
    this.edges = edges;
  }

  drawAt(drawItem: DrawItem) {
    this.edges.forEach((edge) => {
      const p1 = this.vertices[edge.start]!
        .AddCameraMovement(drawItem.rotationXAngle, drawItem.rotationYAngle)
        .project(drawItem.screenPosition.x, drawItem.screenPosition.y);

      const p2 = this.vertices[edge.end]!
        .AddCameraMovement(drawItem.rotationXAngle, drawItem.rotationYAngle)
        .project(drawItem.screenPosition.x, drawItem.screenPosition.y);

      renderer.drawLine(p1, p2, edge.color);
    });
  }
}