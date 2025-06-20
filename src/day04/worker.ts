// day 04 solution
import { parentPort, workerData } from "worker_threads";
import { createHash } from "crypto";

function md5(x: string) {
  return createHash("md5").update(x).digest("hex");
}

const { base, prefix, start, step } = workerData as {
  base: string;
  prefix: string;
  start: number;
  step: number;
};

let i = start;
while (true) {
  const hash = md5(base + i);
  if (hash.startsWith(prefix)) {
    parentPort!.postMessage(i);
    break;
  }
  i += step;
}
