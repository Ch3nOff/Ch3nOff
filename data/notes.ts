export interface FieldNote {
  id: string;
  date: string;
  time: string;
  tag: string;
  location: string;
  thought: string;
  rawScratch?: string;
}

export const fieldNotes: FieldNote[] = [
  {
    id: "note-01",
    date: "2026-09-26",
    time: "21:14 CST",
    tag: "CONTROL_SYSTEMS",
    location: "Jiuru, Pingtung",
    thought: "People spend weeks tuning the integral gain (Ki) when their physical mechanism simply has Coulomb friction. If your actuator is physically sticking at low PWM, math won't unstick it — you need a deadband dither or an inner velocity loop that kicks in before the position error integrates into a violent jump.",
    rawScratch: "v2.5.0 PyPI release: anti-windup clamping threshold set to 0.12 * max_effort."
  },
  {
    id: "note-02",
    date: "2026-09-19",
    time: "23:47 CST",
    tag: "PYPI_RELEASE",
    location: "Tamsui, New Taipei",
    thought: "Shipping dual-loop-controller v2.5.0 taught me that packaging is design. Zero mandatory dependencies isn't a gimmick — it means an ESP32 running MicroPython and a student's Raspberry Pi execute the exact same cascaded loop code. The anti-windup clamp at 0.12 * max_effort finally killed the breakaway jump on the stepper bench.",
    rawScratch: "pip install dual-loop-controller==2.5.0 --no-deps works on every board in the drawer."
  },
  {
    id: "note-03",
    date: "2026-08-29",
    time: "14:15 WIB",
    tag: "GAME_THEORY",
    location: "Tangerang",
    thought: "In Capsa Banting (Big Two), the novice plays their highest card the moment they feel cornered. The master passes intentionally with a pair of 2s in hand, letting the other players exhaust their high spades. Winning isn't about having the strongest hand; it's about dictating who controls the tempo of the trick.",
    rawScratch: "Combinatorics note: probability of being dealt zero cards above 10 is ~3.2%."
  }
];
