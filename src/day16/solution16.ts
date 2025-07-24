// day 16 solution

import { readInput } from "../utils";
import path from "path";

const CLUES = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};
const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string, part2: boolean = false) {
  const lines = input.split("\n");
  for (const line of lines) {
    const [aunt, ...rest] = line.split(":");
    const rejoined = rest.join("");
    const clues = rejoined.split(",");
    const currAunt = {};
    for (const c of clues.map((clue) => clue.trim())) {
      const [propName, value] = c.split(" ");
      Object.assign(currAunt, { [propName]: Number(value) });
    }
    if (!part2 && validateAunt(currAunt)) {
      return aunt;
    } else if (part2 && validateAuntPart2(currAunt)) {
      return aunt;
    }
  }
}

function validateAunt(currAunt: Record<string, number>) {
  return Object.entries(currAunt).every(([key, value]) => {
    return (CLUES as any)[key] === value;
  });
}

function validateAuntPart2(currAunt: Record<string, number>) {
  const gtKeys = ["cats", "trees"];
  const ltKeys = ["pomeranians", "goldfish"];
  return Object.entries(currAunt).every(([key, value]) => {
    if (gtKeys.includes(key)) {
      return (CLUES as any)[key] < value;
    } else if (ltKeys.includes(key)) {
      return (CLUES as any)[key] > value;
    } else {
      return (CLUES as any)[key] === value;
    }
  });
}

function solvePart1() {
  const foundAunt = parseInput(input);
  console.log("Part 1 Solution: ", foundAunt);
}

function solvePart2() {
  const foundAunt = parseInput(input, true);
  console.log("Part 2 Solution: ", foundAunt);
}

solvePart1();
solvePart2();
