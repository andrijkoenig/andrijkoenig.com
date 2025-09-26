class Renderer {
  private white: string = "#999";
  private black: string = "#000";
  constructor(private context: CanvasRenderingContext2D) {}

  clear(width: number, height: number) {
    this.context.fillStyle = this.black;
    this.context.fillRect(0, 0, width, height);
  }

  drawLine(
    p1: ProjectedCoordinates,
    p2: ProjectedCoordinates,
    color: string = this.white
  ) {
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.stroke();
  }

  drawPoint(p: ProjectedCoordinates) {
    this.context.strokeStyle = this.white;
    this.context.fillStyle = this.white;
    this.context.beginPath();
    this.context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    this.context.fill();
  }
}

function getRandomColor(): string {
    const mutedRainbowHex = [
      "#d98c8c", // Muted Red
      "#d9b38c", // Muted Orange
      "#d9d98c", // Muted Yellow
      "#8cd98c", // Muted Green
      "#8cd9d9", // Muted Cyan
      "#8c8cd9", // Muted Blue
      "#b38cd9", // Muted Indigo
      "#d98cd9", // Muted Violet
    ];
    let index = Math.floor(Math.random() * mutedRainbowHex.length);
    return mutedRainbowHex[index]!;
  }
