// day 14 solution

import { readInput } from "../utils";
import path from "path";

const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string) {
  const reindeers = new Map<string, Record<string, number>>();
  const lines = input.split("\n");
  for (const line of lines) {
    const tokens = line.split(" ");
    const name = tokens[0];
    const speed = +tokens[3];
    const flightTime = +tokens[6];
    const restTime = +tokens[tokens.length - 2];
    reindeers.set(name, { speed, flightTime, restTime, points: 0 });
  }
  return reindeers;
}

function getDistanceAfterSeconds(
  reindeer: Record<string, number>,
  seconds: number
) {
  const { speed, flightTime, restTime } = reindeer;
  const div = Math.trunc(seconds / (flightTime + restTime));
  const mod = seconds % (flightTime + restTime);
  const remainderTravelSeconds = Math.min(flightTime, mod);
  const totalDistance =
    div * flightTime * speed + remainderTravelSeconds * speed;
  return totalDistance;
}

const reindeers = parseInput(input);

function solvePart1() {
  const seconds = 2503;
  const dists = Array.from(reindeers.values()).map((r) =>
    getDistanceAfterSeconds(r, seconds)
  );
  console.log("Part 1 Solution: ", Math.max(...dists));
}

function solvePart2() {
  const maxSeconds = 2503;
  for (let i = 1; i <= maxSeconds; i++) {
    const distanceMap = new Map<number, string[]>();
    for (const [name, reindeer] of reindeers.entries()) {
      const dist = getDistanceAfterSeconds(reindeer, i);
      if (!distanceMap.has(dist)) {
        distanceMap.set(dist, [name]);
      } else {
        distanceMap.get(dist)?.push(name);
      }
    }
    const minKey = Math.max(...distanceMap.keys());
    const namesThatGetPoints = distanceMap.get(minKey);
    for (const name of namesThatGetPoints!) {
      const r = reindeers.get(name)!;
      r.points = r.points + 1;
    }
  }
  const points = Array.from(reindeers.values()).map((r) => r.points);
  console.log("Part 2 Solution: ", Math.max(...points));
}

solvePart1();
solvePart2();
