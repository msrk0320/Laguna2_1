// Real measured local inference benchmark dataset
export const SYSTEM_SPECS = {
  model: "Laguna-S-2.1",
  quant: "UD-IQ4_XS (57.6 GB)",
  gpu: "NVIDIA RTX 4070 SUPER (12GB VRAM)",
  cpu: "AMD Ryzen 9 7950X3D",
  ram: "64GB DDR5",
  promptTokens: 2472,
  mainlineHead: "llama.cpp mainline",
  forkHead: "Poolside fork (branch laguna, HEAD 04b2b72cb)"
};

export const INITIAL_DATA = [
  { id: 1, label: "mainline", context: 131072, context_label: "128K", prefill_tok_s: 117.5, gen_tok_s: 12.20, peak_vram_gb: null, peak_ram_gb: null, date: "2026-07-24" },
  { id: 2, label: "mainline", context: 262144, context_label: "256K", prefill_tok_s: 117.1, gen_tok_s: 12.28, peak_vram_gb: 9.86, peak_ram_gb: 57.9, date: "2026-07-24" },
  { id: 3, label: "mainline", context: 524288, context_label: "512K", prefill_tok_s: 39.3, gen_tok_s: 8.84, peak_vram_gb: 11.30, peak_ram_gb: 61.0, date: "2026-07-24" },
  { id: 4, label: "mainline", context: 1048576, context_label: "1M", prefill_tok_s: 24.4, gen_tok_s: 7.58, peak_vram_gb: 11.30, peak_ram_gb: 63.4, date: "2026-07-24" },
  { id: 5, label: "poolside-fork", context: 131072, context_label: "128K", prefill_tok_s: 112.6, gen_tok_s: 12.06, peak_vram_gb: null, peak_ram_gb: null, date: "2026-07-24" },
  { id: 6, label: "poolside-fork", context: 262144, context_label: "256K", prefill_tok_s: 95.8, gen_tok_s: 9.94, peak_vram_gb: 9.78, peak_ram_gb: 56.4, date: "2026-07-24" },
  { id: 7, label: "poolside-fork", context: 524288, context_label: "512K", prefill_tok_s: 87.7, gen_tok_s: 11.24, peak_vram_gb: 11.50, peak_ram_gb: 60.0, date: "2026-07-24" },
  { id: 8, label: "poolside-fork", context: 1048576, context_label: "1M", prefill_tok_s: 21.7, gen_tok_s: 6.99, peak_vram_gb: 11.40, peak_ram_gb: 63.4, date: "2026-07-24" },
];

export const BUILD_COLORS = {
  "mainline": "var(--accent-copper)",
  "poolside-fork": "var(--accent-teal)"
};

export const FINDINGS = [
  {
    id: "f1",
    tag: "Prefill Crossover",
    type: "highlight",
    title: "Poolside Fork avoids 3x prefill crater at 512K",
    text: "Mainline drops from 117 tok/s to 39.3 tok/s at 512K, while Poolside fork maintains 87.7 tok/s (2.2x faster). Mainline regains a minor lead at 1M (24.4 vs 21.7 tok/s)."
  },
  {
    id: "f2",
    tag: "Decode Generation",
    type: "info",
    title: "Generation Speed: 7–12.3 tok/s",
    text: "Both builds hover between 7 and 12.3 tok/s with no uniform winner. Speeds degrade equally on both builds once RAM consumption nears capacity at 1M context."
  },
  {
    id: "f3",
    tag: "Context Headroom Cost",
    type: "info",
    title: "Context Ceiling Drag",
    text: "Prefill processing speed drops sharply as configured context (-c) grows, even when testing against the exact same 2,472-token prompt. This reflects memory allocation overhead."
  },
  {
    id: "f4",
    tag: "System Ceiling",
    type: "warning",
    title: "64GB RAM Bottleneck at 1M",
    text: "System RAM, not VRAM, is the true performance ceiling. At 1M context, both builds consume 63.4 GB out of 64 GB RAM (~99% capacity)."
  }
];
