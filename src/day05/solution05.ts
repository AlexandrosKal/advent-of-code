// day 05 solution

import { readInput } from "../utils";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function isNice(str: string): boolean {
  return (
    hasAtleastThreeVowels(str) &&
    hasLetterTwiceInARow(str) &&
    !containsForbiddenString(str)
  );
}

function hasAtleastThreeVowels(str: string): boolean {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (const c of str.split("")) {
    if (vowels.includes(c)) {
      count++;
    }
    if (count >= 3) {
      return true;
    }
  }
  return false;
}

function hasLetterTwiceInARow(str: string): boolean {
  for (let i = 0; i < str.length - 1; i++) {
    const j = i + 1;
    if (str[i] === str[j]) {
      return true;
    }
  }
  return false;
}

function containsForbiddenString(str: string): boolean {
  const forbiddenStrings = ["ab", "cd", "pq", "xy"];
  const res = forbiddenStrings.some((fs) => {
    return str.includes(fs);
  });
  return res;
}

function isNicePart2(str: string): boolean {
  return hasDuplicatePair(str) && hasRepeatingLetterWith1CharBetween(str);
}

function hasDuplicatePair(str: string): boolean {
  const pairs = new Map<string, Set<number>>();
  for (let i = 0; i < str.length - 1; i += 1) {
    const j = i + 1;
    const key = str[i] + str[j];
    if (pairs.get(key)) {
      return !overlaps(pairs.get(key)!, [i, j]);
    } else {
      pairs.set(key, new Set<number>([i, j]));
    }
  }
  return false;
}

function overlaps(
  existingIndices: Set<number>,
  currentIndices: number[]
): boolean {
  return currentIndices.some((x) => existingIndices.has(x));
}

function hasRepeatingLetterWith1CharBetween(str: string): boolean {
  for (let i = 0; i < str.length - 2; i++) {
    const j = i + 2;
    if (str[i] === str[j]) {
      return true;
    }
  }
  return false;
}

function solvePart1() {
  const parsedInput = input.split("\n");
  const niceStrings = parsedInput.reduce((acc, str) => {
    return isNice(str) ? acc + 1 : acc;
  }, 0);
  console.log("Part 1 Solution: ", niceStrings);
}

function solvePart2() {
  const parsedInput = input.split("\n");
  const niceStrings = parsedInput.reduce((acc, str) => {
    return isNicePart2(str) ? acc + 1 : acc;
  }, 0);
  console.log("Part 2 Solution: ", niceStrings);
}

solvePart1();
solvePart2();
