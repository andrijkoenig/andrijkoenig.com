window.addEventListener("resize", () => {
  initializeCanvas();
  // RECALCULATE DRAWING POSITIONS
  drawArray = initializeDrawArray();
});

function setUpButton(buttonId: string, func: () => any) {
  const countBtn = document.getElementById(buttonId);
  if (!countBtn) {
    console.error("Button element not found!");
    return;
  }
  countBtn.addEventListener("click", func);
}

const Key = {
    r: false,
    l: false,
    u: false,
    d: false,

    W: false,
    A: false,
    S: false,
    D: false,
    Q: false,
    E: false,
};

function setUpKeyboardListener(){
document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (!Key.d) Key.u = true;
                break;
            case 'ArrowLeft':
                if (!Key.r) Key.l = true;
                break;
            case 'ArrowRight':
                if (!Key.l) Key.r = true;
                break;
            case 'ArrowDown':
                if (!Key.u) Key.d = true;
                break;

            case 'w':
                if (!Key.S) Key.W = true;
                break;
            case 'a':
                if (!Key.D) Key.A = true;
                break;
            case 's':
                if (!Key.W) Key.S = true;
                break;
            case 'd':
                if (!Key.A) Key.D = true;
                break;
            case 'q':
                if (!Key.E) Key.Q = true;
                break;
            case 'e':
                if (!Key.Q) Key.E = true;
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                Key.u = false;
                break;
            case 'ArrowLeft':
                Key.l = false;
                break;
            case 'ArrowRight':
                Key.r = false;
                break;
            case 'ArrowDown':
                Key.d = false;
                break;

            case 'w':
                Key.W = false;
                break;
            case 'a':
                Key.A = false;
                break;
            case 's':
                Key.S = false;
                break;
            case 'd':
                Key.D = false;
                break;
            case 'q':
                Key.Q = false;
                break;
            case 'e':
                Key.E = false;
                break;
        }
    });
}
