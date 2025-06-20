// day 04 solution
import { readInput } from "../utils";
import { createHash } from "crypto";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function getMd5Hash(input: string) {
  return createHash("md5").update(input).digest("hex");
}

function findInteger(input: string, part2?: boolean): number {
  let i = 1;
  const prefix = part2 ? "000000" : "00000";
  while (true) {
    const md5Hash = getMd5Hash(input + String(i));
    if (md5Hash.startsWith(prefix)) {
      break;
    }
    i++;
  }
  return i;
}

function solvePart1() {
  const integer = findInteger(input);
  console.log("Part 1 Solution: ", integer);
}

function solvePart2() {
  const integer = findInteger(input, true);
  console.log("Part 2 Solution: ", integer);
}

console.time("Part 1");
solvePart1();
console.timeEnd("Part 1");

console.time("Part 2");
solvePart2();
console.timeEnd("Part 2");
