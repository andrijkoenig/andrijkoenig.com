class Teapot {
  data: Triangle[];

  constructor(private scale = 1) {
    this.data = this.loadTeapot();
  }

  drawAt(x: number, y: number) {
    this.data.forEach((element) => {
      let p1 = element.points[0].AddCameraMovement().project(x, y);
      let p2 = element.points[1].AddCameraMovement().project(x, y);
      let p3 = element.points[2].AddCameraMovement().project(x, y);

      renderer.drawLine(p1, p2);
      renderer.drawLine(p2, p3);
      renderer.drawLine(p3, p1);
    });
  }

  private loadTeapot(): Triangle[] {
    let result: Triangle[] = [];
    fetch("teapot.tris")
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split("\r\n");

        for (let index = 1; index < lines.length; index += 4) {
          result.push(
            new Triangle(
              this.ParseLine(lines[index]!),
              this.ParseLine(lines[index + 1]!),
              this.ParseLine(lines[index + 2]!)
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error loading teapot.tris:", error);
      });

    return result;
  }

  private ParseLine(teapotLine: string): Vertex {
    teapotLine.split(" ");
    const parts = teapotLine.split(" ");
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    const z = Number(parts[2]);
    return new Vertex(x * this.scale, y * this.scale, z * this.scale);
  }
}
