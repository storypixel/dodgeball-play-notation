/* GOLDEN FIXTURE (8-a-side) — snapshot of the parser output for the example
 * plays. Regenerated intentionally; the parity test compares parser output to
 * this so behavioral regressions are caught. Regenerate with tests/gen-golden.js. */
(function(g){ g.DB_PLAYS = {
  "pitch-back": {
    "id": "pitch-back",
    "name": "Pitch Back",
    "badge": "opening rush",
    "call": "\"Pitch back\"",
    "desc": "Six balls on the line — the right three are OURS, the left three are THEIRS. The two right players rush and grab our three (one grabs two, one grabs one), then pitch one back to an attacker who steps up to mid-court and picks off a backpedaling rusher.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": false
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": false
        }
      ],
      "balls": [
        {
          "id": "uR1",
          "x": 80,
          "y": 50,
          "side": "us"
        },
        {
          "id": "uR2",
          "x": 88,
          "y": 50,
          "side": "us"
        },
        {
          "id": "uR3",
          "x": 96,
          "y": 50,
          "side": "us"
        },
        {
          "id": "tL1",
          "x": 4,
          "y": 50,
          "side": "them"
        },
        {
          "id": "tL2",
          "x": 12,
          "y": 50,
          "side": "them"
        },
        {
          "id": "tL3",
          "x": 20,
          "y": 50,
          "side": "them"
        }
      ]
    },
    "steps": [
      {
        "label": "Rush — the two on the right grab our three (2 + 1)",
        "dur": 1.3,
        "moves": [
          {
            "team": "us",
            "n": 8,
            "to": [
              92,
              54
            ]
          },
          {
            "team": "us",
            "n": 7,
            "to": [
              80,
              54
            ]
          },
          {
            "team": "them",
            "n": 1,
            "to": [
              8,
              46
            ]
          },
          {
            "team": "them",
            "n": 2,
            "to": [
              20,
              46
            ]
          }
        ],
        "grabs": [
          {
            "team": "us",
            "n": 8,
            "balls": [
              "uR2",
              "uR3"
            ]
          },
          {
            "team": "us",
            "n": 7,
            "balls": [
              "uR1"
            ]
          },
          {
            "team": "them",
            "n": 1,
            "balls": [
              "tL1",
              "tL2"
            ]
          },
          {
            "team": "them",
            "n": 2,
            "balls": [
              "tL3"
            ]
          }
        ]
      },
      {
        "label": "Pitch back — attacker steps up",
        "dur": 0.9,
        "moves": [
          {
            "team": "us",
            "n": 5,
            "to": [
              55,
              68
            ]
          },
          {
            "team": "them",
            "n": 1,
            "to": [
              10,
              30
            ]
          },
          {
            "team": "them",
            "n": 2,
            "to": [
              22,
              30
            ]
          }
        ],
        "passes": [
          {
            "from": {
              "team": "us",
              "n": 8
            },
            "to": {
              "team": "us",
              "n": 5
            }
          }
        ]
      },
      {
        "label": "Free look — hit a regressing rusher",
        "dur": 1,
        "moves": [
          {
            "team": "them",
            "n": 1,
            "to": [
              12,
              20
            ]
          },
          {
            "team": "them",
            "n": 2,
            "to": [
              24,
              20
            ]
          }
        ],
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 5
            },
            "to": {
              "team": "them",
              "n": 2
            },
            "curve": -20
          }
        ]
      }
    ]
  },
  "kill-left": {
    "id": "kill-left",
    "name": "Kill Left",
    "badge": "4-ball offense",
    "call": "\"Kill left on 3\"",
    "desc": "The two left-side throwers commit to the same target — the 3rd player from the left on the other team. Non-throwers pump-fake to freeze the rest.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": true
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": false
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "Set — fakes",
        "dur": 0.8,
        "fakes": [
          {
            "team": "us",
            "n": 4
          },
          {
            "team": "us",
            "n": 5
          },
          {
            "team": "us",
            "n": 6
          }
        ]
      },
      {
        "label": "Kill left on 3",
        "dur": 1.1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 1
            },
            "to": {
              "team": "them",
              "n": 3
            },
            "curve": -26
          },
          {
            "from": {
              "team": "us",
              "n": 2
            },
            "to": {
              "team": "them",
              "n": 3
            },
            "curve": -18
          }
        ]
      }
    ]
  },
  "insides": {
    "id": "insides",
    "name": "Insides",
    "badge": "4-ball offense",
    "call": "\"Insides on 5\"",
    "desc": "The two middle players pick one target — here the 5th from the left. Hits from the center are hard to read until the ball is already gone.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": true
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": false
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "Set — corners fake",
        "dur": 0.8,
        "fakes": [
          {
            "team": "us",
            "n": 1
          },
          {
            "team": "us",
            "n": 8
          }
        ]
      },
      {
        "label": "Insides on 5",
        "dur": 1.1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 4
            },
            "to": {
              "team": "them",
              "n": 5
            },
            "curve": -22
          },
          {
            "from": {
              "team": "us",
              "n": 5
            },
            "to": {
              "team": "them",
              "n": 5
            },
            "curve": -14
          }
        ]
      }
    ]
  },
  "double-team-4": {
    "id": "double-team-4",
    "name": "Double-Team on 4",
    "badge": "from Daniel's diagram",
    "call": "two corners → 4",
    "desc": "Straight from the whiteboard: both corner throwers commit to the same interior target — the 4th player — from opposite angles, so there's no single block that covers both balls.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": true
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": false
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "Set — insides fake",
        "dur": 0.8,
        "fakes": [
          {
            "team": "us",
            "n": 4
          },
          {
            "team": "us",
            "n": 5
          }
        ]
      },
      {
        "label": "Converge on 4",
        "dur": 1.1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 1
            },
            "to": {
              "team": "them",
              "n": 4
            },
            "curve": -20
          },
          {
            "from": {
              "team": "us",
              "n": 8
            },
            "to": {
              "team": "them",
              "n": 4
            },
            "curve": -30
          }
        ]
      }
    ]
  },
  "away": {
    "id": "away",
    "name": "Away",
    "badge": "3-ball defense",
    "call": "\"Away\"",
    "desc": "Triggered when they throw: all ball-holders rush the center line, and the player opposite the thrower counters from at or near the line while they're still recovering.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": false
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": true
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "They throw — rush the line",
        "dur": 1,
        "moves": [
          {
            "team": "us",
            "n": 2,
            "to": [
              24,
              54
            ]
          },
          {
            "team": "us",
            "n": 5,
            "to": [
              55,
              54
            ]
          },
          {
            "team": "us",
            "n": 7,
            "to": [
              76,
              54
            ]
          }
        ]
      },
      {
        "label": "Counter the thrower",
        "dur": 1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 5
            },
            "to": {
              "team": "them",
              "n": 5
            },
            "curve": -16
          }
        ]
      }
    ]
  },
  "crash": {
    "id": "crash",
    "name": "Crash",
    "badge": "2-ball defense",
    "call": "\"Crash\"",
    "desc": "After they throw, both corners rush the line and gang up on whoever just threw — the counter you call when you're up players.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": true
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": false
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "They throw — corners crash",
        "dur": 1.1,
        "moves": [
          {
            "team": "us",
            "n": 1,
            "to": [
              38,
              54
            ]
          },
          {
            "team": "us",
            "n": 8,
            "to": [
              54,
              54
            ]
          }
        ]
      },
      {
        "label": "Both attack the thrower",
        "dur": 1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 1
            },
            "to": {
              "team": "them",
              "n": 4
            },
            "curve": -22
          },
          {
            "from": {
              "team": "us",
              "n": 8
            },
            "to": {
              "team": "them",
              "n": 4
            },
            "curve": -14
          }
        ]
      }
    ]
  },
  "green-light": {
    "id": "green-light",
    "name": "Green Light",
    "badge": "3-ball defense",
    "call": "\"Green light\"",
    "desc": "Red light means hold and push them back with fakes; one corner is given green light to counter the opposing attack when the look is there.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": true
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": false
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "Red light — hold and push",
        "dur": 0.9,
        "fakes": [
          {
            "team": "us",
            "n": 1
          },
          {
            "team": "us",
            "n": 5
          },
          {
            "team": "us",
            "n": 8
          }
        ]
      },
      {
        "label": "Green light — right corner counters",
        "dur": 1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 8
            },
            "to": {
              "team": "them",
              "n": 7
            },
            "curve": -14
          }
        ]
      }
    ]
  },
  "home": {
    "id": "home",
    "name": "Home",
    "badge": "3-ball defense",
    "call": "\"Home\"",
    "desc": "Same trigger as Away, but instead of rushing we hold: the player opposite the thrower counters straight back from the back line while the rest pump-fake.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": false
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": true
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "Read the throw — hold the line",
        "dur": 0.9,
        "fakes": [
          {
            "team": "us",
            "n": 2
          },
          {
            "team": "us",
            "n": 5
          },
          {
            "team": "us",
            "n": 7
          }
        ]
      },
      {
        "label": "Home — counter from the back line",
        "dur": 1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 5
            },
            "to": {
              "team": "them",
              "n": 4
            },
            "curve": -12
          }
        ]
      }
    ]
  },
  "middle-bait": {
    "id": "middle-bait",
    "name": "Middle (bait)",
    "badge": "1-ball defense",
    "call": "\"Middle\"",
    "desc": "Down to one ball: pass it to the middle, who takes an offensive position and baits the other team into throwing so we can win the ball back.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": true
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": false
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": true
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": true
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "Pass to the middle",
        "dur": 0.9,
        "moves": [
          {
            "team": "us",
            "n": 4,
            "to": [
              45,
              72
            ]
          }
        ],
        "passes": [
          {
            "from": {
              "team": "us",
              "n": 1
            },
            "to": {
              "team": "us",
              "n": 4
            }
          }
        ]
      },
      {
        "label": "Bait — they bite, he dodges",
        "dur": 1.1,
        "throws": [
          {
            "from": {
              "team": "them",
              "n": 6
            },
            "to": {
              "team": "us",
              "n": 4
            },
            "curve": -16,
            "outcome": "dodged"
          }
        ],
        "dodges": [
          {
            "team": "us",
            "n": 4
          }
        ]
      }
    ]
  },
  "single-ball": {
    "id": "single-ball",
    "name": "Single Ball",
    "badge": "4-ball offense",
    "call": "\"Single ball\"",
    "desc": "Designate one player to throw a single ball while holding the other three for defense. Called to burn time off the clock or when we're down players.",
    "setup": {
      "us": [
        {
          "n": 1,
          "x": 6.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 95,
          "ball": true
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 95,
          "ball": false
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 95,
          "ball": true
        }
      ],
      "them": [
        {
          "n": 1,
          "x": 6.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 2,
          "x": 18.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 3,
          "x": 31.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 4,
          "x": 43.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 5,
          "x": 56.25,
          "y": 5,
          "ball": false
        },
        {
          "n": 6,
          "x": 68.75,
          "y": 5,
          "ball": false
        },
        {
          "n": 7,
          "x": 81.25,
          "y": 5,
          "ball": true
        },
        {
          "n": 8,
          "x": 93.75,
          "y": 5,
          "ball": false
        }
      ],
      "balls": []
    },
    "steps": [
      {
        "label": "Designate one thrower",
        "dur": 0.8,
        "fakes": [
          {
            "team": "us",
            "n": 6
          },
          {
            "team": "us",
            "n": 4
          }
        ]
      },
      {
        "label": "Single ball — burn the clock",
        "dur": 1.1,
        "throws": [
          {
            "from": {
              "team": "us",
              "n": 6
            },
            "to": {
              "team": "them",
              "n": 5
            },
            "curve": -18
          }
        ]
      }
    ]
  }
}; })(typeof window!=="undefined"?window:globalThis);
