// day 07 solution

import { readInput } from "../utils";
import { uint16 } from "../utils";
import path from "path";
import DirectedGraph, { Edge, GraphNode } from "../utils/graph";

const input = readInput(path.resolve(__dirname, "input.txt"));

const NODES = new Map<string, GraphNode>();
const EDGES = new Map<string, Edge>();

enum Gates {
  OR = "or",
  AND = "and",
  NOT = "not",
  RSHIFT = "rshift",
  LSHIFT = "lshift",
}

const ops = {
  [Gates.OR]: (x: number, y: number) => uint16.or16(x, y),
  [Gates.AND]: (x: number, y: number) => uint16.and16(x, y),
  [Gates.NOT]: (x: number) => uint16.not16(x),
  [Gates.RSHIFT]: (x: number, y: number) => uint16.shr16(x, y),
  [Gates.LSHIFT]: (x: number, y: number) => uint16.shl16(x, y),
};

class OperationGraph extends DirectedGraph {
  constructor() {
    super();
  }

  topologicalSort(): string[] {
    // DFS based topological sort
    const visited = new Set<string>();
    const stack: string[] = [];
    const dfsVisit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      const neighbours = this.getNeighboursAndWeights(nodeId) || [];
      for (const { node } of neighbours) {
        dfsVisit(node.id);
      }
      stack.push(nodeId);
    };
    for (const nodeId of this.nodes.keys()) {
      dfsVisit(nodeId);
    }
    return stack.reverse();
  }

  resolveGraph(): void {
    const sorted = this.topologicalSort();
    for (const id of sorted) {
      this.resolveNode(id);
    }
  }

  resolveNode(id: string) {
    const node = this.getNode(id);
    if (node.payload.value !== undefined) return;

    const incomingEdges = Array.from(this.edges.values()).filter(
      (e) => e.to === id
    );
    const inputs = incomingEdges.map(
      (e) => this.getNode(e.from).payload.value!
    );
    const [input1, input2] =
      inputs.length === 1 ? [inputs[0], undefined] : inputs;
    node.payload.value = this.computeValue(node.payload.gate, input1, input2);
  }

  private computeValue(gate: Gates | undefined, x: number, y?: number): number {
    if (!gate) return x;
    return gate === Gates.NOT ? ops[gate](x) : ops[gate](x, y!);
  }

  getNode(id: string) {
    if (this.nodes.has(id)) {
      return this.nodes.get(id)!;
    }
    const node = { id, payload: { value: undefined, gate: undefined } };
    this.nodes.set(id, node);
    return node;
  }
}

let opNodeIdCounter = 0;
function generateOpNodeId() {
  return `op${opNodeIdCounter++}`;
}

function ensureNode(term: string): string {
  if (Number.isInteger(Number(term))) {
    upsertNode(`#${term}`, undefined, uint16.to16(Number(term)));
    return `#${term}`;
  } else {
    upsertNode(term);
    return term;
  }
}

function upsertNode(id: string, gate?: Gates, value?: number) {
  if (!NODES.has(id)) {
    NODES.set(id, { id, payload: { value, gate } });
  } else {
    const node = NODES.get(id)!;
    if (value !== undefined) node.payload.value = value;
    if (gate !== undefined) node.payload.gate = gate;
  }
}

function addEdge(from: string, to: string) {
  const key = `${from}->${to}`;
  if (!EDGES.has(key)) {
    EDGES.set(key, { from, to });
  }
}

function handleDirectAssignment(term: string, rhsId: string) {
  if (Number.isInteger(Number(term))) {
    upsertNode(rhsId, undefined, uint16.to16(Number(term)));
  } else {
    const termId = ensureNode(term);
    upsertNode(rhsId);
    addEdge(termId, rhsId);
  }
}

function handleUnaryOperation(gate: string, arg: string, rhsId: string) {
  const opId = generateOpNodeId();
  const argId = ensureNode(arg);
  upsertNode(opId, gate as Gates);
  upsertNode(rhsId);
  addEdge(argId, opId);
  addEdge(opId, rhsId);
}

function handleBinaryOperation(
  left: string,
  gate: string,
  right: string,
  rhsId: string
) {
  const opId = generateOpNodeId();
  const leftId = ensureNode(left);
  const rightId = ensureNode(right);
  upsertNode(opId, gate as Gates);
  upsertNode(rhsId);
  addEdge(leftId, opId);
  addEdge(rightId, opId);
  addEdge(opId, rhsId);
}
function processDependencies(lhs: string, rhsId: string) {
  const terms = lhs.trim().split(/\s+/);
  switch (terms.length) {
    case 1:
      handleDirectAssignment(terms[0], rhsId);
      break;
    case 2:
      handleUnaryOperation(terms[0], terms[1], rhsId);
      break;
    case 3:
      handleBinaryOperation(terms[0], terms[1], terms[2], rhsId);
      break;
    default:
      throw new Error(`invalid dependency: ${lhs}`);
  }
}

function parseInput(rawInput: string) {
  const lines = rawInput.split("\n").map((l) => l.toLowerCase());
  lines.map(parseLine);
}

function parseLine(line: string) {
  const [lhs, rhs] = line.split("->").map((x) => x.trim());
  if (!rhs) return;
  processDependencies(lhs, rhs);
}

let part1Solution: number;
function solvePart1() {
  parseInput(input);
  const graph = new OperationGraph();
  graph.initialize(Array.from(NODES.values()), Array.from(EDGES.values()));
  graph.resolveGraph();
  part1Solution = graph.getNode("a").payload.value;
  console.log("Part 1 Solution: ", part1Solution);
}

function solvePart2() {
  NODES.clear();
  EDGES.clear();
  parseInput(input);
  const graph = new OperationGraph();
  graph.initialize(Array.from(NODES.values()), Array.from(EDGES.values()));
  const node = graph.getNode("b");
  node.payload.value = part1Solution;
  graph.resolveGraph();
  console.log("Part 2 Solution: ", graph.getNode("a").payload.value);
}

solvePart1();
solvePart2();
