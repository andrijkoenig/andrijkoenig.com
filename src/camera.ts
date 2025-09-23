class Camera {

    x: number;
    y: number;
    z: number;
    rotationZ: number;
    fov: number;
    rotationX: number;
    rotationY: number;

    constructor(
        x: number,
        y: number,
        z: number,
        fov: number = 500,
        rotationX: number = 0,
        rotationY: number = 0,
        rotationZ: number = 0
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.fov = fov;
        this.rotationZ = rotationZ;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
    }

    moveCamera(){
        if(Key.W) this.rotationZ -= 0.01;
        if(Key.S) this.rotationZ += 0.01;
        if(Key.A) this.rotationY -= 0.01;
        if(Key.D) this.rotationY += 0.01;
        if(Key.E) this.rotationX -= 0.01;
        if(Key.Q) this.rotationX += 0.01;
        

        if(Key.u) this.y += 10;
        if(Key.d) this.y -= 10;
        if(Key.l) this.x += 10;
        if(Key.r) this.x -= 10;
    }

}