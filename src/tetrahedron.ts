class Tetrahedron extends Shape {


  constructor(
    x: number,
    y: number,
    z: number,
    size: number = 100
  ) {
    // Define vertices of a tetrahedron
    const vertices = [
      new Vertex(x, y, z), // Base vertex 1
      new Vertex(x + size, y, z), // Base vertex 2
      new Vertex(x + size / 2, y + Math.sqrt(3) / 2 * size, z), // Base vertex 3
      new Vertex(x + size / 2, y + Math.sqrt(3) / 6 * size, z + Math.sqrt(2 / 3) * size), // Apex vertex
    ];

    // Define edges (6 total)
    const edges = [
      new Edge(0, 1, getRandomColor()),
      new Edge(1, 2, getRandomColor()),
      new Edge(2, 0, getRandomColor()),
      new Edge(0, 3, getRandomColor()),
      new Edge(1, 3, getRandomColor()),
      new Edge(2, 3, getRandomColor()),
    ];
    super(vertices, edges);
  }
 
}
