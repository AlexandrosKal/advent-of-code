// day 02 solution
import { readInput } from "../utils";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string) {
  return input.split("\n").map((line) => line.split("x").map(Number));
}

function calculateArea([l, w, h]: number[]): number {
  const slack = Math.min(l * w, w * h, h * l);
  return 2 * l * w + 2 * w * h + 2 * h * l + slack;
}

function calculateSmallesPerimeter([l, w, h]: number[]): number {
  const calcPerimeter = ([a, b]: number[]) => {
    return 2 * a + 2 * b;
  };
  const sides = [
    [l, w],
    [w, h],
    [h, l],
  ];
  return Math.min(...sides.map(calcPerimeter));
}

function calculateVolume([l, w, h]: number[]): number {
  return l * w * h;
}

const parsedInput = parseInput(input);

function solvePartOne() {
  const totalArea = parsedInput.reduce((acc, dims) => {
    return acc + calculateArea(dims);
  }, 0);
  console.log("Part 1 Solution", totalArea);
}

function solvePartTwo() {
  const totalRibbon = parsedInput.reduce((acc, dims) => {
    return acc + calculateSmallesPerimeter(dims) + calculateVolume(dims);
  }, 0);
  console.log("Part 2 Solution:", totalRibbon);
}

solvePartOne();
solvePartTwo();
