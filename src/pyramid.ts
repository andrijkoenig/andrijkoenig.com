class Pyramid extends Shape {
  constructor(
    x: number,
    y: number,
    z: number,
    base: number = 100,
    height: number = 100
  ) {
    const vertices = [
      new Vertex(x, y, z),
      new Vertex(x + base, y, z),
      new Vertex(x + base, y + base, z),
      new Vertex(x, y + base, z),
      new Vertex(x + base / 2, y + base / 2, z + height),
    ];

    const edges = [
      new Edge(0, 1, getRandomColor()),
      new Edge(1, 2, getRandomColor()),
      new Edge(2, 3, getRandomColor()),
      new Edge(3, 0, getRandomColor()),
      new Edge(0, 4, getRandomColor()),
      new Edge(1, 4, getRandomColor()),
      new Edge(2, 4, getRandomColor()),
      new Edge(3, 4, getRandomColor()),
    ];
    super(vertices, edges);
  }
}
