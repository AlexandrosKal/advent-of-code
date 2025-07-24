// day 15 solution

import { readInput } from "../utils";
import path from "path";

const INGREDIENT_LIST = new Map<string, object>();
const input = readInput(path.resolve(__dirname, "input.txt"));

function parseInput(input: string) {
  const lines = input.split("\n");
  for (const line of lines) {
    const [ing_id, stats] = line.split(":");
    const splitStats = stats.split(",").map((s) => s.trim());
    const mapElement = {};
    for (const stat of splitStats) {
      const tokens = stat.split(" ");
      const statName = tokens[0];
      const statValue = tokens[1];
      Object.assign(mapElement, { [statName]: Number(statValue) });
    }
    INGREDIENT_LIST.set(ing_id, mapElement);
  }
}

function calculateIngredientsWithMaxScore(
  numTeaspoons: number,
  calLimit?: number
) {
  const combos = generateAllCombinations(numTeaspoons);
  const ingredients = Array.from(INGREDIENT_LIST.values());
  let best = 0;

  for (const combo of combos) {
    let cap = 0,
      dur = 0,
      fla = 0,
      tex = 0,
      cal = 0;

    for (let i = 0; i < ingredients.length; i++) {
      const amt = combo[i];
      const ing = ingredients[i];
      cap += (ing as any).capacity * amt;
      dur += (ing as any).durability * amt;
      fla += (ing as any).flavor * amt;
      tex += (ing as any).texture * amt;
      cal += (ing as any).calories * amt;
    }
    if (calLimit && cal !== calLimit) continue;
    const score =
      Math.max(0, cap) * Math.max(0, dur) * Math.max(0, fla) * Math.max(0, tex);
    if (score > best) best = score;
  }
  return best;
}

function generateAllCombinations(numTeaspoons: number) {
  const combinations: any[] = [];
  const numIngredients = INGREDIENT_LIST.size;
  const dfs = (combo: any[] = []) => {
    const sum = combo.reduce((acc, c) => acc + c, 0);
    if (sum > numTeaspoons) return;
    if (combo.length === numIngredients) {
      if (sum === numTeaspoons) combinations.push(structuredClone(combo));
      return;
    }
    for (let i = 0; i <= numTeaspoons; i++) {
      combo.push(i);
      dfs(combo);
      combo.pop();
    }
  };
  dfs();
  return combinations;
}

parseInput(input);

function solvePart1() {
  const max = calculateIngredientsWithMaxScore(100);
  console.log("Solution Part 1", max);
}

function solvePart2() {
  const max = calculateIngredientsWithMaxScore(100, 500);
  console.log("Solution Part 2", max);
}

solvePart1();
solvePart2();
