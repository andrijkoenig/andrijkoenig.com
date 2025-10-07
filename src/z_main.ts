let renderer: Renderer;
let windowWidth: number;
let windowHeight: number;
let lastTime = 0;
let currentTime = 0;


document.addEventListener("DOMContentLoaded", () => {
  initialize();
  ActivateTerminalMode();
  requestAnimationFrame(render);
});

function render(time: number) {

  currentTime = time || performance.now();
  const deltaTime = (currentTime - lastTime);
  
  renderers[currentMode]?.(deltaTime);
  requestAnimationFrame(render);
}

function needNewFrame(deltaTime:number) :boolean{
  const frameDuration = 1000 / 30;
  if (deltaTime >= frameDuration) {
      lastTime = currentTime - (deltaTime % frameDuration);
      return true;
  }
  return false;
}



