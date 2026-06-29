# Contributing

This project is in an early **draft** phase. The most valuable contribution right
now is feedback on the **notation design itself** — see the open questions at the
end of [`SPEC.md`](SPEC.md). If a line of notation doesn't read the way you'd say
the play out loud, that's a bug worth filing.

## Repo conventions

- **No build step, no runtime dependencies.** The parser is plain JS that runs in
  both the browser and Node. Keep it that way unless there's a strong reason.
- **The engine in `vendor/` is vendored, not forked.** Don't edit
  `vendor/play-animator.js`. If the renderer needs changes, they belong upstream
  in [storypixel/dodgeball-play-animator][engine]; re-vendor afterward.
- **Examples must round-trip.** Every `.play` in `examples/` should parse without
  error and render in the editor.

## Adding an example play

1. Write `examples/<name>.play` following [`SPEC.md`](SPEC.md).
2. Add it to the dropdown in `src/editor.html`.
3. Load it in the editor and confirm it parses and animates.

## Running locally

```bash
python3 -m http.server 8770
open http://localhost:8770/src/editor.html
```

To sanity-check the parser headlessly:

```bash
node -e 'const {parsePlay}=require("./src/parser.js");
  console.log(JSON.stringify(parsePlay(require("fs").readFileSync("examples/kill-left.play","utf8")),null,2))'
```

[engine]: https://github.com/storypixel/dodgeball-play-animator
