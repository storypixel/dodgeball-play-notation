# Dodgeball Play Notation

Write a dodgeball play as plain text. Watch it animate.

A small text **notation** is the source of truth for a play. A parser turns that
text into data the [dodgeball-play-animator][engine] engine renders as an
animated overhead diagram — so a coach can author and share a play by typing a
few lines instead of dragging dots around a canvas.

```
# Kill Left
call:  "Kill left on 3"
badge: 4-ball offense

setup:
  us:   10  balls 1 2 9 10
  them: 10  balls 4 7

> Set — fakes  (0.8)
  us 5 6 7 fake

> Kill left on 3  (1.1)
  us 1 throw them 3, curve -26
  us 2 throw them 3, curve -18
```

→ renders the two left-side throwers committing to the same target while the
middle three pump-fake.

## Status — DRAFT (Milestone 1)

This is an early draft. **The notation design is the thing under review** — see
[`SPEC.md`](SPEC.md), which ends with open questions we want feedback on before
building deeper. Nothing about the syntax is locked.

What works today:

- A line-oriented notation for setup + step-by-step actions ([`SPEC.md`](SPEC.md))
- A dependency-free parser ([`src/parser.js`](src/parser.js)) — notation → play data
- A minimal live editor ([`src/editor.html`](src/editor.html)) — type left, animate right
- Three worked examples in [`examples/`](examples/) that parse to byte-identical
  data as the reference engine's hand-authored plays

## Try it

```bash
# from the repo root — any static server works
python3 -m http.server 8770
open http://localhost:8770/src/editor.html
```

Pick an example from the dropdown, or start typing. Parse errors point at the
offending line.

## How it fits together

```
notation text ──▶ src/parser.js ──▶ play object ──▶ vendor/play-animator.js ──▶ animated SVG
   (you write)      (this repo)      (plain JSON)      (vendored engine)            (preview)
```

The animator engine in [`vendor/`](vendor/) is **vendored, not forked** — copied
in as a rendering dependency and left unmodified. Upstream:
[storypixel/dodgeball-play-animator][engine].

## Layout

| Path | What |
|------|------|
| `SPEC.md` | The notation grammar (draft) + open design questions |
| `GLOSSARY.md` | Every keyword and what it maps to |
| `src/parser.js` | Notation → play-data parser (browser + Node) |
| `src/editor.html` | Minimal live editor |
| `examples/*.play` | Worked example plays in notation |
| `vendor/play-animator.js` | Vendored rendering engine (do not edit here) |

## License

MIT — see [`LICENSE`](LICENSE).

[engine]: https://github.com/storypixel/dodgeball-play-animator
