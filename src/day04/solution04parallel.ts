// day 04 solution
import { readInput } from "../utils";
import { Worker } from "worker_threads";
import os from "os";
import path from "path";
import { once } from "events";

const input = readInput(path.resolve(__dirname, "input.txt"));

async function findIntegerParallel(input: string): Promise<number> {
  const cpus = os.cpus().length;
  const prefix = "0000000"; //  7 zeroes instead of 6 for a more difficult problem
  const workers: Worker[] = [];
  const tasks = Array.from({ length: cpus }, (_, i) => {
    const { promise, worker } = spawnWorker(input, prefix, i + 1, cpus);
    workers.push(worker);
    return promise;
  });
  const result = await Promise.race(tasks);
  workers.forEach((w) => w.terminate());
  return result;
}

function spawnWorker(
  base: string,
  prefix: string,
  start: number,
  step: number
): { promise: Promise<number>; worker: Worker } {
  const worker = new Worker(path.resolve(__dirname, "worker.js"), {
    workerData: { base, prefix, start, step },
  });

  const promise = once(worker, "message").then(([n]) => n as number);

  return { promise, worker };
}

async function solveParallel() {
  console.time("Parallel Solution");
  const integer = await findIntegerParallel(input);
  console.log("Parallel Solution: ", integer);
  console.timeEnd("Parallel Solution");
}

(async () => {
  await solveParallel();
})();
