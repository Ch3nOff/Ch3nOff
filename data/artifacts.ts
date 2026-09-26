export interface Artifact {
  id: string;
  name: string;
  category: 'PyPI Package' | 'Hardware & IoT' | 'Computer Vision' | 'Game Systems' | 'AI & LLM';
  version?: string;
  status: 'Published' | 'Active R&D' | 'Archived' | 'Prototype';
  year: string;
  oneLiner: string;
  description: string;
  techStack: string[];
  links: {
    github?: string;
    pypi?: string;
    youtube?: string;
    demo?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  notes: string;
}

export const artifacts: Artifact[] = [
  {
    id: "dual-loop-controller",
    name: "dual-loop-controller",
    category: "PyPI Package",
    version: "v2.5.0",
    status: "Published",
    year: "2026",
    oneLiner: "Cascaded dual-loop PID and velocity-position state feedback engine for high-precision edge actuation.",
    description: "Published Python library designed to eliminate mechanical jerk and overshoot in physical control systems. Integrates an ultra-fast inner velocity loop nested within an outer position loop, complete with anti-windup clamping and derivative noise filtering.",
    techStack: ["Python 3.11", "PyPI", "C-Optimized Math", "MicroPython Compatible"],
    links: {
      pypi: "https://pypi.org/project/dual-loop-controller/",
      github: "https://github.com/Ch3nOff/dual-loop-controller",
    },
    metrics: [
      { label: "Jitter Reduction", value: "64%" },
      { label: "Tick Overhead", value: "<0.08ms" },
      { label: "Dependency Weight", value: "0 external deps" }
    ],
    notes: "Tested on custom stepper rigs and DC motor encoders. Solves the classical double-integrator overshoot problem."
  },
  {
    id: "penjaga-mobile",
    name: "PENJAGA-MOBILE",
    category: "Hardware & IoT",
    status: "Prototype",
    year: "2026",
    oneLiner: "Offline emergency beacon and peer-to-peer safety mesh protocol powered by Bluetooth Low Energy (BLE).",
    description: "Built for disaster scenarios where cellular infrastructure fails. Devices broadcast cryptographic distress packets over BLE that hop across neighboring civilian phones and micro-controller repeaters without internet or cellular connectivity.",
    techStack: ["ESP32", "BLE 5.0", "C++", "Android BLE API", "Tarakanita CC5+ Project"],
    links: {
      github: "https://github.com/Ch3nOff",
    },
    metrics: [
      { label: "Network Requirement", value: "0% Internet" },
      { label: "Packet Hop Limit", value: "7 Relays" },
      { label: "Battery Life", value: "48+ Hours" }
    ],
    notes: "Designed around the Tarakanita CC5+ principle of Compassion: technology engineered specifically for human crisis resilience."
  },
  {
    id: "block-blast-solver",
    name: "Block Blast CV & Heuristic Solver",
    category: "Computer Vision",
    status: "Active R&D",
    year: "2026",
    oneLiner: "Real-time game board state recognition and automated solver pipeline using OpenCV and Android Debug Bridge.",
    description: "Captures live Android video frames over ADB, processes the 8x8 grid with morphological contour filters and color masking, and feeds board states to a minimax heuristic algorithm to compute optimal block clearing sequences at 60 FPS.",
    techStack: ["Python", "OpenCV", "NumPy", "ADB (Android Debug Bridge)", "Heuristic Search"],
    links: {
      github: "https://github.com/Ch3nOff",
      youtube: "https://youtube.com/@ch3ng4m1ngyt"
    },
    metrics: [
      { label: "Frame Analysis Latency", value: "16.4ms" },
      { label: "Board Recognition Accuracy", value: "99.8%" },
      { label: "Max Cleared Score", value: "142,000+" }
    ],
    notes: "Automated real-time ADB touch tap injection directly simulating human finger drag arcs."
  },
  {
    id: "minecraft-crossplay-infra",
    name: "Heterogeneous Minecraft Cross-Play Network",
    category: "Game Systems",
    status: "Published",
    year: "2025-2026",
    oneLiner: "High-throughput Paper/Spigot server architecture enabling zero-desync cross-play between Java and Bedrock clients.",
    description: "Configured custom network proxy routing utilizing GeyserMC, Floodgate, and optimized UDP packet compression tunnels. Features custom server-side tick scheduler monitoring to maintain a locked 20.0 TPS under concurrent player load.",
    techStack: ["Java / JVM", "PaperMC", "Spigot", "GeyserMC", "Floodgate", "UDP / RakNet"],
    links: {
      github: "https://github.com/Ch3nOff",
      youtube: "https://youtube.com/@ch3ng4m1ngyt"
    },
    metrics: [
      { label: "Server Tick Rate", value: "20.0 TPS" },
      { label: "Cross-Play Desync", value: "0 Detected" },
      { label: "Packet Compression", value: "32% Bandwidth Saved" }
    ],
    notes: "Explored during late-night server admin sessions, providing hands-on insight into asynchronous network protocols."
  },
  {
    id: "project-synapse",
    name: "Project: Synapse (2D AI RPG)",
    category: "Game Systems",
    status: "Active R&D",
    year: "2026",
    oneLiner: "Tactical 2D RPG engine featuring emergent AI NPC dialogues and modular spell-crafting state machines.",
    description: "A mobile-first tactical RPG built with modular C# scripts and localized LLM prompt injectors. NPCs dynamically adjust their trade prices, allegiances, and combat strategies based on conversational history rather than static branching trees.",
    techStack: ["Unity", "C#", "Custom State Machines", "Local SLM Dialogue Injector"],
    links: {
      github: "https://github.com/Ch3nOff",
    },
    metrics: [
      { label: "Dialogue State Branching", value: "Dynamic / Open" },
      { label: "Combat Turn Resolution", value: "<12ms" }
    ],
    notes: "Prototyped to test whether Small Language Models can act as organic game masters in resource-constrained environments."
  },
  {
    id: "latent-attention-moe",
    name: "Grouped-Subspace Latent MoE Routing",
    category: "AI & LLM",
    status: "Active R&D",
    year: "2026",
    oneLiner: "Experimental sparse mixture-of-experts attention kernels targeting low-power edge NPUs.",
    description: "Custom PyTorch and Triton kernel implementation projecting token activations into orthogonal latent clusters. Dramatically reduces memory bandwidth saturation during token autoregression on laptop chips (Intel Core Ultra & RTX 40/50 series).",
    techStack: ["PyTorch", "CUDA / Triton", "C++", "Hermes Agent", "OpenClaw"],
    links: {
      github: "https://github.com/Ch3nOff",
    },
    metrics: [
      { label: "Memory Bandwidth Savings", value: "3.8x" },
      { label: "Target Model Size", value: "350M - 750M" }
    ],
    notes: "Part of ongoing university preparation research for Tamkang University's Department of Artificial Intelligence."
  }
];
