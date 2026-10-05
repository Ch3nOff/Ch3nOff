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
      lead: "I am Matthew Chen (陳軍宇) — a programmer, hardware tinkerer, and student of Computer Science & Artificial Intelligence at Tamkang University (淡江大學) in Taiwan.",
      paragraphs: [
        "I grew up in Tangerang, Indonesia, immersed in school hackathons, drama productions ('Roda di Balik Gerobak'), robotics breadboards, and Tarakanita CC5+ values. Now based in Taiwan, I split my waking hours between mathematical tensor kernels, cascaded control loops, and low-latency edge feedback systems.",
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
        "Traditional Chinese character philology (繁體字) — understanding how archaic radical structures balance spatial weight."
      ]
    },
    {
      title: "WHAT I'M CURRENTLY OBSESSED WITH",
      tag: "05 // OBSESSIONS",
      lead: "Things keeping my desk lamp on at 3:00 AM.",
      items: [
        "Dual-loop cascaded state feedback and eliminating phase lag in low-cost stepper drivers.",
        "Anti-windup clamping strategies and derivative noise filtering for encoder discretization artifacts in v2.5.0 of dual-loop-controller.",
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
    }
  ],
  tenDiscoveries: [
    { number: "01", statement: "Coulomb friction cannot be cured with PID integral gain.", note: "You need a velocity feed-forward or deadband dither; otherwise you cause mechanical windup." },
    { number: "02", statement: "The Traditional Chinese character 鬱 has 29 strokes and represents dense, entangled vitality.", note: "Writing it slowly centers the mind better than meditation apps." },
    { number: "03", statement: "In Capsa Banting, passing when you hold two Aces and a 2 is often the winning play.", note: "It leaves the table scrambling while you hold the irreversible terminal hand." },
    { number: "04", statement: "Consumer NPUs run hot on sustained GEMM operations without customized tile quantization.", note: "INT8 with FP16 activations is the sweet spot for edge memory limits." },
    { number: "05", statement: "A 14ms feedback loop feels biological to human perception.", note: "Above 50ms feels like computer software; below 15ms feels like an extension of your body." },
    { number: "06", statement: "An inner loop running 5x-10x faster than the outer loop eats disturbances before the position controller even sees them.", note: "This cascaded topology is the core of dual-loop-controller's disturbance rejection." },
    { number: "07", statement: "Derivative noise amplification is what makes motors whine.", note: "Low-pass filtering the D term on encoder deltas removed the high-pitch squeal entirely." },
    { number: "08", statement: "Zero external dependencies is a feature, not a limitation.", note: "Pure-Python math paths let dual-loop-controller run on MicroPython ESP32s and Raspberry Pis alike." },
    { number: "09", statement: "Integral windup during static friction is a silent killer of settling time.", note: "v2.5.0 clamps the integrator at 0.12 * max_effort to prevent violent jumps on breakaway." },
    { number: "10", statement: "The best open source software is written out of personal exasperation.", note: "I built dual-loop-controller because every existing PID script on GitHub shook my motor to pieces." }
  ]
};
