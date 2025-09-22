class Renderer {
  constructor(private context: CanvasRenderingContext2D) {}

  clear(width: number, height: number) {
    this.context.clearRect(0, 0, width, height);
  }

  drawLine(p1: ProjectedCoordinates, p2: ProjectedCoordinates) {
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.stroke();
  }

  drawPoint(p: ProjectedCoordinates) {
    this.context.beginPath();
    this.context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    this.context.fill();
  }
}