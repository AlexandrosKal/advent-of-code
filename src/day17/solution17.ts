// day 17 solution

import { readInput } from "../utils";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));
const CONTAINERS = new Map<number, number>();

function parseInput(input: string) {
  const lines = input.split("\n");
  let id = 0;
  lines.forEach((l) => {
    CONTAINERS.set(id, Number(l));
    id++;
  });
}

function isEqual(a1: any[], a2: any[]) {
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

function generateAllCombinations(limit: number) {
  const combinations: any[] = [];
  const dfs = (combo: any[] = []) => {
    if (combo.length > CONTAINERS.size) return;
    const sum = combo.reduce((acc, c) => acc + CONTAINERS.get(c), 0);
    if (sum > limit) return;
    if (sum === limit) {
      const sortedCombo = structuredClone(combo).sort((a, b) => b - a);
      if (combinations.every((c) => !isEqual(c, sortedCombo))) {
        combinations.push(structuredClone(sortedCombo));
      }
      return;
    }
    for (const id of CONTAINERS.keys()) {
      if (combo.includes(id)) continue;
      combo.push(id);
      dfs(combo);
      combo.pop();
    }
  };
  dfs();
  return combinations;
}

parseInput(input);
const combinations = generateAllCombinations(150);

function solvePart1() {
  console.log("Part 1 solution: ", combinations.length);
}

function solvePart2() {
  const minLength = Math.min(...combinations.map((c) => c.length));
  const numOfMinLengthCombos = combinations.reduce((acc, c) => {
    const hasMinLength = c.length === minLength;
    return acc + hasMinLength;
  }, 0);
  console.log("Part 2 solution: ", numOfMinLengthCombos);
}

solvePart1();
solvePart2();
