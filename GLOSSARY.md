# Glossary — Dodgeball Play Notation

Every keyword in the notation and what it compiles to. See [`SPEC.md`](SPEC.md)
for the full grammar. This is a DRAFT — names may change.

## Court & coordinates

| Term | Meaning |
|------|---------|
| **us** / **them** | the two teams. `us` is the bottom half of the diagram, `them` the top. |
| **seat / player number** | `1` = far left … `N` = far right, per team. `us 3` = our 3rd-from-left. |
| **x** | court width, `0` (left) … `100` (right). |
| **y** | court depth, `0` (their back line) … `50` (center line) … `100` (our back line). |
| **coord** | `x,y` — e.g. `54,68`. Only needed for an explicit `move`. |

## Structure

| Token | Meaning | Engine field |
|-------|---------|--------------|
| `# Name` | play name (first line, required) | `name`, `id` |
| `call: "…"` | what the captain yells | `call` |
| `badge: …` | short category tag | `badge` |
| `desc: …` | one- or two-sentence description | `desc` |
| `setup:` | begins the starting-position block | `setup` |
| `> Label (1.1)` | a step/beat with a label and duration in seconds | `steps[]`, `.label`, `.dur` |
| `//` | comment to end of line | — |

## Setup statements

| Statement | Meaning | Engine field |
|-----------|---------|--------------|
| `us: N` / `them: N` | place N players, evenly spread (1 = far left) | `setup.us` / `setup.them` |
| `… balls a b c` | those seat numbers start holding a ball | `{...,ball:true}` |
| `ball <id> at x,y <side>` | a loose ball on the floor, owned by a side | `setup.balls[]` |

## Action verbs (inside a step)

Each action line starts with an actor (`us N` or `them N`; multiple seats like
`us 5 6 7` apply the action to each).

| Verb | Form | Meaning | Engine field |
|------|------|---------|--------------|
| `throw` | `us 1 throw them 3` | throw at an opponent (out) | `throws[]` |
| `curve` | `… throw them 3, curve -26` | side-arc on the preceding throw (sign = direction) | `throws[].curve` |
| `pass` | `us 10 pass us 6` | hand/toss a ball to a teammate | `passes[]` |
| `move` | `us 6 move 54,68` | glide to a coordinate by step's end | `moves[].to` |
| `move … rush` | `us 9 move rush` | move straight up to the center line, keeping current x | `moves[]` |
| `fake` | `us 5 fake` | pump-fake (freeze defenders) | `fakes[]` |
| `grab` | `us 10 grab uR2 uR3` | pick up loose ball(s) by id | `grabs[]` |

Chain actions for one actor with commas on a single line:
`us 10 move 92,54, grab uR2 uR3`.
