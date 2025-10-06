window.addEventListener("resize", () => {
  initializeCanvas();
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
    W: false,
    A: false,
    S: false,
    D: false,
};

function setUpKeyboardListener(){
document.addEventListener('keydown', (e) => {
        switch (e.key) {
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
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
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
        }
    });
}
