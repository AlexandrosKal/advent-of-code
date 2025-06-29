// day 09 solution

import { readInput } from "../utils";
import path from "path";
import DirectedGraph, { Edge, GraphNode } from "../utils/graph";

const input = readInput(path.resolve(__dirname, "input.txt"));

const NODES = new Map<string, GraphNode>();
const EDGES = new Map<string, Edge>();

class Day9Graph extends DirectedGraph {
  private getEdgeWeight(from: string, to: string): number | undefined {
    return (
      this.edges.get(`${from}->${to}`)?.weight ??
      this.edges.get(`${to}->${from}`)?.weight
    );
  }

  findShortestHamiltonianPath(): { path: string[]; distance: number } {
    const cities = Array.from(this.nodes.keys());
    let bestDistance = Infinity;
    let bestPath: string[] = [];

    const dfs = (
      current: string,
      visited: Set<string>,
      acc: number,
      path: string[]
    ) => {
      if (visited.size === cities.length) {
        if (acc < bestDistance) {
          bestDistance = acc;
          bestPath = path.slice();
        }
        return;
      }
      for (const next of cities) {
        if (!visited.has(next)) {
          const w = this.getEdgeWeight(current, next);
          if (w !== undefined) {
            visited.add(next);
            path.push(next);
            dfs(next, visited, acc + w, path);
            path.pop();
            visited.delete(next);
          }
        }
      }
    };

    for (const start of cities) {
      dfs(start, new Set<string>([start]), 0, [start]);
    }

    return { path: bestPath, distance: bestDistance };
  }

  makeWeightsNegative() {
    this.edges.forEach((e) => {
      if (!e.weight) return;
      e.weight *= -1;
    });
  }
}

function parseInput(input: string) {
  const lines = input.split("\n");
  for (const line of lines) {
    const [from, to, weight] = line
      .split(" ")
      .filter((s) => !["to", "="].includes(s));
    const key = `${from}->${to}`;
    addNode(from);
    addNode(to);
    addEdge(key, from, to, Number(weight));
  }
}

function addNode(id: string) {
  if (NODES.has(id)) return;
  NODES.set(id, { id, payload: undefined });
}

function addEdge(key: string, from: string, to: string, weight: number) {
  if (EDGES.has(key)) return;
  EDGES.set(key, { from, to, weight });
}

function constructGraph() {
  const graph = new Day9Graph();
  graph.initialize(Array.from(NODES.values()), Array.from(EDGES.values()));
  return graph;
}

parseInput(input);

function solvePart1() {
  const graph = constructGraph();
  const { path, distance } = graph.findShortestHamiltonianPath();
  console.log("Part 1 Solution: ", path.join(" -> "), distance);
}

function solvePart2() {
  const graph = constructGraph();
  graph.makeWeightsNegative();
  const { path, distance } = graph.findShortestHamiltonianPath();
  console.log("Part 2 Solution: ", path.join(" -> "), -distance);
}

solvePart1();
solvePart2();
