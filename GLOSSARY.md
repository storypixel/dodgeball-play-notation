# Glossary — DBN (Dodgeball Notation)

Every DBN token and what it maps to. The authoritative spec is
[`NOTATION.md`](NOTATION.md) (synced from the canonical
[animator repo](https://github.com/storypixel/dodgeball-play-animator)); this is
the quick lookup.

## Court & coordinates

| Term | Meaning |
|------|---------|
| **file** | column `a`–`j`, left → right (10 columns). |
| **rank** | row `1`–`10`, bottom → top. Rank `1` = OUR back line, rank `10` = THEIR back line; center line sits between 5 and 6. |
| **square** | `file`+`rank`, e.g. `f6`. Maps to the engine's 0–100 space: `x=(fileIdx+0.5)*10`, `y=(10-rank+0.5)*10`. |
| **`(x,y)` escape** | raw 0–100 coords for off-grid precision, e.g. `U6-(54,68)`. |

## Pieces

| Token | Meaning |
|-------|---------|
| `U1`…`U10` | US players. `U1` = our far-left, `U10` = far-right. |
| `T1`…`T10` | THEM players. |
| `*` (suffix) | the player is **loaded** (holding a ball), e.g. `U1*`. |
| `bU` / `bT` / `bN` | a loose ball, owner = ours / theirs / neutral (on the line). |

## DBF — the setup string

One line, three `/`-separated groups; entries comma-separated.

```
DBF "U:<player><square>[*],…  /  T:…  /  B:<ballTag><square>,…"
```

| Group | Holds |
|-------|-------|
| `U:` | our players and their squares (`*` = loaded) — **required** |
| `T:` | their players — **required** |
| `B:` | loose balls (`bU`/`bT`/`bN` + square) — optional |

## Tags (metadata, before DBF)

| Tag | Maps to |
|-----|---------|
| `[Play "…"]` | play name |
| `[Id "…"]` | stable id (else slugified from name) |
| `[Badge "…"]` | category tag |
| `[Call "…"]` | the captain's call (escape inner quotes: `[Call "\"Kill left\""]`) |
| `[Desc "…"]` | description |

## Movetext — beats

```
<n>. {label} :dur  <action> <action> …
```

| Part | Meaning |
|------|---------|
| `<n>.` | beat number (a step in the animation) |
| `{label}` | optional caption shown under the court |
| `:dur` | optional duration in seconds (default `1.0`) |
| actions | space-separated; **simultaneous** within the beat |

Separate beats by newline or `;`.

## Action verbs

| Verb | Token | Meaning |
|------|-------|---------|
| run / move | `U3-f6` | player runs to a square |
| grab (nearest) | `U9*` | pick up the nearest loose ball → loaded |
| grab (specific) | `U9*bN h6` | pick up the named loose ball |
| run + grab | `U10-g6*` | move there and grab in one beat |
| pass | `U10>U6` | hand/toss to a teammate |
| throw | `U1@T3` | throw at an opponent |
| fake | `U3?` | pump-fake, no release |
| block | `T3#` | deflect an incoming throw with a held ball |
| catch | `T3^` | catch an incoming throw |
| dodge | `T3%` | evade an incoming throw |
| out | `T3X` | eliminated (not from a tracked throw) |
| return | `+U4` | a catch brings a teammate back in |

## Throw outcomes (suffix on the throw)

| Token | Result |
|-------|--------|
| `U1@T3!` | hit — T3 is out |
| `U1@T3^` | caught — **thrower U1 is out**, THEM returns one |
| `U1@T3%` | dodged — nobody out |
| `U1@T3#` | blocked — nobody out |
| `U6@T2!~-20` | append `~<deg>` for a curved arc (signed) |

Omit the outcome and the throw is treated as unresolved (arc only).
