let terminalHistory: TerminalObject[];
let MaxTerminalHistoryItems: number = 30;
let currentUserText = "";
  const lineHeight = 35;
let terminalEventListeners: ((event: KeyboardEvent) => void)[] = [
  (event) => {
    if (event.key === "Backspace") {
      currentUserText = currentUserText.slice(0, -1);
    } else if (event.key === "Enter") {
      evalCommand();
    } else if (event.key.length === 1) {
      currentUserText += event.key;
    }
  },
];

function CalcMaxTerminalHistoryItems() {
  MaxTerminalHistoryItems = Math.floor(windowHeight / lineHeight) - 2;
  console.log(MaxTerminalHistoryItems);
}

function initializeTerminalMode() {
  if(!terminalHistory){
    terminalHistory = [];
  }
  CalcMaxTerminalHistoryItems();
  terminalEventListeners.forEach((x) => window.addEventListener("keydown", x));
}

function destructTerminalMode() {
  terminalEventListeners.forEach((x) =>
    window.removeEventListener("keydown", x)
  );
}

function RenderTermninalMode(deltaTime: number) {
  let newFrame = needNewFrame(deltaTime)
  const terminalLength = terminalHistory.filter(x=> x instanceof LineBreak).length;
  const diff = terminalLength  - MaxTerminalHistoryItems;
  if (diff > 0){
    console.log(MaxTerminalHistoryItems);
    terminalHistory = terminalHistory.slice(diff, terminalHistory.length);
  }

  if(newFrame == false) return;
  renderer.clear();

  let xCord = 20;
  let yCord = 40;
  AnimateBlinkingCursorColor(deltaTime);
  // before rendering check if it would fit on screen Y Cord

  terminalHistory.forEach((element) => {
    if (element instanceof TerminalText) {
      let historyText = renderer.drawText(element, xCord, yCord);
      xCord += historyText.width;
    }
    if (element instanceof LineBreak) {
      yCord += lineHeight;
      xCord = 20;
    }
  });

  // render Prompt
  let prompt = renderer.drawText(GetPrompt(), xCord, yCord);
  xCord += prompt.width;
  // render blinking Cursor
  let userinput = renderer.drawText(
    new TerminalText(currentUserText, RENDER_COLORS.white),
    xCord,
    yCord
  );
  xCord += userinput.width;

  let cursor = renderer.drawText(
    new TerminalText("|", cursorColor),
    xCord,
    yCord
  );
  cursor.width;
}

let timePassed = 0;
let cursorColor = RENDER_COLORS.t_light_green;
let toggle: boolean;

function AnimateBlinkingCursorColor(deltaTime: number) {
  timePassed += deltaTime;
  if (timePassed > 400) {
    cursorColor = toggle
      ? RENDER_COLORS.t_light_green
      : RENDER_COLORS.t_dark_green;
    toggle = !toggle;
    timePassed = 0;
  }
}

function GetPrompt(): TerminalText {
  var time = new Date(Date.now());
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  return new TerminalText(
    `${timeString} visitor@akng $ `,
    RENDER_COLORS.t_light_green
  );
}

const commands: Record<string, (userInput: any) => void> = {
  [""]: (i) => i,
  ["echo"]: command_echo,
  ["help"]: command_help,
  ["clear"]: command_clear,
  ["about"]: command_about,
  ["screensaver"]: command_screensaver,
  ["teapot"]: command_teapot,
  ["banner"]: command_banner,
};

function evalCommand() {
  // Render the old line
  terminalHistory.push(GetPrompt());
  terminalHistory.push(new TerminalText(currentUserText, RENDER_COLORS.white));
  terminalHistory.push(new LineBreak());

  // command result
  let cmd = ParseCommand(currentUserText);
  let cmdFunc = commands[cmd.name];

  if (!cmdFunc) {
    terminalHistory.push(
      new TerminalText(
        `"${currentUserText}" COMMAND NOT FOUND`,
        RENDER_COLORS.red
      )
    );
    terminalHistory.push(new LineBreak());
    terminalHistory.push(
      new TerminalText(`Type "help" to see all available commands`)
    );
    terminalHistory.push(new LineBreak());
    currentUserText = "";
    return;
  }
  cmdFunc(cmd.params);
  currentUserText = "";
}

function ParseCommand(input: string): command {
  var items = input.split(" ");
  const cmdName = items[0];

  let params = {
    text: "",
  };

  params.text = items.slice(1, items.length).join(" ");

  return { name: cmdName!, params: params };
}

class command {
  name!: string;
  params!: object | null;
}

class TerminalText {
  constructor(
    public text: string,
    public color: string = RENDER_COLORS.white
  ) {}
}
class LineBreak {}

type TerminalObject = TerminalText | LineBreak;
