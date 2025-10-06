function command_help(input: any) {
  const fields = Object.keys(commands);
  console.log(fields); // ["a", "b", "c"]
  input;

  terminalHistory.push(
    new TerminalText(
      `The following commands are available:`,
      RENDER_COLORS.white
    )
  );
  terminalHistory.push(new LineBreak());
  fields.forEach((element) => {
    terminalHistory.push(new TerminalText(`${element}`, RENDER_COLORS.white));
    terminalHistory.push(new LineBreak());
  });
}
function command_clear(input: any) {
  input;
  terminalHistory = [];
}
function command_echo(input: any) {
  terminalHistory.push(new TerminalText(input.text, RENDER_COLORS.white));
  terminalHistory.push(new LineBreak());
}
function command_ls(input: any) {
  //TODO
  input;
}
function command_fun(input: any) {
  //GOTO SCREENSAVER MODE
  ActivateScreenSaverMode();
  input;
}
function command_teapot(input: any) {
  // goto teapot mode
  input;
}
