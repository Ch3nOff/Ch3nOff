export interface Article {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  year: string;
  readingTime: string;
  category: string;
  mood: string;
  type: 'essay' | 'field-note' | 'architecture' | 'manifesto';
  excerpt: string;
  previewImagePrompt: string; // for editorial visual placeholder
  chapters: { id: string; title: string }[];
  footnotes: { id: number; text: string }[];
  content: {
    leadParagraph: string;
    sections: {
      heading?: string;
      subheading?: string;
      body: string[];
      pullQuote?: string;
      marginNote?: string;
      codeBlock?: {
        language: string;
        code: string;
        caption?: string;
      };
      diagram?: {
        title: string;
        ascii: string;
      };
    }[];
  };
}

export const articles: Article[] = [
  {
    id: "art-01",
    slug: "why-sub-billion-parameter-models-matter",
    number: "01",
    title: "On Sub-Billion Models and Why I Refuse to Train Monoliths",
    subtitle: "Rethinking sparsity, Grouped-Subspace Latent Attention, and running intelligence on local NPU silicon.",
    date: "2026-09-18",
    year: "2026",
    readingTime: "7 min read",
    category: "Architecture",
    mood: "Defiant",
    type: "essay",
    excerpt: "Everyone is renting clusters of H100s to train 70B parameter models that regurgitate encyclopedias. I am obsessed with getting a 350M parameter model to reason sharply inside a 15W laptop NPU.",
    previewImagePrompt: "Latent subspace routing topology diagram with stark high-contrast ink lines on warm textured parchment.",
    chapters: [
      { id: "the-monolith-trap", title: "I. The Monolith Trap" },
      { id: "grouped-subspace-latent-attention", title: "II. Grouped-Subspace Latent Attention" },
      { id: "local-npu-or-bust", title: "III. Local NPU or Bust" },
      { id: "the-virtue-of-constraints", title: "IV. The Virtue of Constraints" }
    ],
    footnotes: [
      { id: 1, text: "Monolithic models waste upwards of 82% of activations on inert semantic tokens during simple inductive reasoning tasks." },
      { id: 2, text: "Grouped-Subspace Latent Attention projects the key-value cache into orthogonal low-rank sub-manifolds, reducing memory bandwidth by 3.8x." },
      { id: 3, text: "Testing conducted on Intel Core Ultra & RTX 40/50 series laptop silicon utilizing custom Triton and PyTorch NPU kernels." }
    ],
    content: {
      leadParagraph: "There is an unspoken sickness in contemporary machine learning: the belief that intelligence is purely a function of linear parameter scaling. If your model fails at multi-step deductive routing, the industry answer is almost comical — throw another thirty billion parameters into the feed-forward layers, rent eight more racks in Ohio, and bill the venture fund. I reject this premise entirely.",
      sections: [
        {
          heading: "I. The Monolith Trap",
          body: [
            "When you train a monolithic dense transformer, every single token pays the exact same thermodynamic tax. Whether the model is predicting the next letter in an arithmetic proof or outputting a generic punctuation mark, all layers activate simultaneously. This is not how biological synapses operate, nor is it how economical computing survives.",
            "In my experiments with small language models (SLMs) in the 250M to 750M range, I noticed something remarkable: when you constrain capacity, the network is forced to learn structural representations rather than surface-level token memorization. It stops being a search engine in disguise and starts acting like an algorithmic engine."
          ],
          marginNote: "Why carry an encyclopedia in your pocket when you only need a chisel and a straightedge?",
          pullQuote: "Constraints are not limitations; they are the only reason elegance exists in engineering."
        },
        {
          heading: "II. Grouped-Subspace Latent Attention",
          body: [
            "The primary bottleneck on consumer chips isn't FLOPs — it is the memory bus. During autoregressive decoding, loading the KV-cache across memory channels throttles the processing units. Standard Multi-Head Attention is recklessly wasteful here.",
            "By decomposing the attention projections into grouped subspaces with low-rank factorization, we can compress the active memory footprint down to a fraction of standard MHA. The query vectors only look into specific latent subspaces conditioned on the routing token."
          ],
          codeBlock: {
            language: "python",
            code: "class SubspaceLatentRouter(nn.Module):\n    def __init__(self, d_model=512, n_subspaces=8, rank=32):\n        super().__init__()\n        self.n_subspaces = n_subspaces\n        self.down_proj = nn.Linear(d_model, n_subspaces * rank, bias=False)\n        self.up_proj = nn.Linear(rank, d_model, bias=False)\n        self.gate = nn.Parameter(torch.randn(n_subspaces))\n\n    def forward(self, x):\n        # Route dynamically without dense activation penalties\n        b, s, d = x.shape\n        subspaces = self.down_proj(x).view(b, s, self.n_subspaces, -1)\n        weights = F.softmax(self.gate, dim=-1)\n        routed = torch.einsum('bsnr,n->bsr', subspaces, weights)\n        return self.up_proj(routed)",
            caption: "Minimal prototype of grouped latent routing tested in PyTorch"
          },
          diagram: {
            title: "Subspace Routing Schematic",
            ascii: "[Token In] ──► [Sparse Subspace Projector]\n                     │\n         ┌───────────┼───────────┐\n         ▼           ▼           ▼\n     Subspace 0  Subspace 1  Subspace N\n         │           │           │\n         └───────────┼───────────┘\n                     ▼\n        [Orthogonal Recomposition] ──► [Next Layer]"
          }
        },
        {
          heading: "III. Local NPU or Bust",
          body: [
            "I want my AI agents to live on my desk, not in a server room in North Virginia. When an agent runs locally — wired to a local serial port, monitoring system logs, listening to an audio buffer — the latency drops from 450 milliseconds down to 14 milliseconds.",
            "At 14ms, interaction ceases to be an RPC request and becomes a continuous biological feedback loop. You feel the machine reacting before your fingertips have fully lifted from the mechanical switches."
          ],
          marginNote: "When latency hits under 20ms, software begins to feel like a musical instrument."
        },
        {
          heading: "IV. The Virtue of Constraints",
          body: [
            "We have traded intellectual discipline for brute force compute. Building Small Language Models forces you to inspect every layer, question every tensor allocation, and optimize every activation function.",
            "This isn't about nostalgia for slow hardware. It's about self-reliance. An intelligence that fits on a USB drive and runs on battery power is sovereign; an intelligence tethered to a subscription token is just an API lease."
          ]
        }
      ]
    }
  },
  {
    id: "art-02",
    slug: "the-physics-of-the-slap-bass-and-recursive-code",
    number: "02",
    title: "The Acoustic Leverage of Slap Bass and Recursive Code",
    subtitle: "Thumb pivots, 16th-note ghost notes, and why timing jitter destroys both funk pockets and control loops.",
    date: "2026-08-30",
    year: "2026",
    readingTime: "5 min read",
    category: "Music & Systems",
    mood: "Rhythmic",
    type: "essay",
    excerpt: "Slapping a bass guitar isn't musical showmanship; it is an exercise in tactile kinetic impulse. You strike the metal fret with the bone of your thumb, recoil instantly, and leave silence for the snare.",
    previewImagePrompt: "Cross-section schematic of a steel bass string vibrating against a nickel fret wire, with timing oscilloscope curves.",
    chapters: [
      { id: "the-percussive-bone", title: "I. The Percussive Bone" },
      { id: "ghost-notes-as-state-machines", title: "II. Ghost Notes as State Machines" },
      { id: "phase-coherence-in-grooves-and-loops", title: "III. Phase Coherence in Grooves and Loops" }
    ],
    footnotes: [
      { id: 1, text: "A roundwound steel string against a jumbo nickel-silver fret produces a transient spike in the 2.5kHz - 4kHz range within 1.2 milliseconds of impact." },
      { id: 2, text: "Ghost notes (dead notes) contain almost no pitch fundamental, acting strictly as rhythmic impulse markers." }
    ],
    content: {
      leadParagraph: "Most people view playing an instrument as an emotional endeavor. To me, slapping a bass guitar feels nearly identical to writing a low-level interrupt handler. If your hand lingers on the string for even three milliseconds too long, the harmonic is choked. If your thumb strikes at an angle off by five degrees, the percussive transient dissolves into muddy flub.",
      sections: [
        {
          heading: "I. The Percussive Bone",
          body: [
            "Watch Marcus Miller or Victor Wooten closely. Their thumbs don't muscle through the string; they treat the knuckle like a spring-loaded hammer. You don't push into the instrument — you whip against it, bouncing off the steel so that the string's kinetic amplitude is transferred cleanly into the pickup magnets.",
            "In control systems, we call this critical damping. An underdamped thumb rings uncontrollably, creating unwanted sympathetic resonance on the adjacent D and G strings. An overdamped thumb suffocates the attack."
          ],
          marginNote: "The instrument never lies about kinetic sloppy posture.",
          pullQuote: "Funk does not live in the notes you strike; it lives in the surgical precision of the silence you leave behind."
        },
        {
          heading: "II. Ghost Notes as State Machines",
          body: [
            "The heart of a legitimate funk groove is never the downbeat root note. It is the muted 'chuck' — the ghost note. Left fingers rest loosely on the fretboard without pressing to the wood, while the right hand plucks.",
            "In a state machine, ghost notes are clock cycles where state does not mutate, but synchronization is maintained. Without them, the groove drifts. The listener feels anxious without understanding why: the system has accumulated micro-jitter."
          ]
        },
        {
          heading: "III. Phase Coherence in Grooves and Loops",
          body: [
            "When I wrote the feedback loop for my dual-loop PID library, I noticed the exact same mathematical phenomenon. If the differential term kicks in 2 milliseconds late relative to the velocity error, the robotic actuator stutters.",
            "Whether you are aligning a stepper motor's PWM duty cycle or locking in with an acoustic drummer at 112 BPM, phase coherence is the only thing standing between pure musical momentum and catastrophic oscillation."
          ],
          marginNote: "Music and robotics are just two dialects of applied physics."
        }
      ]
    }
  },
  {
    id: "art-03",
    slug: "building-dual-loop-controller",
    number: "03",
    title: "Notes on Shipping dual-loop-controller to PyPI: When Math Beats Heuristics",
    subtitle: "Why standard single-loop PID explodes under abrupt load shifts, and how cascaded loops tame the physical world.",
    date: "2026-09-24",
    year: "2026",
    readingTime: "9 min read",
    category: "Software & Robotics",
    mood: "Analytical",
    type: "architecture",
    excerpt: "Most hobbyist robotics tutorials tell you to tweak three constants: Kp, Ki, and Kd. Then your motor shakes violently against the table. Here is what happened when I published dual-loop-controller to PyPI.",
    previewImagePrompt: "Block diagram of an inner velocity loop nested inside an outer position loop, with mathematical transfer functions.",
    chapters: [
      { id: "the-delusion-of-single-loop", title: "I. The Delusion of Single-Loop PID" },
      { id: "the-inner-and-outer-ring", title: "II. The Inner and Outer Ring" },
      { id: "packaging-v2-5-0", title: "III. Packaging for PyPI (v2.5.0)" },
      { id: "what-the-benchmarks-revealed", title: "IV. What the Benchmarks Revealed" }
    ],
    footnotes: [
      { id: 1, text: "Dual-loop controllers decouple inertial lag from actuator torque, preventing integral windup during non-linear mechanical friction." },
      { id: 2, text: "Package dual-loop-controller is hosted on PyPI under username chenoff, providing zero-dependency pure Python and optimized array paths." }
    ],
    content: {
      leadParagraph: "Nearly every beginner who tries to build an inverted pendulum, a gimbal stabilizer, or an autonomous wheeled chassis falls into the same trap: they slap a generic PID formula into their code, spend four weekends turning potentiometers, and end up with a system that either crawls like molasses or oscillates into self-destruction.",
      sections: [
        {
          heading: "I. The Delusion of Single-Loop PID",
          body: [
            "A standard PID controller views the world as a scalar error term: target position minus actual position. But physical motors don't produce position. Motors produce current, which produces torque, which creates angular acceleration, which integrates over time into velocity, which integrates into position.",
            "Asking a single PID loop to bridge the gap across two integration stages while dealing with friction, backlash, and battery voltage drop is asking for mathematical instability."
          ],
          marginNote: "Physics has two integration stages. Your controller needs two loops to match."
        },
        {
          heading: "II. The Inner and Outer Ring",
          body: [
            "The solution is classic cascaded control: the outer loop calculates the desired velocity needed to close the position gap, and the inner loop runs at 5x to 10x the frequency to ensure the motor reaches that exact velocity immediately.",
            "The inner loop eats disturbances before the outer loop even realizes friction occurred. If someone pushes the actuator arm, the velocity loop counters the torque spike within 500 microseconds."
          ],
          diagram: {
            title: "Cascaded Dual-Loop Topology",
            ascii: "[Target Position] ──► [Outer PID: Position] ──► (Target Velocity)\n                                                    │\n                                                    ▼\n [Actual Velocity] ──────────────────────────► [Inner PID: Velocity]\n                                                    │\n                                                    ▼\n                                              [PWM / Torque Out]"
          },
          codeBlock: {
            language: "python",
            code: "# How dual-loop-controller orchestrates cascaded feedback\nfrom dual_loop_controller import DualLoopPID, LoopConfig\n\nconfig = LoopConfig(\n    pos_kp=1.8, pos_ki=0.02, pos_kd=0.15,\n    vel_kp=0.45, vel_ki=0.12, vel_kd=0.01,\n    max_velocity=1200.0, # saturation limit\n    anti_windup=True\n)\n\ncontroller = DualLoopPID(config)\n\n# Fast execution tick (e.g. 500Hz)\ncontrol_output = controller.step(target_pos=90.0, current_pos=sensor_pos, current_vel=sensor_vel, dt=0.002)",
            caption: "Usage example of dual-loop-controller v2.5.0 available on PyPI"
          }
        },
        {
          heading: "III. Packaging for PyPI (v2.5.0)",
          body: [
            "Publishing `dual-loop-controller` to PyPI under `chenoff` was an exercise in stripping away cruft. I wanted zero mandatory third-party dependencies so that an embedded engineer running MicroPython on an ESP32 or a student running a Raspberry Pi could simply `pip install dual-loop-controller` and run.",
            "Version 2.5.0 introduced strict clamping on integral windup, derivative filtering to suppress encoder discretization noise, and a state recorder that can export raw telemetry directly into JSON for offline plotting."
          ],
          marginNote: "Dependencies are technical debt before they are even written.",
          pullQuote: "Good libraries don't add features; they eliminate friction between the programmer's intent and physical reality."
        },
        {
          heading: "IV. What the Benchmarks Revealed",
          body: [
            "Settling time dropped by 64% compared to a tuned single PID loop under step disturbance. Overshoot was virtually eliminated. Most importantly, the motor no longer makes that horrifying high-pitch whine caused by derivative noise amplification."
          ]
        }
      ]
    }
  },
  {
    id: "art-04",
    slug: "minecraft-servers-are-distributed-systems",
    number: "04",
    title: "Minecraft Servers Are Actually Battle-Tested Distributed Systems",
    subtitle: "GeyserMC packet translation, Floodgate authentication tokens, and why teenagers run better networks than enterprise startups.",
    date: "2026-07-14",
    year: "2026",
    readingTime: "6 min read",
    category: "Networks & Infrastructure",
    mood: "Observant",
    type: "field-note",
    excerpt: "You want to understand distributed consensus, UDP protocol translation, and tick drift under heavy load? Stop reading textbook chapters on Paxos and run a hybrid Java/Bedrock Minecraft server for two hundred unpredictable kids.",
    previewImagePrompt: "A dense network topology packet map displaying Bedrock RakNet UDP packets bridging into Java TCP Netty pipelines.",
    chapters: [
      { id: "the-protocol-chasm", title: "I. The Protocol Chasm" },
      { id: "geyser-and-floodgate", title: "II. Geyser, Floodgate, and Packet Translation" },
      { id: "the-relentless-20-tps", title: "III. The Relentless 20 TPS" }
    ],
    footnotes: [
      { id: 1, text: "Minecraft Java communicates via TCP streams using Netty; Minecraft Bedrock uses RakNet over UDP with client-side prediction." },
      { id: 2, text: "Floodgate circumvents standard online-mode UUID authentication by creating cryptographic Bedrock token handshakes." }
    ],
    content: {
      leadParagraph: "In academic computer science, distributed systems are taught with sterile diagrams: Node A sends a SYN packet, Node B acknowledges, a Raft leader is elected. It feels clean. In reality, distributed systems are chaotic, messy, and prone to silent failures — a reality any sixteen-year-old running a Paper/Spigot server network understands on an instinctual level.",
      sections: [
        {
          heading: "I. The Protocol Chasm",
          body: [
            "Consider what happens when you enable cross-play between Minecraft Java Edition and Minecraft Bedrock Edition. Java runs over TCP, expecting guaranteed in-order delivery and server-authoritative world states. Bedrock runs on mobile phones, tablets, and consoles over RakNet (UDP), relying heavily on optimistic client-side prediction.",
            "You are attempting to make two fundamentally contradictory networking philosophies agree on where an arrow landed in a three-dimensional voxel grid."
          ],
          marginNote: "TCP wants certainty. UDP wants speed. Bridging them is an act of diplomatic acrobatics."
        },
        {
          heading: "II. Geyser, Floodgate, and Packet Translation",
          body: [
            "This is where GeyserMC and Floodgate step in. Geyser acts as an on-the-fly protocol proxy, translating incoming RakNet packets into Java Netty byte buffers in real-time. If a Bedrock player looks at an inventory GUI, Geyser must forge fake window packets so the Java server doesn't disconnect them for packet spoofing.",
            "Floodgate solves the authentication identity problem: it intercepts the login sequence, cryptographically validates the Xbox Live token, and synthesizes a legitimate UUID that the Java authentication pipeline accepts without crying foul."
          ],
          pullQuote: "Every network abstraction is a lie that works until packet loss exceeds eight percent."
        },
        {
          heading: "III. The Relentless 20 TPS",
          body: [
            "A Minecraft server must process 20 ticks per second. That means you have exactly 50 milliseconds to calculate mob pathfinding, entity collisions, chunk loading, redstone circuits, and packet broadcasts.",
            "If your tick time climbs to 52 milliseconds, you fall behind. If you drop to 14 TPS, players notice the latency in their sword swings. Managing this taught me more about thread contention, garbage collection pauses in the JVM, and network buffer saturation than any classroom lecture ever could."
          ]
        }
      ]
    }
  },
  {
    id: "art-05",
    slug: "from-tangerang-to-tamkang-notes-on-language-and-relocation",
    number: "05",
    title: "From Tangerang to Tamkang: Ink, Traditional Characters, and Relocation",
    subtitle: "Reflections on moving between archipelagos, studying 繁體字 in Tamsui, and carrying Tarakanita CC5+ values across seas.",
    date: "2026-04-12",
    year: "2026",
    readingTime: "7 min read",
    category: "Field Notes & Identity",
    mood: "Contemplative",
    type: "field-note",
    excerpt: "Packing your life into two suitcases changes how you perceive permanence. In Tangerang, life was humid, fast-paced, and filled with school projects. In Tamsui, the wind comes off the river and the characters on the storefronts carry three thousand years of brush strokes.",
    previewImagePrompt: "A street scene in Tamsui with distant mountain fog, handwritten Traditional Chinese calligraphy alongside Indonesian batik textures.",
    chapters: [
      { id: "two-suitcases", title: "I. Two Suitcases and a Laptop" },
      { id: "the-geometry-of-traditional-characters", title: "II. The Geometry of 繁體字" },
      { id: "the-six-principles-cc5", title: "III. The Six Principles (CC5+)" },
      { id: "what-anchors-a-builder", title: "IV. What Anchors a Builder" }
    ],
    footnotes: [
      { id: 1, text: "Tamkang University (淡江大學) sits on the hillside of Tamsui, overlooking the Taiwan Strait and Guanyin Mountain." },
      { id: 2, text: "Tarakanita CC5+ represents: Compassion, Celebration, Community, Conviction, Creativity, and Competence." }
    ],
    content: {
      leadParagraph: "There is a specific feeling that happens when you sit in an empty room in a foreign city for the first time. The ambient frequency of the street is different. The air smells of wet asphalt and sea salt rather than equatorial rain and clove. You open your laptop, pull the latest commit from your repository, and realize that code is the only geography that didn't shift.",
      sections: [
        {
          heading: "I. Two Suitcases and a Laptop",
          body: [
            "Transitioning from high school in Tangerang to university studies in Computer Science and Artificial Intelligence at Tamkang University (淡江大學) in Taiwan has been less about changing countries and more about changing the lens through which I see problems.",
            "In high school, we collaborated in noisy groups, built short films ('Roda di Balik Gerobak'), debated the ethics of automation, and hacked on hardware with whatever micro-controllers we could find. Here in Tamsui, the pace slows down just enough to force you to think about foundations."
          ],
          marginNote: "When you cross borders, you quickly discover which parts of yourself are habit and which parts are core."
        },
        {
          heading: "II. The Geometry of 繁體字",
          body: [
            "Studying Traditional Chinese characters (繁體字) has fundamentally reshaped how I write software. Consider a character like 鬱 (melancholy/dense) or 臺 (stage/platform). Every radical inside the character carries historical intent, balance, and weight.",
            "If you make the left radical too wide, the entire balance collapses. You cannot rush it. In modern frontend engineering, we are taught to throw utilities together at breakneck speed. Traditional calligraphy demands that you respect the negative space."
          ],
          pullQuote: "Negative space is not empty space; it is the tension that allows the form to speak."
        },
        {
          heading: "III. The Six Principles (CC5+)",
          body: [
            "My school years were grounded in the Tarakanita CC5+ framework: Compassion, Celebration, Community, Conviction, Creativity, and Competence.",
            "People often assume engineering is detached from morality. But when you build an emergency mesh network like PENJAGA-MOBILE, designed to work when cellular towers collapse, competence without compassion is useless. You are building tools for human survival, not for benchmark bragging rights."
          ]
        },
        {
          heading: "IV. What Anchors a Builder",
          body: [
            "I keep making things I don't completely understand yet. Whether it is an MoE router, a cascaded dual-loop PID algorithm, or learning to slap an intricate 16th-note groove on a four-string bass, the joy has never been in being an expert.",
            "The joy is in the friction of the unknown — in that quiet, late-night moment when the terminal prints clean output, the string rings true, and the machine comes alive."
          ],
          marginNote: "Stay curious. Keep building things with your own hands."
        }
      ]
    }
  }
];
