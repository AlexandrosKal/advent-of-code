// day 13 solution

import { readInput } from "../utils";
import path from "path";
import Graph, { UndirectedGraph } from "../utils/graph";
import { Edge, GraphNode } from "../utils/graph";

const input = readInput(path.resolve(__dirname, "input.txt"));

const NODES: Map<string, GraphNode> = new Map();
const EDGES: Map<string, Edge> = new Map();

function parseInput(input: string) {
  const lines = input.split("\n");
  for (const line of lines) {
    const tokens = line.split(" ");
    const from = tokens[0];
    const to = tokens[tokens.length - 1].replace(".", "");
    const sign = tokens[2] === "gain" ? 1 : -1;
    const weight = Number(tokens[3]) * sign;
    const nodeKey = from;
    const edgeKey = [from, to].sort().join("<->");
    if (!NODES.has(nodeKey)) NODES.set(nodeKey, { id: from });
    const edge = EDGES.get(edgeKey);
    if (edge) {
      EDGES.set(edgeKey, { from, to, weight: weight + edge.weight! });
    } else {
      EDGES.set(edgeKey, { from, to, weight });
    }
  }
}

function addNeutralNode() {
  const neutralNode = { id: "neutral" };
  NODES.set(neutralNode.id, neutralNode);
  for (const node of NODES.values()) {
    EDGES.set(`${node.id}<->${neutralNode.id}`, {
      from: node.id,
      to: neutralNode.id,
      weight: 0,
    });
  }
}

class Day13Graph extends UndirectedGraph {
  getEdgeWeight(from: string, to: string) {
    const edgeKey = [from, to].sort().join("<->");
    return this.edges.get(edgeKey)?.weight;
  }

  findShortestHamiltonianCycle(): { cycle: string[]; distance: number } {
    const cities = Array.from(this.nodes.keys());
    let bestDistance = Infinity;
    let bestCycle: string[] = [];

    const dfs = (
      current: string,
      visited: Set<string>,
      acc: number,
      cycle: string[],
      start: string
    ) => {
      if (visited.size === cities.length) {
        const back = this.getEdgeWeight(current, start);
        if (back !== undefined) {
          const total = acc + back;
          if (total < bestDistance) {
            bestDistance = total;
            bestCycle = [...cycle, start];
          }
        }
        return;
      }
      for (const next of cities) {
        if (!visited.has(next)) {
          const w = this.getEdgeWeight(current, next);
          if (w !== undefined) {
            visited.add(next);
            cycle.push(next);
            dfs(next, visited, acc + w, cycle, start);
            cycle.pop();
            visited.delete(next);
          }
        }
      }
    };

    for (const start of cities) {
      dfs(start, new Set([start]), 0, [start], start);
    }
    console.log(bestCycle);
    return { cycle: bestCycle, distance: bestDistance };
  }

  flipWeightSigns() {
    for (const edge of this.edges.values()) {
      edge.weight = -edge.weight!;
    }
  }
}

function constructGraph() {
  const graph = new Day13Graph();
  graph.initialize(Array.from(NODES.values()), Array.from(EDGES.values()));
  graph.flipWeightSigns();
  return graph;
}

function reset() {
  NODES.clear();
  EDGES.clear();
}

function solvePart1() {
  parseInput(input);
  const graph = constructGraph();
  const { distance } = graph.findShortestHamiltonianCycle();
  console.log("Part 1 Solution: ", -distance);
}

function solvePart2() {
  reset();
  parseInput(input);
  addNeutralNode();
  const graph = constructGraph();
  const { distance } = graph.findShortestHamiltonianCycle();
  console.log("Part 2 Solution: ", -distance);
}

solvePart1();
solvePart2();
