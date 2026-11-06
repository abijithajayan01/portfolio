# Abijith Ajayan - Developer Portfolio & Client Conversion Platform

Production-grade, ultra-high performance (<800ms initial load) developer portfolio website tailored specifically for international freelance clients across the US, UK, Europe, and GCC.

---

## ⚡ Performance & Architectural Highlights

- **Target Load Time:** Sub-1 second (< 800ms initial load, zero Cumulative Layout Shift).
- **Zero Heavy Runtime:** Pure, semantic, pre-rendered HTML5 + bespoke high-performance utility CSS. No React/Vue/Next bundle overhead.
- **Aesthetic:** Dark-mode engineering palette (Slate/Zinc `#070a12`, `#0d1322` with luminous Teal `#2dd4bf` & Emerald `#10b981` accents).
- **SEO & Social Graph:** Complete OpenGraph tags, Twitter Large Cards, and schema-compliant JSON-LD (`Person` & `ProfessionalService`).
- **Interactive Features:**
  - Real-time World Clocks (San Francisco, New York, London, Dubai, Bangalore) updating live every second.
  - Interactive Synchronous Overlap Timeline Visualizer (highlighting 4–6 hours daily US/EU overlap).
  - Deep-Dive Case Study Modal with ASCII/Flow architecture diagrams, business problems, technical solutions, and ROI metrics.
  - Interactive Project Inquiry Generator (pre-fills scoped emails & direct WhatsApp links).
  - One-click clipboard copy with animated toast alerts for email and phone.
  - Printable / PDF-ready executive resume (`resume.html`).

---

## 📁 Repository Structure

```
d:/Abijith/portfolio/
├── index.html              # Core single-page portfolio (semantic HTML5, SEO, JSON-LD)
├── resume.html             # Clean printable / downloadable executive resume
├── vercel.json             # Vercel deployment config (clean URLs, security & cache headers)
├── robots.txt              # Search engine crawler permissions
├── sitemap.xml             # XML sitemap for SEO discovery
├── css/
│   └── styles.css          # Design system, glassmorphism, responsive utilities, print styles
├── js/
│   └── main.js             # Lightweight interaction engine (<10KB, zero dependencies)
└── assets/
    └── images/
        ├── abijith-portrait.jpg   # High-resolution executive engineer portrait
        └── og-preview.jpg        # 1200x675 OpenGraph social sharing card
```

---

## 🚀 Instant Deployment to Vercel (Zero Configuration)

### Option 1: Via Vercel CLI
1. Open terminal in the project directory:
   ```bash
   cd d:\Abijith\portfolio
   ```
2. Run Vercel CLI (no build script required, pure static deployment):
   ```bash
   npx vercel
   ```
3. To deploy to production:
   ```bash
   npx vercel --prod
   ```

### Option 2: Via GitHub + Vercel Dashboard
1. Push this directory to your GitHub account (e.g., `github.com/abijith/portfolio`).
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository.
4. Leave Framework Preset as **Other** (Root directory `./`).
5. Click **Deploy**. Vercel will automatically read `vercel.json` and serve the site with edge caching and security headers.

---

## 🛠️ Personalization & Contact Setup

- **Email:** `abijithajayan01@gmail.com`
- **Phone / WhatsApp:** `+91 9605780704`
- **LinkedIn:** `https://www.linkedin.com/in/abijith-ajayan-344909187`
- **Cal.com / Calendly:** Linked to `https://cal.com/abijithajayan`. Update to your specific calendar URL if desired.
