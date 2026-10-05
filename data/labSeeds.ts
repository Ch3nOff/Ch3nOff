import type { LabBench } from '@/lib/labTypes';

/**
 * Seed entries for the Research Lab.
 * Used as (a) offline fallback when Supabase env vars are absent and
 * (b) initial rows to copy into the `lab_benches` table on first deploy.
 */
export const labSeedEntries: LabBench[] = [
  {
    id: 'bench-seed-01',
    author: 'Ch3nOff',
    kind: 'EXPERIMENT',
    status: 'RUNNING',
    title: 'KV-cache saturation under 15W NPU power envelope',
    body:
      'Hypothesis: a grouped-subspace latent attention layout keeps tokens/sec flat until the KV cache crosses ~78% of available NPU SRAM, after which decode latency triples.\n\nBench protocol: Intel Core Ultra iGPU, llama.cpp fork, 350M MoE routing, batch=1 decode, context swept 512→4096. Logging tok/s every 32 tokens.\n\nPreliminary curve matches the hypothesis at ctx=2048. Next run adds anti-windup-style eviction clamping.',
    tags: ['SLM', 'NPU', 'KV-CACHE'],
    reactions: { replicate: 4, insight: 7, question: 2 },
    created_at: '2026-09-24T13:20:00Z',
  },
  {
    id: 'bench-seed-02',
    author: 'Ch3nOff',
    kind: 'THOUGHT',
    status: 'SETTLED',
    title: 'Packaging IS design',
    body:
      'Zero mandatory dependencies in dual-loop-controller isn\'t a flex — it is what lets an ESP32 on MicroPython and a student\'s Raspberry Pi execute byte-for-byte the same cascaded loop. If your library only runs where the GPU is, it only teaches where the GPU is.',
    tags: ['PYPI', 'PYTHON', 'ETHOS'],
    reactions: { replicate: 9, insight: 12, question: 0 },
    created_at: '2026-09-19T15:47:00Z',
  },
  {
    id: 'bench-seed-03',
    author: 'Ch3nOff',
    kind: 'EXPERIMENT',
    status: 'FAILED',
    title: 'Deadband dither on Coulomb-friction stepper bench',
    body:
      'Tried a ±3% PWM triangle dither at 200 Hz to break stiction before the position error integrated. Result: audible whine, no measurable overshoot improvement, thermal drift on the driver.\n\nLogged as failed. The inner velocity loop still wins over any open-loop dither trick. Math won\'t unstick a physically sticking actuator.',
    tags: ['CONTROL_SYSTEMS', 'STEPPER', 'ANTI_PATTERNS'],
    reactions: { replicate: 2, insight: 5, question: 1 },
    created_at: '2026-09-11T09:05:00Z',
  },
  {
    id: 'bench-seed-04',
    author: 'Ch3nOff',
    kind: 'RESEARCH',
    status: 'PEER_REVIEW',
    title: 'BLE mesh beacon latency budget for emergency scenarios',
    body:
      'Draft notes for the flood-warning beacon network: 3-hop flood with 1 s advertise interval gives p95 delivery ≈ 2.8 s across 12 nodes. Needs review — especially the claim that connectionless flooding survives a 40% packet-loss corridor.',
    tags: ['ESP32', 'BLE_MESH', 'SAFETY'],
    reactions: { replicate: 3, insight: 4, question: 3 },
    created_at: '2026-08-30T10:15:00Z',
  },
];
