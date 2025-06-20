// day 03 solution
import { readInput } from "../utils";

import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string) {
  return input.split("");
}

function getNextPoint(
  currentPoint: number[],
  symbol: "^" | "v" | ">" | "<"
): number[] {
  const directions = {
    "^": [0, 1],
    v: [0, -1],
    ">": [1, 0],
    "<": [-1, 0],
  };

  return [
    currentPoint[0] + directions[symbol][0],
    currentPoint[1] + directions[symbol][1],
  ];
}

function deliverPresents(moves: ("^" | "v" | ">" | "<")[]): Set<string> {
  const visitedHouses = new Set<string>();
  let currentPoint = [0, 0];
  visitedHouses.add(`${currentPoint[0]}-${currentPoint[1]}`);
  for (const move of moves) {
    const nextPoint = getNextPoint(currentPoint, move);
    visitedHouses.add(`${nextPoint[0]}-${nextPoint[1]}`);
    currentPoint = nextPoint;
  }
  return visitedHouses;
}

function solvePartOne() {
  const numberOfHouses = deliverPresents(
    parseInput(input) as ("^" | "v" | ">" | "<")[]
  );
  console.log("Part 1 Solution: ", numberOfHouses.size);
}

function solvePartTwo() {
  const parsedInput = parseInput(input) as ("^" | "v" | ">" | "<")[];
  const moves = parsedInput.reduce(
    (acc, m, i) => {
      if (i % 2) {
        acc.santa.push(m);
      } else {
        acc.robot.push(m);
      }
      return acc;
    },
    { santa: [], robot: [] } as any
  );
  const numberOfHousesSanta = deliverPresents(moves.santa);
  const numberOfHousesRobo = deliverPresents(moves.robot);
  const totalHouses = new Set([...numberOfHousesRobo, ...numberOfHousesSanta]);
  console.log("Part 2 Solution: ", totalHouses.size);
}

solvePartOne();
solvePartTwo();
