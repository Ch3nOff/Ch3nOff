export interface ManifestoSection {
  title: string;
  tag: string;
  lead: string;
  items?: string[];
  paragraphs?: string[];
}

export const manifestoData: {
  headline: string;
  subheadline: string;
  sections: ManifestoSection[];
  tenDiscoveries: { number: string; statement: string; note: string }[];
  mindChanged: { previous: string; current: string; reason: string }[];
} = {
  headline: "I build things I don't completely understand yet.",
  subheadline: "A personal manifesto on tactile computing, low-level mechanics, and refusing the convenience of generic abstractions.",
  sections: [
    {
      title: "WHO I AM",
      tag: "01 // IDENTITY",
      lead: "I am Matthew Chen (陳軍宇) — a programmer, hardware tinkerer, bassist, and student of Computer Science & Artificial Intelligence at Tamkang University (淡江大學) in Taiwan.",
      paragraphs: [
        "I grew up in Tangerang, Indonesia, immersed in school hackathons, drama productions ('Roda di Balik Gerobak'), robotics breadboards, and Tarakanita CC5+ values. Now based in Taiwan, I split my waking hours between mathematical tensor kernels, cascaded control loops, speedcubing algorithms, and the rhythmic crack of slap bass guitar against frets.",
        "I don't fit neatly into the modern developer archetype. I don't care about startup valuations, aesthetic corporate roadmaps, or building another CRUD wrapper around someone else's closed API. I care about what happens when the voltage hits the motor coil, when the matrix product fits inside L2 cache, and when a machine behaves with genuine physical elegance."
      ]
    },
    {
      title: "WHAT I MAKE",
      tag: "02 // ARTIFACTS",
      lead: "Things with tactile feedback, zero-dependency resilience, and low-latency mechanical truth.",
      items: [
        "dual-loop-controller: A Python package published on PyPI (v2.5.0) implementing nested cascaded PID control for high-precision robotics and physical actuators.",
        "PENJAGA-MOBILE: An off-grid civilian emergency mesh network communicating via Bluetooth Low Energy (BLE) packet hops during disaster blackouts.",
        "Block Blast CV Solver: An automated computer vision pipeline using OpenCV and ADB to scan, evaluate, and inject real-time tile placement taps at 60 FPS.",
        "Heterogeneous Cross-Play Minecraft Cluster: A high-throughput Paper/Spigot distributed game infrastructure bridging Java and Bedrock clients via custom UDP packet translation.",
        "Grouped-Subspace Latent MoE Routing: Sparse Small Language Model architectures engineered to reason locally on 15W laptop NPU silicon with custom PyTorch and Triton kernels."
      ]
    },
    {
      title: "WHAT I BELIEVE",
      tag: "03 // CONVICTIONS",
      lead: "Engineering is a moral discipline, not a spectacle.",
      items: [
        "Small models over bloated monoliths. An intelligence that runs locally on battery power is sovereign; an intelligence leased through a token API is just a fragile rental.",
        "If you don't understand the physical constraints of your hardware, your software is an accident waiting to fail.",
        "Friction is healthy. Autocomplete and AI code generators that write boilerplate before you think are making programmers illiterate to edge cases.",
        "Tarakanita CC5+ ethos: Competence without Compassion is dangerous; Creativity without Conviction is hollow.",
        "True polish is not adding features. True polish is stripping away every layer of abstraction until only the raw, humming math remains."
      ]
    },
    {
      title: "WHAT I'M LEARNING",
      tag: "04 // IN PROGRESS",
      lead: "The edge of current comprehension.",
      items: [
        "Continuous learning mechanisms in sparse Mixture-of-Experts (MoE) routing without catastrophic forgetting.",
        "Writing custom Triton / C++ CUDA kernels for low-rank grouped attention directly addressing memory bus bandwidth bottlenecks.",
        "Traditional Chinese character philology (繁體字) — understanding how archaic radical structures balance spatial weight.",
        "16th-note slap-bass ghost-note fingerings in 7/8 time signatures, chasing the pocket between the kick drum and the high-hat sizzle."
      ]
    },
    {
      title: "WHAT I'M CURRENTLY OBSESSED WITH",
      tag: "05 // OBSESSIONS",
      lead: "Things keeping my desk lamp on at 3:00 AM.",
      items: [
        "Dual-loop cascaded state feedback and eliminating phase lag in low-cost stepper drivers.",
        "CFOP speedcubing inspection lookahead: predicting the first two F2L pairs during the 15-second pre-inspection period.",
        "Capsa Banting & Susun card combinatorics: information asymmetry and deceptive passing strategies in 4-player games.",
        "Local agent loops with Hermes Agent and OpenClaw executing on device NPUs with custom SOUL.md configuration matrices."
      ]
    }
  ],
  mindChanged: [
    {
      previous: "Bigger models with more parameters are inherently more intelligent.",
      current: "Bigger models are mostly encyclopedias with high memory bandwidth penalties; compact models with sparse routing reason far more cleanly.",
      reason: "Observing 350M models match 8B models on deductive logic once the KV cache latency is eliminated."
    },
    {
      previous: "Software should be completely isolated from hardware details.",
      current: "Software that ignores cache lines, interrupt latencies, and clock jitter is sloppy and brittle.",
      reason: "Writing motor drivers where 2ms of jitter turned smooth motion into destructive mechanical resonance."
    },
    {
      previous: "Speedcubing is about moving your fingers as fast as possible.",
      current: "Speedcubing is 90% visual lookahead and fluid tempo; spastic TPS creates blind spots and lockups.",
      reason: "Dropping my average by 4 seconds simply by slowing down my turning speed to maintain continuous vision."
    }
  ],
  tenDiscoveries: [
    { number: "01", statement: "Coulomb friction cannot be cured with PID integral gain.", note: "You need a velocity feed-forward or deadband dither; otherwise you cause mechanical windup." },
    { number: "02", statement: "Slap bass tone is generated by the bone, not the thumb meat.", note: "Hitting with the interphalangeal joint against the steel produces instant harmonic snap." },
    { number: "03", statement: "The Traditional Chinese character 鬱 has 29 strokes and represents dense, entangled vitality.", note: "Writing it slowly centers the mind better than meditation apps." },
    { number: "04", statement: "Minecraft Bedrock RakNet packets use 24-bit sequence numbers over UDP.", note: "Converting them into Java Netty byte streams requires forged client-side window packets." },
    { number: "05", statement: "In Capsa Banting, passing when you hold two Aces and a 2 is often the winning play.", note: "It leaves the table scrambling while you hold the irreversible terminal hand." },
    { number: "06", statement: "Consumer NPUs run hot on sustained GEMM operations without customized tile quantization.", note: "INT8 with FP16 activations is the sweet spot for edge memory limits." },
    { number: "07", statement: "Tamsui river breezes carry more humidity than Tangerang, shifting bass neck relief.", note: "Truss rod adjustments are seasonal necessities across different latitudes." },
    { number: "08", statement: "OpenCV template matching fails under backlight; contour thresholding is vastly superior.", note: "Implemented in the Block Blast solver for 99.8% cell detection accuracy." },
    { number: "09", statement: "A 14ms feedback loop feels biological to human perception.", note: "Above 50ms feels like computer software; below 15ms feels like an extension of your body." },
    { number: "10", statement: "The best open source software is written out of personal exasperation.", note: "I built dual-loop-controller because every existing PID script on GitHub shook my motor to pieces." }
  ]
};
