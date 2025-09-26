class Sphere extends Shape {

  constructor(
    cx: number,
    cy: number,
    cz: number,
    radius: number = 100,
    segments: number = 12,   // longitude divisions
    rings: number = 12       // latitude divisions
  ) {
    const vertices = [];
    const edges = [];

    // Generate vertices
    for (let i = 0; i <= rings; i++) {
      const theta = (i * Math.PI) / rings; // latitude angle
      for (let j = 0; j < segments; j++) {
        const phi = (j * 2 * Math.PI) / segments; // longitude angle

        const x = cx + radius * Math.sin(theta) * Math.cos(phi);
        const y = cy + radius * Math.sin(theta) * Math.sin(phi);
        const z = cz + radius * Math.cos(theta);

        vertices.push(new Vertex(x, y, z));
      }
    }

    // Connect edges between vertices
    for (let i = 0; i <= rings; i++) {
      for (let j = 0; j < segments; j++) {
        const current = i * segments + j;
        const next = i * segments + (j + 1) % segments;

        // Horizontal edges
        if (i < rings) {
          edges.push(new Edge(current, next, getRandomColor()));
        }

        // Vertical edges
        if (i < rings) {
          const below = (i + 1) * segments + j;
          edges.push(new Edge(current, below, getRandomColor()));
        }
      }
    }
    super(vertices, edges);
  }
}
