# Laguna-S-2.1 — Local Inference Leaderboard

Interactive benchmark performance leaderboard comparing **llama.cpp mainline** vs **Poolside fork** on the **Laguna-S-2.1** model (`UD-IQ4_XS` quantization, 57.6 GB) across context windows from 128K to 1M tokens.

## 🚀 Live Demo & Deployment

This project is configured for automated deployment to **GitHub Pages** via GitHub Actions.

### Automated GitHub Pages CI/CD
Whenever code is pushed to the `main` branch, the `.github/workflows/deploy.yml` action will automatically build and publish the website to GitHub Pages.

## 📊 Hardware & Test Environment

* **GPU**: NVIDIA RTX 4070 SUPER (12GB VRAM)
* **CPU**: AMD Ryzen 9 7950X3D
* **RAM**: 64GB DDR5
* **Prompt**: Fixed 2,472-token prompt cold prefill & cached decode generation.

## 🛠️ Features

* **GSAP Animated SVG Charts**: Interactive Prefill and Generation speed charts.
* **Context & Build Filters**: Filter by 128K, 256K, 512K, 1M context sizes and build types.
* **Sortable Sweep Table**: Complete results table with peak metric highlights.
* **1-Click Data Export**: Export data to CSV or JSON formats.
* **Dark / Light Theme**: Built-in responsive design system with CSS custom properties.
