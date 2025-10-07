function initialize() {
  setUpKeyboardListener();
  updateCopyright();
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

function updateCopyright(){
  const element = document.getElementById("currentYear");
  var time = new Date(Date.now());
  element!.innerHTML = time.getFullYear().toString();
}

function setInfoBox(text:string= "Press Ctrl + C to exit"){
  const element = document.getElementById("infobox");
  if (!element)return ;
  element!.innerHTML = text;
}


