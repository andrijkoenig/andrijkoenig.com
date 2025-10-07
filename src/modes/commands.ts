function command_help(input: any) {
  input;

 // Example of "help" output in terminalHistory style

terminalHistory.push(new TerminalText("Available commands:", RENDER_COLORS.white));
terminalHistory.push(new LineBreak());

terminalHistory.push(new TerminalText("   echo        - Repeat what you type, like an annoying sibling", RENDER_COLORS.white));
terminalHistory.push(new LineBreak());

terminalHistory.push(new TerminalText("   help        - You already know what it does", RENDER_COLORS.white));
terminalHistory.push(new LineBreak());

terminalHistory.push(new TerminalText("   clear       - Clear the terminal of your past mistakes", RENDER_COLORS.white));
terminalHistory.push(new LineBreak());

terminalHistory.push(new TerminalText("   about       - Shows info about this terminal overlord (me)", RENDER_COLORS.white));
terminalHistory.push(new LineBreak());

terminalHistory.push(new TerminalText("   screensaver - Activate fancy animation on your screen", RENDER_COLORS.white));
terminalHistory.push(new LineBreak());

terminalHistory.push(new TerminalText("   teapot      - For when you really need a virtual cup of tea ☕", RENDER_COLORS.white));
terminalHistory.push(new LineBreak());

  
}
function command_clear(input: any) {
  input;
  terminalHistory = [];
}
function command_echo(input: any) {
  terminalHistory.push(new TerminalText(input.text, RENDER_COLORS.white));
  terminalHistory.push(new LineBreak());
}
function command_about(input: any) {
  const birthDate = new Date("1999-05-12T00:00:00"); // May 12, 1999
  const now = new Date();
  const diffMs = now.getTime() - birthDate.getTime(); // difference in milliseconds
  console.log(diffMs);
  const diffMinutes = Math.floor(diffMs / (1000 * 60)); // convert ms to minutes
  terminalHistory.push(
    new TerminalText("──────────────────────────────", RENDER_COLORS.gray)
  );
  terminalHistory.push(new LineBreak());
  terminalHistory.push(
    new TerminalText("Name: Andrij König", RENDER_COLORS.cyan)
  );
  terminalHistory.push(new LineBreak());

  terminalHistory.push(
    new TerminalText(
      `Age: A mere ${diffMinutes} minutes old`,
      RENDER_COLORS.orange
    )
  );
  terminalHistory.push(new LineBreak());

  terminalHistory.push(
    new TerminalText(
      "Height: Towering at the 96th percentile of German giants",
      RENDER_COLORS.magenta
    )
  );
  terminalHistory.push(new LineBreak());

  terminalHistory.push(
    new TerminalText(
      "Languages: Deutsch, English, українська",
      RENDER_COLORS.yellow
    )
  );
  terminalHistory.push(new LineBreak());

  terminalHistory.push(
    new TerminalText(
      "Skills: C#/.NET, JavaScript, TypeScript, SQL, Jenkins, Docker, Github",
      RENDER_COLORS.blue
    )
  );
  terminalHistory.push(new LineBreak());
  terminalHistory.push(
    new TerminalText(
      "Interests: volleyball, architecture, public speaking, fitness, and stoicism",
      RENDER_COLORS.purple
    )
  );
  terminalHistory.push(new LineBreak());
  terminalHistory.push(
    new TerminalText("──────────────────────────────", RENDER_COLORS.gray)
  );
  terminalHistory.push(new LineBreak());

  input;
}
function command_screensaver(input: any) {
  ActivateScreenSaverMode();
  input;
}
function command_teapot(input: any) {
  ActivateTeapotMode();
  input;
}
