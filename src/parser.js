/* Dodgeball Play Notation — parser (DRAFT v0.1)
 *
 * parsePlay(notationText) -> play object consumed verbatim by the
 * dodgeball-play-animator engine (vendor/play-animator.js).
 *
 * On a malformed play it throws a ParseError carrying the 1-based line number
 * and a human message, so the editor can point at the offending line.
 *
 * No dependencies. Works in the browser (window.DodgeballNotation) and Node
 * (module.exports). See SPEC.md for the notation grammar.
 */
(function (global) {
  "use strict";

  // ── court geometry, identical to the engine's plays.js row() helper ──
  const ROW_L = 14, ROW_R = 86;   // left / right margins for an even spread
  const US_BACK = 90, THEM_BACK = 10;

  // even spread of n players across court width; balls = list of 1-based seats
  function row(n, y, balls) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const x = n === 1 ? 50 : ROW_L + (i * (ROW_R - ROW_L)) / (n - 1);
      out.push({ n: i + 1, x: Math.round(x), y, ball: !!(balls && balls.includes(i + 1)) });
    }
    return out;
  }

  function ParseError(line, message) {
    const e = new Error("line " + line + ": " + message);
    e.name = "ParseError";
    e.line = line;
    return e;
  }

  // strip a `//` comment (not inside quotes) and trailing whitespace
  function decomment(raw) {
    let inStr = false;
    for (let i = 0; i < raw.length - 1; i++) {
      if (raw[i] === '"') inStr = !inStr;
      if (!inStr && raw[i] === "/" && raw[i + 1] === "/") return raw.slice(0, i);
    }
    return raw;
  }

  const SIDES = { us: "us", them: "them" };
  const VERBS = { throw: 1, pass: 1, move: 1, fake: 1, grab: 1, curve: 1 };

  function isInt(t) { return /^-?\d+$/.test(t); }

  // tokenise an action/setup line: commas become separators, quotes survive
  function tokenize(line) {
    return line.replace(/,/g, " ").trim().split(/\s+/).filter(Boolean);
  }

  function parsePlay(text) {
    if (typeof text !== "string") throw ParseError(0, "notation must be a string");
    const rawLines = text.split(/\r?\n/);

    const play = { id: "", name: "", setup: { us: [], them: [] }, steps: [] };
    let looseBalls = [];
    let usCount = null, themCount = null;
    let usBalls = [], themBalls = [];
    let section = "head";        // head -> setup -> steps
    let curStep = null;

    // resolved seat -> setup position, for `move rush`
    const seatX = { us: {}, them: {} };

    function finishSetup() {
      if (usCount == null && themCount == null) return;
      play.setup.us = usCount != null ? row(usCount, US_BACK, usBalls) : [];
      play.setup.them = themCount != null ? row(themCount, THEM_BACK, themBalls) : [];
      play.setup.us.forEach((p) => (seatX.us[p.n] = p.x));
      play.setup.them.forEach((p) => (seatX.them[p.n] = p.x));
      if (looseBalls.length) play.setup.balls = looseBalls;
    }

    for (let i = 0; i < rawLines.length; i++) {
      const lineNo = i + 1;
      const line = decomment(rawLines[i]).replace(/\s+$/, "");
      const trimmed = line.trim();
      if (!trimmed) continue;

      // ── name ──
      if (trimmed.startsWith("#")) {
        if (play.name) throw ParseError(lineNo, "duplicate name line (only one '#' allowed)");
        play.name = trimmed.replace(/^#+\s*/, "").trim();
        play.id = play.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        continue;
      }
      if (!play.name) throw ParseError(lineNo, "play must start with a '# Name' line");

      // ── metadata ──
      const meta = trimmed.match(/^(call|badge|desc)\s*:\s*(.*)$/i);
      if (meta && section === "head") {
        let v = meta[2].trim();
        const key = meta[1].toLowerCase();
        if (key === "call") { if (!/^".*"$/.test(v)) v = '"' + v.replace(/^"|"$/g, "") + '"'; }
        else v = v.replace(/^"|"$/g, "");
        play[key] = v;
        continue;
      }

      // ── setup: header ──
      if (/^setup\s*:$/i.test(trimmed)) {
        if (section !== "head") throw ParseError(lineNo, "unexpected second 'setup:' block");
        section = "setup";
        continue;
      }

      // ── step header ──
      if (trimmed.startsWith(">")) {
        if (section === "head") throw ParseError(lineNo, "a 'setup:' block must come before steps");
        if (section === "setup") { finishSetup(); section = "steps"; }
        const m = trimmed.match(/^>\s*(.*?)\s*(?:\(\s*([0-9]*\.?[0-9]+)\s*\))?\s*$/);
        const label = (m && m[1] ? m[1] : "").trim();
        const dur = m && m[2] ? parseFloat(m[2]) : 1.0;
        curStep = { label, dur };
        play.steps.push(curStep);
        continue;
      }

      // ── setup body lines ──
      if (section === "setup") {
        const tok = tokenize(trimmed);
        if (tok[0] === "ball") {
          // ball <id> at <x> <y> <side>
          if (tok[1] === undefined || tok[2] !== "at" || !isInt(tok[3]) || !isInt(tok[4]) || !SIDES[tok[5]])
            throw ParseError(lineNo, "expected: ball <id> at <x>,<y> <us|them>");
          looseBalls.push({ id: tok[1], x: parseInt(tok[3], 10), y: parseInt(tok[4], 10), side: SIDES[tok[5]] });
          continue;
        }
        const sideM = trimmed.match(/^(us|them)\s*:\s*(\d+)\s*(?:balls\s+(.*))?$/i);
        if (!sideM) throw ParseError(lineNo, "expected 'us: N [balls ...]', 'them: N [...]', or 'ball <id> at x,y side'");
        const side = sideM[1].toLowerCase();
        const count = parseInt(sideM[2], 10);
        const balls = sideM[3] ? sideM[3].trim().split(/\s+/).map((n) => parseInt(n, 10)) : [];
        if (side === "us") { usCount = count; usBalls = balls; }
        else { themCount = count; themBalls = balls; }
        continue;
      }

      // ── step action lines ──
      if (section === "steps") {
        if (!curStep) throw ParseError(lineNo, "action outside of any step");
        parseAction(trimmed, lineNo, curStep, seatX);
        continue;
      }

      throw ParseError(lineNo, "unexpected line: " + trimmed);
    }

    if (section === "setup") finishSetup();
    if (!play.name) throw ParseError(0, "empty play (no '# Name')");
    if (play.steps.length === 0) throw ParseError(0, "play has no steps (add a '> Label (dur)' line)");

    return play;
  }

  // parse one indented action line into the current step's arrays
  function parseAction(line, lineNo, step, seatX) {
    const tok = tokenize(line);
    let i = 0;
    const side = SIDES[tok[i]];
    if (!side) throw ParseError(lineNo, "action must start with 'us' or 'them' (got '" + tok[0] + "')");
    i++;

    // one or more player seat numbers, up to the first verb
    const seats = [];
    while (i < tok.length && isInt(tok[i])) { seats.push(parseInt(tok[i], 10)); i++; }
    if (seats.length === 0) throw ParseError(lineNo, "expected a player number after '" + side + "'");

    const add = (key, obj) => { (step[key] = step[key] || []).push(obj); };
    let lastThrow = null;

    while (i < tok.length) {
      const verb = tok[i];
      if (!VERBS[verb]) throw ParseError(lineNo, "unknown action '" + verb + "' (expected throw/pass/move/fake/grab)");
      i++;
      if (verb === "fake") {
        seats.forEach((n) => add("fakes", { team: side, n }));
        lastThrow = null;
      } else if (verb === "throw") {
        const tSide = SIDES[tok[i]];
        if (!tSide || !isInt(tok[i + 1])) throw ParseError(lineNo, "throw needs a target: 'throw <us|them> <n>'");
        const tN = parseInt(tok[i + 1], 10); i += 2;
        seats.forEach((n) => {
          const t = { from: { team: side, n }, to: { team: tSide, n: tN } };
          add("throws", t);
          lastThrow = t;
        });
      } else if (verb === "curve") {
        if (!lastThrow) throw ParseError(lineNo, "'curve' must follow a 'throw'");
        if (!isInt(tok[i])) throw ParseError(lineNo, "curve needs a number, e.g. 'curve -22'");
        lastThrow.curve = parseInt(tok[i], 10); i += 1;
      } else if (verb === "pass") {
        const tSide = SIDES[tok[i]];
        if (!tSide || !isInt(tok[i + 1])) throw ParseError(lineNo, "pass needs a target: 'pass <us|them> <n>'");
        const tN = parseInt(tok[i + 1], 10); i += 2;
        seats.forEach((n) => add("passes", { from: { team: side, n }, to: { team: tSide, n: tN } }));
        lastThrow = null;
      } else if (verb === "grab") {
        const ids = [];
        while (i < tok.length && !VERBS[tok[i]]) { ids.push(tok[i]); i++; }
        if (ids.length === 0) throw ParseError(lineNo, "grab needs at least one ball id");
        seats.forEach((n) => add("grabs", { team: side, n, balls: ids.slice() }));
        lastThrow = null;
      } else if (verb === "move") {
        let to;
        if (tok[i] === "rush") {
          i += 1;
          // straight up to just past center, keeping setup x
          seats.forEach((n) => add("moves", { team: side, n, to: [seatX[side][n] != null ? seatX[side][n] : 50, side === "us" ? 54 : 46] }));
          lastThrow = null;
          continue;
        }
        if (!isInt(tok[i]) || !isInt(tok[i + 1])) throw ParseError(lineNo, "move needs 'x,y' or 'rush'");
        to = [parseInt(tok[i], 10), parseInt(tok[i + 1], 10)]; i += 2;
        seats.forEach((n) => add("moves", { team: side, n, to: to.slice() }));
        lastThrow = null;
      }
    }
  }

  const api = { parsePlay, ParseError, row };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (global) global.DodgeballNotation = api;
})(typeof window !== "undefined" ? window : this);
