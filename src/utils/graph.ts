export type GraphNode = {
  id: string;
  payload: any;
};

export type Edge = {
  from: string;
  to: string;
  weight?: number;
};

export default class DirectedGraph {
  protected nodes: Map<string, GraphNode>;
  protected edges: Map<string, Edge>;
  protected adjacencyList: Map<string, { node: GraphNode; weight?: number }[]>;

  constructor() {
    this.adjacencyList = new Map<
      string,
      { node: GraphNode; weight: number }[]
    >();
    this.nodes = new Map<string, GraphNode>();
    this.edges = new Map<string, Edge>();
  }

  initialize(nodes: GraphNode[], edges: Edge[]) {
    for (const n of nodes) {
      this.nodes.set(n.id, n);
    }
    for (const edge of edges) {
      this.edges.set(`${edge.from}->${edge.to}`, edge);
      this.updateAdjacencyList(edge);
    }
  }

  updateAdjacencyList(edge: Edge) {
    if (!this.nodes.size) throw new Error("No nodes in this graph");
    this.validateEdge(edge);
    const { from, to, weight } = edge;
    const adjacencyListElement = this.adjacencyList.get(from);
    if (adjacencyListElement) {
      adjacencyListElement.push({ node: this.nodes.get(to)!, weight });
    } else {
      this.adjacencyList.set(from, [{ node: this.nodes.get(to)!, weight }]);
    }
  }

  private validateEdge(edge: Edge) {
    const { from, to } = edge;
    if (!this.nodes.has(from)) {
      throw new Error(`Node with id '${from}' does not exist.`);
    }
    if (!this.nodes.has(to)) {
      throw new Error(`Node with id '${to}' does not exist.`);
    }
  }

  getNeighboursAndWeights(nodeId: string) {
    return this.adjacencyList.get(nodeId);
  }

  dfs(startId: string) {
    const visited = new Set<string>();
    const stack = new Array<string>();
    this.addNeighboursToStack(startId, stack, visited);
    while (stack.length) {
      const currId = stack.pop()!;
      this.addNeighboursToStack(currId, stack, visited);
      visited.add(currId);
    }
    return visited;
  }

  bfs(startId: string) {
    const visited = new Set<string>();
    const queue = new Array<string>();
    queue.push(startId);
    while (queue.length) {
      const currId = queue.shift()!;
      this.addNeighboursToQueue(currId, queue, visited);
      visited.add(currId);
    }
    return visited;
  }

  private addNeighboursToQueue(
    nodeId: string,
    queue: Array<string>,
    visited: Set<string>
  ) {
    this.getNeighboursAndWeights(nodeId)!.forEach((n) => {
      if (!visited.has(n.node.id)) queue.push(n.node.id);
    });
  }

  private addNeighboursToStack(
    nodeId: string,
    stack: Array<string>,
    visited: Set<string>
  ) {
    this.getNeighboursAndWeights(nodeId)!.forEach((n) => {
      if (!visited.has(n.node.id)) stack.push(n.node.id);
    });
  }
}
