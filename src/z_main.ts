let renderer: Renderer;
let windowWidth: number;
let windowHeight: number;
let lastTime = 0;


document.addEventListener("DOMContentLoaded", () => {
  initialize();
  ActivateTerminalMode();
  requestAnimationFrame(render);
});

function render(currentTime: number) {
  renderer.clear(windowWidth, windowHeight);

  if (lastTime === 0) lastTime = currentTime;
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  renderers[currentMode]?.(deltaTime);
  requestAnimationFrame(render);
}



