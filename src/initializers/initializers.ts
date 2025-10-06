


function initialize() {
  setUpKeyboardListener();

  let canvas = initializeCanvas();
  if (!canvas) return;

  let context = initialize2dDrawingContext(canvas);
  if (!context) return;
  renderer = new Renderer(context);
}

function initialize2dDrawingContext(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2d context!");
    return null;
  }

  return ctx;
}

function initializeCanvas(): HTMLCanvasElement | null {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    console.error("Canvas element not found!");
    return null;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  return canvas;
}
