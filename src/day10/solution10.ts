// day 10 solution

import { readInput } from "../utils";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(rawInput: string) {
  const listOfOccurrences = [];
  let prev;
  let counter = 1;
  for (const char of rawInput) {
    if (char !== prev) {
      if (prev !== undefined) {
        listOfOccurrences.push({ num: prev, occurrences: counter });
      }
      counter = 1;
      prev = char;
    } else {
      counter++;
      prev = char;
    }
  }
  if (prev !== undefined) {
    listOfOccurrences.push({ num: prev, occurrences: counter });
  }
  return listOfOccurrences;
}

function transformParsedInput(
  listOfOccurrences: { num: string; occurrences: number }[]
) {
  const transformed = [];
  for (const { num, occurrences } of listOfOccurrences) {
    transformed.push(String(occurrences), num);
  }
  return transformed.join("");
}

function solve(iterations: number) {
  let iterationInput = input;
  let solution;
  for (let i = 0; i < iterations; i++) {
    const parsedInput = parseInput(iterationInput);
    const transformed = transformParsedInput(parsedInput);
    iterationInput = transformed;
    solution = transformed.length;
  }
  return solution;
}

const solvePart1 = () => console.log("Part 1 Solution", solve(40));
const solvePart2 = () => console.log("Part 2 Solution", solve(50));

solvePart1();
solvePart2();
