enum Mode{
  Terminal,
  ScreenSaver,
  Teapot
}

let currentMode: Mode;

const renderers: Record<Mode, (dt: number) => void> = {
  [Mode.Terminal]: RenderTermninalMode,
  [Mode.ScreenSaver]: RenderScreenSaverMode,
  [Mode.Teapot]: RenderTeapotMode,
};

function ActivateTerminalMode(){
  setInfoBox("");
  destructGeometryMode();
  initializeTerminalMode();
  currentMode = Mode.Terminal;
}
function ActivateScreenSaverMode(){
  setInfoBox();
  destructTerminalMode();
  initializeGeometryMode();
  currentMode = Mode.ScreenSaver;
}
function ActivateTeapotMode(){
  setInfoBox();
  destructTerminalMode();
  initializeGeometryMode();
  currentMode = Mode.Teapot;
}

