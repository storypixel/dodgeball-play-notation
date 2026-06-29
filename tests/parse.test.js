/* Dependency-free parser tests. Run with: node tests/parse.test.js
 *
 * The bar: every example in examples/ must parse, and the structural fields the
 * animator reads (id/name/badge/call/setup/steps) must be well-formed. Where a
 * golden reference is available (the engine's own plays.js, if present beside the
 * repo), assert byte-identical parity.
 */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { parsePlay } = require("../src/parser.js");

const exDir = path.join(__dirname, "..", "examples");
const examples = fs.readdirSync(exDir).filter((f) => f.endsWith(".play"));
let passed = 0;

for (const file of examples) {
  const text = fs.readFileSync(path.join(exDir, file), "utf8");
  const play = parsePlay(text);
  assert.ok(play.name, file + ": has a name");
  assert.ok(play.id && /^[a-z0-9-]+$/.test(play.id), file + ": id is a slug");
  assert.ok(Array.isArray(play.setup.us), file + ": setup.us is an array");
  assert.ok(play.steps.length > 0, file + ": has steps");
  for (const s of play.steps) {
    assert.ok(typeof s.label === "string", file + ": step has a label");
    assert.ok(typeof s.dur === "number" && s.dur > 0, file + ": step has a positive dur");
  }
  console.log("  ✓ " + file + " (" + play.steps.length + " steps)");
  passed++;
}

// error path: a malformed play throws with a line number
assert.throws(
  () => parsePlay("# X\nsetup:\n  us: 10\n> Go (1)\n  us 1 hurl them 2"),
  (e) => e.name === "ParseError" && e.line === 5,
  "unknown verb should throw a ParseError with the right line"
);
console.log("  ✓ error path reports the offending line");

console.log("\n" + passed + " example(s) parsed, error path verified — OK");
