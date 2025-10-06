class Cube extends Shape {
  constructor(
    height: number = 100,
    width: number = 100,
    depth: number = 100
  ) {
    const x = 0, y = 0, z = 0;

    const vertices = [
      new Vertex(x, y, z),
      new Vertex(x, y + height, z),
      new Vertex(x + width, y + height, z),
      new Vertex(x + width, y, z),
      new Vertex(x, y, z + depth),
      new Vertex(x, y + height, z + depth),
      new Vertex(x + width, y + height, z + depth),
      new Vertex(x + width, y, z + depth),
    ];

    const edges = [
      new Edge(0, 1, getRandomColor()),
      new Edge(0, 3, getRandomColor()),
      new Edge(0, 4, getRandomColor()),
      new Edge(1, 2, getRandomColor()),
      new Edge(1, 5, getRandomColor()),
      new Edge(2, 3, getRandomColor()),
      new Edge(2, 6, getRandomColor()),
      new Edge(3, 7, getRandomColor()),
      new Edge(4, 5, getRandomColor()),
      new Edge(4, 7, getRandomColor()),
      new Edge(5, 6, getRandomColor()),
      new Edge(6, 7, getRandomColor()),
    ];

    super(vertices, edges); // pass to base class
  }
}
