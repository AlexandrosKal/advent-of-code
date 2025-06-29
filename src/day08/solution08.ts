// day 08 solution

import { readInput } from "../utils";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(rawInput: string) {
  return rawInput.split("\n");
}

function countChars(str: string) {
  const regxp = /\\x[0-9a-f]{2}|\\\"|\\\\/g;
  const replaced = str.replace(regxp, "~");
  return { chars: str.length, mem: replaced.length - 2 };
}

function encodeString(str: string) {
  const enc = String(JSON.stringify(str));
  return { chars: enc.length, mem: str.length };
}

function solvePart1() {
  const parsed = parseInput(input);
  const result = parsed.map(countChars).reduce((acc, curr) => {
    return { chars: acc.chars + curr.chars, mem: acc.mem + curr.mem };
  });
  console.log(result);
  console.log("Part 1 Solution: ", result.chars - result.mem);
}

function solvePart2() {
  const parsed = parseInput(input);
  const result = parsed.map(encodeString).reduce((acc, curr) => {
    return { chars: acc.chars + curr.chars, mem: acc.mem + curr.mem };
  });
  console.log(result);
  console.log("Part 2 Solution: ", result.chars - result.mem);
}

solvePart1();
solvePart2();
