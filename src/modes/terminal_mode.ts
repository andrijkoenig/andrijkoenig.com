let terminalHistory: TerminalObject[] = [];
let currentUserText = "";
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



function initializeTerminalMode() {
    terminalHistory.push(new TerminalText("Welcome to my page!!"))
    terminalHistory.push(new LineBreak())
    terminalHistory.push(new TerminalText("Type help to get an overview"));
    terminalHistory.push(new LineBreak())

  terminalEventListeners.forEach((x)=> window.addEventListener("keydown", x));
}

function destructTerminalMode(){
  terminalEventListeners.forEach((x)=> window.removeEventListener("keydown", x));
}

function RenderTermninalMode(deltaTime: number) {
  deltaTime++;
  let xCord = 10;
  let yCord = 40;
  const lineHeight = 50;
  AnimateBlinkingCursorColor(deltaTime);

  terminalHistory.forEach((element) => {
    if(element instanceof TerminalText ) {
        let historyText = renderer.drawText(element, xCord, yCord);
        xCord += historyText.width;
    }
    if(element instanceof LineBreak){
        yCord += lineHeight;
        xCord = 10;
    }
  });

  // render Prompt
  let prompt = renderer.drawText(GetPrompt(), xCord, yCord);
  xCord += prompt.width;
  // render blinking Cursor
  let userinput = renderer.drawText(new TerminalText(currentUserText, RENDER_COLORS.white), xCord, yCord);
  xCord += userinput.width;

  let cursor = renderer.drawText(new TerminalText("|", cursorColor),  xCord, yCord);
  cursor.width;
}


let timePassed = 0;
let cursorColor = RENDER_COLORS.t_light_green;
let toggle: boolean;

function AnimateBlinkingCursorColor(deltaTime: number) {
  timePassed += deltaTime - 1;
  if (timePassed > 0.4) {
    cursorColor = toggle ? RENDER_COLORS.t_light_green : RENDER_COLORS.t_dark_green;
    toggle = !toggle;
    timePassed = 0;
  }
}

function GetPrompt(): TerminalText {
  var time = new Date(Date.now());
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  return new TerminalText(`${timeString} visitor@akng $ `, RENDER_COLORS.t_light_green);
}

const commands: Record<string, (userInput: any) => void> = {
  [""]: (i) => i,
  ["echo"]: command_echo,
  ["help"]: command_help,
  ["clear"]: command_clear,
  ["ls"]: command_ls,
  ["fun"]: command_fun,
  ["teapot"]: command_teapot,
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
    terminalHistory.push(new TerminalText(`"${currentUserText}" COMMAND NOT FOUND`, RENDER_COLORS.red));
    terminalHistory.push(new LineBreak());
    terminalHistory.push(new TerminalText(`Type "help" to see all available commands`));
    terminalHistory.push(new LineBreak());
    currentUserText = "";
    return;
  }
  cmdFunc(cmd.params);
  currentUserText = "";
}

function ParseCommand(input: string): command{
    var items  = input.split(" ");
    const cmdName = items[0];

    let params = {
        text: "",
    }

    for (let index = 1; index < items.length; index++) {
        const optionalStuff = items[index];
        params.text += optionalStuff;
        // todo implement parameter parsing
        
    }

    return { name: cmdName!, params: params }

}

class command {
    name!: string;
    params!: object | null;
}

class TerminalText {
    constructor(public text:string, public color:string = RENDER_COLORS.white){}
}
class LineBreak {
}

type TerminalObject = TerminalText | LineBreak;