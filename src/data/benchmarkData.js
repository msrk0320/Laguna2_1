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
  { id: 9, label: "mainline", context: 4096, context_label: "4K", prefill_tok_s: 34.48, gen_tok_s: 10.68, peak_vram_gb: 6.2, peak_ram_gb: 57.23, date: "2026-07-24", note: "cold OS page cache, first run of the session — not comparable to the rest of this row's build" },
  { id: 10, label: "mainline", context: 8192, context_label: "8K", prefill_tok_s: 120.53, gen_tok_s: 11.36, peak_vram_gb: 6.3, peak_ram_gb: 57.07, date: "2026-07-24" },
  { id: 11, label: "mainline", context: 16384, context_label: "16K", prefill_tok_s: 121.33, gen_tok_s: 11.27, peak_vram_gb: 6.4, peak_ram_gb: 57.11, date: "2026-07-24" },
  { id: 12, label: "mainline", context: 32768, context_label: "32K", prefill_tok_s: 120.21, gen_tok_s: 12.28, peak_vram_gb: 6.7, peak_ram_gb: 56.88, date: "2026-07-24" },
  { id: 13, label: "mainline", context: 65536, context_label: "64K", prefill_tok_s: 120.33, gen_tok_s: 12.22, peak_vram_gb: 7.1, peak_ram_gb: 56.94, date: "2026-07-24" },
  { id: 14, label: "poolside-fork", context: 4096, context_label: "4K", prefill_tok_s: 113.78, gen_tok_s: 12.09, peak_vram_gb: 6.3, peak_ram_gb: 57.32, date: "2026-07-24" },
  { id: 15, label: "poolside-fork", context: 8192, context_label: "8K", prefill_tok_s: 114.51, gen_tok_s: 12.16, peak_vram_gb: 6.3, peak_ram_gb: 57.23, date: "2026-07-24" },
  { id: 16, label: "poolside-fork", context: 16384, context_label: "16K", prefill_tok_s: 115.64, gen_tok_s: 12.14, peak_vram_gb: 6.5, peak_ram_gb: 57.42, date: "2026-07-24" },
  { id: 17, label: "poolside-fork", context: 32768, context_label: "32K", prefill_tok_s: 114.81, gen_tok_s: 12.10, peak_vram_gb: 6.7, peak_ram_gb: 57.58, date: "2026-07-24" },
  { id: 18, label: "poolside-fork", context: 65536, context_label: "64K", prefill_tok_s: 116.63, gen_tok_s: 12.31, peak_vram_gb: 7.1, peak_ram_gb: 57.40, date: "2026-07-24" },
];

export const BUILD_COLORS = {
  "mainline": "var(--accent-copper)",
  "poolside-fork": "var(--accent-teal)"
};

export const FINDINGS = [
  {
    id: "f1",
    tag: "No real gap below 128K",
    type: "info",
    title: "Identical performance 4K–64K",
    text: "4K through 64K, both builds prefill at 113–121 tok/s and decode at 11–12 tok/s — differences are within run-to-run noise. The builds only start to diverge once context passes 128K."
  },
  {
    id: "f2",
    tag: "Prefill Crossover",
    type: "highlight",
    title: "Poolside Fork avoids 3x prefill crater at 512K",
    text: "Mainline wins prefill at 128K (117.5 vs 112.6) and 256K (117.1 vs 95.8). Poolside wins big at 512K (87.7 vs 39.3 — mainline's crater doesn't happen on the fork). Mainline wins again at 1M (24.4 vs 21.7)."
  },
  {
    id: "f3",
    tag: "Decode Generation",
    type: "info",
    title: "Generation Speed: 7–12.3 tok/s",
    text: "Both builds hover between 7 and 12.3 tok/s with no uniform winner, and both degrade similarly at 1M as system RAM capacity nears its limit."
  },
  {
    id: "f4",
    tag: "Memory Footprint",
    type: "info",
    title: "VRAM & RAM Scaling",
    text: "VRAM climbs smoothly with context (~6.2GB at 4K to ~11.4GB at 1M), matching within ~0.2GB between builds. RAM stays flat around 57GB through 64K, only climbing past 256K."
  },
  {
    id: "f5",
    tag: "System Ceiling",
    type: "warning",
    title: "64GB RAM Bottleneck at 1M",
    text: "System RAM, not VRAM, is the true performance ceiling — 63.4 out of 64GB consumed on both builds at 1M context."
  },
  {
    id: "f6",
    tag: "Methodology Note",
    type: "warning",
    title: "Cold Page Cache Outlier at 4K",
    text: "Mainline's 4K point (34.5 tok/s prefill) is a session-cold outlier from being the first request after boot before the 57.6GB model file was paged into RAM. Warm runs yield ~113.8 tok/s."
  }
];
