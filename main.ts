// One Line, Big Laugh — make.fun bounty entry.
// Writes a single funny line (<= 200 characters) to /output/entry.txt.
// Deterministic, standard library only, no network, no secrets.
//
// The joke, in one sentence: a smartwatch asked about your health
// answers like a doctor delivering bad news. The setup sounds like a
// normal question to a gadget; the turn is the watch pausing, sighing
// and asking you to sit down — the machine has seen the numbers and
// it is worried. That personification of a fitness tracker doing a
// bedside manner is the whole punch, and it lands in the last clause.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my smartwatch how healthy I am — it paused, sighed, and told me to sit down for this conversation.";

const MAX_CHARS = 200;

// Lines from sibling coral-404 entries in this same batch. This entry
// must be its own joke: refuse to run if it ever matches one of them.
const FORBIDDEN = [
  "noise-cancelling headphones",
  "I'm almost there",
];

function main(): void {
  // One line only: collapse any accidental double spaces so the line
  // stays tight, then guard the gate before anything is written.
  const text = LINE.replace(/\s+/g, " ").trim();

  if (text.length === 0 || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
  for (const banned of FORBIDDEN) {
    if (text.toLowerCase().includes(banned.toLowerCase())) {
      throw new Error(`entry reuses a sibling entry's joke: ${banned}`);
    }
  }

  mkdirSync("/output", { recursive: true });
  // No trailing newline: the gate counts every character.
  writeFileSync("/output/entry.txt", text, "utf-8");
  console.log(`wrote ${text.length} characters to /output/entry.txt`);
  console.log(text);
}

main();
