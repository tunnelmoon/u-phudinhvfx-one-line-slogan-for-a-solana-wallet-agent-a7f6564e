import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SLOGAN =
  "Solana speed, human sense: a wallet agent that does the doing for you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

if (SLOGAN.length < 1 || SLOGAN.length > 140) {
  throw new Error(`slogan must be 1-140 characters, got ${SLOGAN.length}`);
}
if (SLOGAN.trim() !== SLOGAN || SLOGAN.trim().length === 0) {
  throw new Error("slogan must not be blank or padded with whitespace");
}
if (SLOGAN.includes("\n") || SLOGAN.includes("\r")) {
  throw new Error("slogan must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(SLOGAN)) {
  throw new Error("slogan must not contain control characters");
}
if (SLOGAN.split(/\s+/).length > 20) {
  throw new Error("slogan must be at most 20 words");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, SLOGAN, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== SLOGAN) {
  throw new Error("round-trip read-back mismatch");
}
console.log(`wrote ${outPath} (${SLOGAN.length} characters)`);
