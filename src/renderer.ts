class Renderer {
  constructor(private context: CanvasRenderingContext2D) {}

  clear() {
    this.context.fillStyle = RENDER_COLORS.background;
    this.context.fillRect(0, 0, windowWidth, windowHeight);
  }

  drawLine(
    p1: ProjectedCoordinates,
    p2: ProjectedCoordinates,
    color: string = RENDER_COLORS.white
  ) {
    this.context.shadowBlur = 0;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.stroke();
  }

  drawPoint(p: ProjectedCoordinates) {
    this.context.strokeStyle = RENDER_COLORS.white;
    this.context.fillStyle = RENDER_COLORS.white;
    this.context.beginPath();
    this.context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    this.context.fill();
  }
  
  drawText(text:TerminalText, x: number, y:number): TextMetrics {
    this.context.shadowColor = text.color;
    this.context.shadowBlur = 10;

    this.context.fillStyle = text.color;
    this.context.font = "26px monospace";
    this.context.fillText(text.text, x, y);

    return this.context.measureText(text.text);
  }
}

const RENDER_COLORS ={
  t_light_green: "#00ff00",
  t_dark_green: "#0a640a",
  black: "#000",
  white: "#FFF",
  red: "#F44",
  background: "#000",
  yellow: "#FFFF00",           // bright yellow
  orange: "#FFAA00",           // amber/orange glow
  cyan: "#00FFFF",             // neon cyan
  magenta: "#FF00FF",          // hot pink / magenta
  blue: "#0099FF",             // retro blue
  purple: "#9900FF",           // deep retro purple
  pink: "#FF77FF",             // softer neon pink
  gray: "#888888",             // neutral gray for dividers
  t_orange: "#FF8800",         // terminal-style orange
  t_light_blue: "#33CCFF",     // light neon blue
  t_dark_cyan: "#008888"       // dark retro cyan
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
