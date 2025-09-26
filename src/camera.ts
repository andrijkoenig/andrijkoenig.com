class Camera {
  constructor(
    public fov: number = 500,
    public rotationX: number = 0,
    public rotationY: number = 0,
    public rotationZ: number = 0
  ) {

  }

  moveCamera() {
    if (Key.W) this.rotationZ -= 0.01;
    if (Key.S) this.rotationZ += 0.01;
    if (Key.A) this.rotationY -= 0.01;
    if (Key.D) this.rotationY += 0.01;
    if (Key.E) this.rotationX -= 0.01;
    if (Key.Q) this.rotationX += 0.01;
  }
}
