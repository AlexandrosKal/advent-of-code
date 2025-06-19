// no explicit imports needed

function pad(num: string) {
  return num.padStart(2, "0");
}

async function main() {
  const dayArg = process.argv[2] || "01";
  const day = pad(dayArg);
  try {
    const module = await import(`./day${day}/solution${day}.ts`);
    if (typeof module.default === "function") {
      await module.default();
    }
  } catch (err) {
    console.error(`unable to load solution for day ${day}:`, err);
  }
}

main();
