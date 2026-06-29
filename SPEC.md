# Dodgeball Play Notation — SPEC (DRAFT v0.1)

> **This is a draft for review.** The notation is the highest-leverage decision in
> this project, so it is meant to be reacted to and iterated on. Nothing here is
> final. Comments / "I'd rather write it like X" are exactly what we want.

A **play** is written as plain text. That text is the source of truth: a parser
turns it into the JSON play object that the
[dodgeball-play-animator](https://github.com/storypixel/dodgeball-play-animator)
engine renders as an animated overhead diagram.

The design goal: **a coach can write a play the way they'd describe it out loud**,
top to bottom, beat by beat.

---

## 1. The court (so the numbers mean something)

Same model as the animator, chess-diagram style:

```
        THEM  (their back line)
   1   2   3   4   5   6   7   8   9   10        <- players, 1 = far LEFT
  ───────────────────────────────────────       y = 0   (their back line)
                                                 y = 50  (center line)
  ───────────────────────────────────────       y = 100 (our back line)
   1   2   3   4   5   6   7   8   9   10
         US  (our back line)
```

- **Players** are numbered **1 = far left … 10 = far right**, per side.
- You refer to a player as `us 3` or `them 7`.
- **Coordinates** (only needed when you place something precisely): `x,y` where
  `x` is `0`(left)…`100`(right) and `y` is `0`(their line)…`50`(center)…`100`(our line).

---

## 2. Anatomy of a play

```
# <Play Name>
call:  "<what the captain yells>"     (optional)
badge: <short tag, e.g. 4-ball offense>   (optional)
desc:  <one or two sentences>             (optional)

setup:
  <side lines + any loose balls>

> <Step label>  (<seconds>)
  <actions for this beat>

> <next step label>  (<seconds>)
  <actions>
```

- `#` line = the play name. Required, first non-blank line.
- `call:` / `badge:` / `desc:` = metadata. Optional, any order, before `setup:`.
- `setup:` block = where everyone starts.
- `> ` lines = **steps** (beats), in order. Each has a label and a duration in
  seconds in parentheses. The actions indented under a step all happen during
  that beat.

Blank lines are ignored. `//` starts a comment to end of line.

---

## 3. Setup

Inside the `setup:` block:

### Place a line of players
```
us:   10                 # 10 players, auto-spread across our width, no balls
them: 10                 # 10 players, auto-spread, no balls
us:   10  balls 1 2 9 10 # those player numbers start holding a ball
```
- `<side>: <count>` spreads `count` players evenly (1 = far left).
- `balls <n> <n> …` marks which of those players hold a ball at the start.

### Loose balls on the floor (e.g. on the center line)
```
ball uR1 at 80,50 us     # an id, a position x,y, and who owns it (us | them)
ball tL1 at 4,50  them
```
Loose balls are referenced later by their **id** (`uR1`) in a `grab`.

*(Custom per-player positions are a planned v0.2 addition — `us 4 at 30,82`.
For v0.1, `<side>: <count>` auto-spread + loose balls covers every reference
play. Flag if you need manual placement now.)*

---

## 4. Steps & actions

A step is one beat of the animation:

```
> Kill left on 3  (1.1)
  us 1 throw them 3, curve -26
  us 2 throw them 3, curve -18
```

`> <label>  (<seconds>)` — label is free text; the `(1.1)` is the beat length.

Each indented line is **one actor doing one or more things**, starting with the
actor (`us N` / `them N`). Multiple actions for the same actor are separated by
commas on the same line. The verbs:

| Verb | Form | Meaning | Engine field |
|------|------|---------|--------------|
| `throw`  | `us 1 throw them 3` | throw at an opponent | `throws` |
| `throw … curve` | `us 1 throw them 3, curve -26` | curved throw; `curve` is the side-arc (negative = arcs one way) | `throws[].curve` |
| `pass`   | `us 10 pass us 6` | pass a ball to a teammate | `passes` |
| `move`   | `us 6 move 54,68` | move to a coordinate | `moves[].to` |
| `move`   | `us 6 move rush` | move straight up to the center line (keeps current x) | `moves` (semantic) |
| `fake`   | `us 5 fake` | pump-fake (freeze defenders) | `fakes` |
| `grab`   | `us 10 grab uR2 uR3` | pick up loose ball(s) by id | `grabs` |

You can chain on one line:
```
us 10 move 92,54, grab uR2 uR3
```

> **Multiple players, same action** (sugar): `us 5 6 7 fake` expands to a fake
> for each of 5, 6, 7. Same for `throw`/`move` where it reads naturally.

---

## 5. Full worked example — "Kill Left"

```
# Kill Left
call:  "Kill left on 3"
badge: 4-ball offense
desc:  The two left-side throwers commit to the same target — the 3rd from the
       left. Non-throwers pump-fake to freeze the rest.

setup:
  us:   10  balls 1 2 9 10   // left two throw, right two hold
  them: 10  balls 4 7        // they hold the other two

> Set — fakes  (0.8)
  us 5 6 7 fake

> Kill left on 3  (1.1)
  us 1 throw them 3, curve -26
  us 2 throw them 3, curve -18
```

This parses to the exact `kill-left` object the animator already renders.

---

## 6. Grammar (EBNF sketch, v0.1)

```ebnf
play        = nameLine , { metaLine } , setupBlock , { stepBlock } ;
nameLine    = "#" , text , NL ;
metaLine    = ("call:" | "badge:" | "desc:") , text , NL ;

setupBlock  = "setup:" , NL , { sideLine | ballLine } ;
sideLine    = side , ":" , int , [ "balls" , { int } ] , NL ;
ballLine    = "ball" , id , "at" , coord , side , NL ;

stepBlock   = ">" , label , "(" , number , ")" , NL , { actionLine } ;
actionLine  = actor , action , { "," , action } , NL ;
actor       = side , int , { int } ;          (* one or more player numbers *)
action      = throw | pass | move | fake | grab ;
throw       = "throw" , side , int , [ "," , "curve" , number ] ;
pass        = "pass"  , side , int ;
move        = "move"  , (coord | "rush") ;
fake        = "fake" ;
grab        = "grab"  , { id } ;

side        = "us" | "them" ;
coord       = int , "," , int ;
id          = identifier ;
```

---

## 7. Open design questions (please weigh in)

1. **Coordinates vs words.** v0.1 uses raw `x,y` for `move`. Coaches don't think
   in 0–100. Options to layer on: named zones (`move to center-left`), or
   relative (`move up 20`), or anchor to a player (`move toward them 3`).
   Which feels most natural?
2. **Throw arc.** `curve -26` exposes the engine's number. Friendlier:
   `arc left` / `arc hard-left`, or drop it (auto-arc). Preference?
3. **Step duration.** Required `(1.1)` per step, or default it and only specify
   when you want to override?
4. **Ball ownership shorthand** for the opening-rush family (our balls right,
   their balls left) — worth a one-liner like `centerline 3+3`?
5. **Symbols vs words.** Everything here is words. Do you want any single-char
   symbols (e.g. `1>3` for "us 1 throws at them 3")? Words are more readable;
   symbols are faster to type. Lean which way?

---

*Draft authored for review. Once the notation shape is agreed, the parser +
editor + glossary + examples are mechanical. — acid-burn*
