// day 12 solution

import { readInput } from "../utils";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string) {
  return JSON.parse(input);
}

function traverseAndCount(
  json: any[],
  blacklistVal: string | undefined,
  counter = 0
) {
  for (const [_, val] of Object.entries(json)) {
    if (typeof val === "number") {
      counter += val;
    } else if (typeof val === "object") {
      counter += traverseAndCount(val, blacklistVal);
    }
  }
  if (!Array.isArray(json) && Object.values(json).includes(blacklistVal))
    return 0;
  return counter;
}

function solvePartOne() {
  const json = parseInput(input);
  const total = traverseAndCount(json, undefined);
  console.log("Part 1 Solution ", total);
}

function solvePartTwo() {
  const json = parseInput(input);
  const total = traverseAndCount(json, "red");
  console.log("Part 2 Solution ", total);
}

solvePartOne();
solvePartTwo();
