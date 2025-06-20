import { readFileSync } from "fs";

export function readInput(filename: string): string {
  return readFileSync(filename, {
    encoding: "utf8",
    flag: "r",
  });
}
