// day 01 solution
import { readInput } from "../utils";
import path from "path";

function countParens(input: string): {
  diff: number;
  firstNegativePos: number;
} {
  let countLeft = 0;
  let countRight = 0;
  let localDiff = 0;
  let pos = 0;
  let basementNotVisited = true;
  for (const [i, r] of input.split("").entries()) {
    if (r === "(") {
      countLeft += 1;
    } else {
      countRight += 1;
    }
    localDiff = countLeft - countRight;
    if (localDiff < 0 && basementNotVisited) {
      pos = i + 1;
      basementNotVisited = false;
    }
  }
  return { diff: countLeft - countRight, firstNegativePos: pos };
}

const input = readInput(path.resolve(__dirname, "input.txt"));

function solvePartOne() {
  const { diff } = countParens(input);
  console.log("Part 1 solution: ", diff);
}

function solvePartTwo() {
  const { firstNegativePos } = countParens(input);
  console.log("Part 2 solution: ", firstNegativePos);
}

solvePartOne();
solvePartTwo();
