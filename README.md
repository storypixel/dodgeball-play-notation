# DBN Editor — Dodgeball Play Notation

Write a dodgeball play in **DBN** (Dodgeball Notation) and watch it animate.
Deep-linkable, and built to be driven by an agent with zero human clicking.

**▶ Live editor: https://iamnotsam.com/dodgeball-play-notation/**

```
[Play "Kill Left"]
[Call "\"Kill left on 3\""]
DBF "U:1(14,90)*,2(22,90)*,3(30,90),...,9(78,90)*,10(86,90)* / T:1(14,10),...,4(38,10)*,...,7(62,10)*,..."

1. {Set — fakes} :0.8  U5? U6? U7?
2. {Kill left on 3} :1.1  U1@T3!~-26 U2@T3!~-18
```

→ the two left-side throwers commit to the same target while three players pump-fake.

## What this is

DBN is a compact, chess/PGN-style notation for a dodgeball play: a one-line
**DBF** setup string + numbered **movetext** beats. It compiles to the JSON the
[dodgeball-play-animator][engine] renders. This repo is the **standalone
editor** on top of canonical DBN — it does not define the notation.

- **DBN is canonical.** The spec ([`NOTATION.md`](NOTATION.md)) and parser
  ([`vendor/dbn.js`](vendor/dbn.js)) are **vendored, not forked**, from the
  [animator repo][engine]. Notation changes go there first, then re-vendor here.
- **The editor only drives the parser + engine** — it can never diverge from DBN.

## Agent-drivable (the point)

An agent can run this editor headlessly, three ways:

1. **Deep link** — open the editor with the play in the URL, it renders on load:
   `…/?dbn=<url-encoded-DBN>` or `…/?play=kill-left` (plus `?autoplay=1`).
2. **Window API** — `window.DBNEditor.{load, render, exportSVG, exportJSON, getErrors, getPlay, getText, isReady}`, callable via `evaluate_script`.
3. **Pure-Node headless** — no DOM at all: `require("./src/dbn-headless.js")` →
   `parse(text)`, `toJSON(text)`, `toSetupSVG(text)` for CI / agents.

See **[DRIVING.md](DRIVING.md)** for copy-paste examples (30 seconds to drive it).

Every control also carries a stable `data-testid` + ARIA label for browser
automation: `dbn-input`, `render-button`, `example-select`, `status`,
`error-panel`, `preview-stage`.

## Try it locally

```bash
python3 -m http.server 8770
open http://localhost:8770/index.html
node tests/parse.test.js     # parity + headless smoke tests
```

## Layout

| Path | What |
|------|------|
| `index.html` | the editor (served at the Pages root URL) |
| `src/editor.js` | UI wiring + the `window.DBNEditor` automation API |
| `src/dbn-headless.js` | pure-Node: DBN → play JSON + static setup SVG |
| `vendor/dbn.js` | **canonical** DBN parser (vendored, do not edit) |
| `vendor/play-animator.js` | **canonical** render engine (vendored, do not edit) |
| `NOTATION.md` | the DBN spec (synced from the animator repo) |
| `GLOSSARY.md` | every DBN token and what it means |
| `DRIVING.md` | driving the editor programmatically |
| `examples/*.dbn` | worked plays — each parses byte-identical to the engine's goldens |
| `tests/` | parity test + golden `plays.js` fixture |

## Notation, in one screen

- **Court**: files `a`–`j` left→right, ranks `1`–`10` bottom→top (rank 1 = our
  back line). `(x,y)` escapes give raw 0–100 coords when you need off-grid.
- **Pieces**: `U1`…`U10` (us), `T1`…`T10` (them), `*` = holding a ball.
- **DBF**: `U:… / T:… / B:…` — both teams and loose balls in one line.
- **Beats**: `1. {label} :dur  <actions>` — actions in a beat are simultaneous.
- **Actions**: run `U3-f6`, grab `U9*`, pass `U10>U6`, throw `U1@T3!` (`~-20`
  for arc), fake `U3?`, plus block/catch/dodge/out.

Full reference: [`NOTATION.md`](NOTATION.md) · [`GLOSSARY.md`](GLOSSARY.md).

## License

MIT — see [`LICENSE`](LICENSE).

[engine]: https://github.com/storypixel/dodgeball-play-animator
