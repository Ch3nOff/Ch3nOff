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
    date: "2026-09-22",
    time: "02:40 CST",
    tag: "ACOUSTICS_RHYTHM",
    location: "Studio Desk",
    thought: "Slap bass is 80% thumb pivot geometry and 20% amplification. If you slap through the string like you're playing an electric guitar with a pick, you kill the bounce. Your thumb must rebound off the steel before the string even reaches its maximum excursion. The groove lives in the acoustic rebound.",
    rawScratch: "Metronome locked at 114 BPM. Practice ghost-note triplets on low E."
  },
  {
    id: "note-03",
    date: "2026-09-15",
    time: "18:20 CST",
    tag: "SPATIAL_CFOP",
    location: "Library",
    thought: "In 3x3 speedsolving, turning faster than 9 TPS (turns per second) with blind hesitation is worse than turning at 5 TPS with unbroken lookahead. While inserting the front-right F2L pair, your eyes must be scanning the opposite back-left corner for the next edge orientation. Software pipelines are the exact same: pipeline stalls kill throughput.",
    rawScratch: "PB single: 14.82s. Still hesitating on G-perm recognition."
  },
  {
    id: "note-04",
    date: "2026-09-08",
    time: "23:05 CST",
    tag: "DISTRIBUTED_NETS",
    location: "Tamsui, New Taipei",
    thought: "The reason Minecraft server networks are fascinating is because Minecraft was never designed for cross-platform protocol translation. When Geyser translates an item click packet from a Bedrock mobile screen into a Java packet sequence, it has to predict inventory desyncs before the Java server sends an ACK. It's an optimistic consistency engine running on coffee and open-source grit.",
    rawScratch: "Paper 1.21.x Netty buffer pool tuning: netty-threads=4, compression-threshold=64."
  },
  {
    id: "note-05",
    date: "2026-08-29",
    time: "14:15 WIB",
    tag: "GAME_THEORY",
    location: "Tangerang",
    thought: "In Capsa Banting (Big Two), the novice plays their highest card the moment they feel cornered. The master passes intentionally with a pair of 2s in hand, letting the other players exhaust their high spades. Winning isn't about having the strongest hand; it's about dictating who controls the tempo of the trick.",
    rawScratch: "Combinatorics note: probability of being dealt zero cards above 10 is ~3.2%."
  },
  {
    id: "note-06",
    date: "2026-08-11",
    time: "09:45 CST",
    tag: "PHILOLOGY",
    location: "Tamsui Waterfront",
    thought: "The Traditional Chinese character 聽 (to listen) contains five radicals: ear (耳), king (王), ten (十), eye (目), and heart (心). To truly listen requires your ear, your eyes, your undivided presence like a king, and your heart. Modern software needs to listen to hardware with that exact same multidimensional attention.",
    rawScratch: "Practice brush strokes for 聽, 臺, and 龍."
  }
];
