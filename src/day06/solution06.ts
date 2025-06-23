// day 06 solution

import { readInput } from "../utils";
import path from "path";

enum Action {
  On = "on",
  Off = "off",
  Toggle = "toggle",
}
interface InputCommand {
  action: Action;
  corner: number[];
  oppositeCorner: number[];
}

const GRID = Array.from({ length: 1000 }, () => Array(1000).fill(0));

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string) {
  const lines = input.split("\n");
  const commands: InputCommand[] = [];
  for (const line of lines) {
    const action = extractAction(line);
    const { corner, oppositeCorner } = extractCorners(line);
    commands.push({ action, corner, oppositeCorner });
  }
  return commands;
}

function extractAction(text: string): Action {
  if (text.startsWith("turn on")) return Action.On;
  if (text.startsWith("turn off")) return Action.Off;
  if (text.startsWith("toggle")) return Action.Toggle;
  throw new Error("Unknown command");
}

function extractCorners(text: string): {
  corner: number[];
  oppositeCorner: number[];
} {
  const matches = text.match(/\d+,\d+/g);
  const corners = matches!.map((x) => x.split(",").map((n) => Number(n)));
  return { corner: corners[0], oppositeCorner: corners[1] };
}

function resetGrid() {
  for (let i = 0; i < GRID[0].length; i++) {
    for (let j = 0; j < GRID[0].length; j++) {
      GRID[i][j] = 0;
    }
  }
}

function printGrid() {
  for (const row of GRID) {
    console.log(String(row));
  }
}

function mutateGrid(
  command: InputCommand,
  ops: Record<Action, (x: number) => number>
) {
  const {
    action,
    corner: [i0, j0],
    oppositeCorner: [iC, jC],
  } = command;
  for (let i = i0; i <= iC; i++) {
    for (let j = j0; j <= jC; j++) {
      const newValue = ops[action](GRID[i][j]);
      GRID[i][j] = newValue;
    }
  }
}

const ops = {
  [Action.On]: (_: number) => 1,
  [Action.Off]: (_: number) => 0,
  [Action.Toggle]: (x: number) => Number(!x),
};

const opsPart2 = {
  [Action.On]: (x: number) => x + 1,
  [Action.Off]: (x: number) => Math.max(x - 1, 0),
  [Action.Toggle]: (x: number) => x + 2,
};

function solvePart1() {
  const commands = parseInput(input);
  commands.forEach((command) => mutateGrid(command, ops));
  const totalOn = GRID.flat().reduce((acc, val) => acc + val, 0);
  console.log("Part 1 Solution: ", totalOn);
}

function solvePart2() {
  const commands = parseInput(input);
  commands.forEach((command) => mutateGrid(command, opsPart2));
  const totalBrightness = GRID.flat().reduce((acc, val) => acc + val, 0);
  console.log("Part 2 Solution: ", totalBrightness);
}

solvePart1();
resetGrid();
solvePart2();
