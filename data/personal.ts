export interface PersonalData {
  name: string;
  nativeName: string;
  handle: string;
  tagline: string;
  location: string;
  coordinates: string;
  currentFocus: string;
  lastUpdated: string;
  academic: {
    institution: string;
    major: string;
    location: string;
    foundation: string;
  };
  links: {
    github: string;
    repo: string;
    pypi: string;
    youtube: string;
    email: string;
    discord?: string;
  };
  technicalPillars: {
    title: string;
    subtitle: string;
    specs: string[];
    description: string;
  }[];
  hobbies: {
    name: string;
    category: string;
    obsession: string;
    metric: string;
    description: string;
  }[];
  quickStatus: {
    label: string;
    value: string;
  }[];
}

export const personalData: PersonalData = {
  name: "Matthew Chen",
  nativeName: "陳軍宇",
  handle: "Ch3nOff",
  tagline: "Exploring Small Language Model architectures, dual-loop control theory, and tactile computing.",
  location: "Jiuru / Tamsui, Taiwan",
  coordinates: "22°42'N 120°29'E // 25°10'N 121°26'E",
  currentFocus: "Grouped-Subspace Latent Attention & Edge NPU Agent Kernels",
  lastUpdated: "2026-09-26",
  academic: {
    institution: "Tamkang University (淡江大學)",
    major: "Computer Science & Artificial Intelligence (資訊工程與人工智慧)",
    location: "New Taipei City, Taiwan",
    foundation: "Tarakanita CC5+ Ethos — Compassion, Community, Competence, Conviction, Celebration, Creativity"
  },
  links: {
    github: "https://github.com/Ch3nOff",
    repo: "https://github.com/Ch3nOff/Ch3nOff",
    pypi: "https://pypi.org/project/dual-loop-controller/",
    youtube: "https://youtube.com/@ch3ng4m1ngyt",
    email: "ch3ng4m1ngyt@gmail.com",
    discord: "ch3noff"
  },
  technicalPillars: [
    {
      title: "Dual-Loop Control & Edge Feedback",
      subtitle: "Published PyPI Package: dual-loop-controller v2.5.0",
      specs: ["PyPI Package", "Cascaded PID", "Low-Latency Matrix Loop"],
      description: "Designed a lightweight mathematical engine for cascading position and velocity feedback in robotics and micro-controllers. Built to run without floating-point bloat on edge chips."
    },
    {
      title: "Sub-Billion MoE & Latent Attention",
      subtitle: "PyTorch & Custom C++/CUDA Kernels",
      specs: ["Grouped-Subspace Attention", "Heterogeneous Kernels", "NPU Acceleration"],
      description: "Rejecting giant monolithic parameter counts in favor of sparse, routing-efficient Small Language Models (SLMs) that can think locally on consumer NPU silicon with Hermes & OpenClaw."
    },
    {
      title: "Hardware Telemetry & BLE Mesh",
      subtitle: "Project PENJAGA-MOBILE & Embedded Nodes",
      specs: ["ESP32 / ATTiny85", "Bluetooth Low Energy Mesh", "Zero-Internet Emergency Protocol"],
      description: "Off-grid disaster communication architecture using hop-based BLE packet dissemination and low-power sensory nodes designed for chaotic real-world physical constraints."
    },
    {
      title: "Computer Vision Game Automation",
      subtitle: "Block Blast Solver via OpenCV + ADB",
      specs: ["Python 3.11", "OpenCV Contours", "Real-Time Android Debug Bridge"],
      description: "Real-time screenshot buffer capture, matrix cell segmenter, and heuristic backtracking combinatorial solver for perfect tile placements at 60 FPS."
    }
  ],
  hobbies: [
    {
      name: "Slap Bass Guitar",
      category: "Acoustics & Rhythm",
      obsession: "Thumb thumps, popping octave resonance, and 16th-note ghost note spacing",
      metric: "118 BPM funk pocket",
      description: "Bass is not melody; it's acoustic physics. Slapping requires immediate mechanical leverage — striking the string against the fretboard so the metallic ring anchors the kick drum."
    },
    {
      name: "3x3 Rubik's Cube Speedsolving",
      category: "Spatial Combinatorics",
      obsession: "CFOP inspection lookahead, non-pre-rotation F2L insertion pairs, PLL recognition",
      metric: "Sub-16s PB",
      description: "Treating the cube as a 43-quintillion state graph. Your fingers execute muscle memory while your eyes track the next cross edge before the current pair even seats."
    },
    {
      name: "Minecraft Network Architecture",
      category: "Distributed State Systems",
      obsession: "Spigot/Paper packet compression, GeyserMC protocol translation, tick synchronization",
      metric: "Zero-tick drift cross-play",
      description: "Bridging Bedrock and Java editions across custom tunnels. Dealing with protocol byte mismatches teaches more about network transport than any university homework."
    },
    {
      name: "Card Strategy (Capsa Banting & Susun)",
      category: "Game Theory & Probability",
      obsession: "Card distribution counting, bluff trapping, tempo management, risk hedging",
      metric: "52-card state tracking",
      description: "Capsa isn't luck; it's an exercise in information asymmetry. Knowing when to pass a high 2 to force out your opponent's royal sequence."
    },
    {
      name: "Traditional Chinese Calligraphy & Etymology",
      category: "Linguistics & Philosophy",
      obsession: "繁體字 stroke weight, radical balance, historical character evolution",
      metric: "Daily character analysis",
      description: "Writing characters like 鬱, 臺, and 龍 teaches patience that directly mirrors debugging intricate assembly instructions."
    }
  ],
  quickStatus: [
    { label: "LATITUDE", value: "22°42' N" },
    { label: "LONGITUDE", value: "120°29' E" },
    { label: "SYS_STATUS", value: "COMPILED_CLEAN" },
    { label: "PYPI_VERSION", value: "v2.5.0" },
    { label: "GITHUB_COMMITS", value: "DAILY_ACTIVE" },
    { label: "ACADEMIC_TRACK", value: "TAMKANG_AI_CS" }
  ]
};
