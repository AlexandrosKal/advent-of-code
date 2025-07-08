// day 11 solution

import { readInput } from "../utils";
import path, { parse } from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string) {
  const asciiCodes: number[] = [];
  Array.from(input).forEach((c) => asciiCodes.push(c.charCodeAt(0)));
  return asciiCodes;
}

function increment(asciiCodes: number[], startIdx?: number) {
  if (startIdx === undefined) startIdx = asciiCodes.length - 1;
  if (asciiCodes[startIdx] >= "z".charCodeAt(0) && startIdx === 0) {
    throw new Error("Cannot increment (Max reached)");
  }
  if (asciiCodes[startIdx] < "z".charCodeAt(0)) {
    asciiCodes[startIdx] += 1;
    return;
  }
  asciiCodes[startIdx] = "a".charCodeAt(0);
  increment(asciiCodes, startIdx - 1);
}

function codesToString(codes: number[]) {
  return String.fromCharCode(...codes);
}

function isValid(codes: number[]) {
  return (
    hasAscendingSequence(codes) &&
    notContainsBlacklistedChar(codes) &&
    hasTwoNonOverlappingPairs(codes)
  );
}

function hasAscendingSequence(codes: number[]) {
  for (let i = 0; i < codes.length - 2; i++) {
    if (codes[i] + 1 === codes[i + 1] && codes[i + 1] + 1 === codes[i + 2])
      return true;
  }
  return false;
}

function notContainsBlacklistedChar(codes: number[]) {
  const set = new Set(codes);
  const blacklistedChars = ["i", "l", "o"];
  const res = blacklistedChars.every((c) => !set.has(c.charCodeAt(0)));
  return res;
}

function hasTwoNonOverlappingPairs(codes: number[]) {
  const pairIndices = new Set<number>();
  for (let i = 0; i < codes.length - 1; i++) {
    if (codes[i] !== codes[i + 1]) continue;
    if (pairIndices.has(i) || pairIndices.has(i + 1)) continue;
    pairIndices.add(i);
    pairIndices.add(i + 1);
    if (pairIndices.size === 4) return true;
  }
  return false;
}

function solve(input: string) {
  const asciiCodes = parseInput(input);
  increment(asciiCodes);
  while (!isValid(asciiCodes)) {
    increment(asciiCodes);
  }
  return codesToString(asciiCodes);
}

const part1Solution = solve(input);
const part2Solution = solve(part1Solution);
console.log("Part 1 Solution: ", part1Solution);
console.log("Part 2 Solution: ", part2Solution);
