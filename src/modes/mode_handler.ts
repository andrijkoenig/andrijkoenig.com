enum Mode{
  Terminal,
  Geometry
}

let currentMode: Mode;

const renderers: Record<Mode, (dt: number) => void> = {
  [Mode.Terminal]: RenderTermninalMode,
  [Mode.Geometry]: RenderScreenSaverMode,
};

function ActivateTerminalMode(){
  destructGeometryMode();
  initializeTerminalMode();
  currentMode = Mode.Terminal;
}
function ActivateScreenSaverMode(){
  destructTerminalMode();
  initializeGeometryMode();
  currentMode = Mode.Geometry;
}
