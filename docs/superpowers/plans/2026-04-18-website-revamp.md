# Tech-o Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual and structural revamp of tech-o.co.za -- 4 pages, new design system, 2 new services, SEO optimization, animations.

**Architecture:** Vanilla HTML/CSS/JS static site deployed to GitHub Pages. Single CSS file with custom properties for design tokens. Single shared JS file for navigation, scroll animations, and counters. Page-specific JS for about tabs and contact form. No build step, no frameworks.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, keyframes), vanilla JavaScript (IntersectionObserver, requestAnimationFrame), Google Fonts (Sora + DM Sans), Formspree for contact form.

**Spec:** `docs/superpowers/specs/2026-04-18-website-revamp-design.md`

**Verification:** This is a static HTML/CSS/JS site with no test framework. Verification is done visually by serving the site locally and checking in a browser. Use `npx serve .` or `python3 -m http.server 8000` to serve, then verify each page at `http://localhost:8000`. Use the frontend-design:frontend-design skill when implementing visual components.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `styling/styles.css` | Rewrite | Complete design system: variables, reset, typography, layout, all components, responsive |
| `index.html` | Rewrite | Homepage: hero, partner banner, why-us, services preview, footer |
| `services.html` | Rewrite | Services page: hero, 6 service cards, CTA banner, footer |
| `about.html` | Rewrite | About page: hero, about content + tabs, stats, team, footer |
| `contact.html` | Rewrite | Contact page: hero, contact cards, form, footer |
| `scripts/script.js` | Rewrite | Shared: mobile nav toggle, IntersectionObserver scroll animations, stats counter |
| `scripts/about-tabs.js` | Rewrite | About page: tab switching with fade transitions |
| `scripts/contact-form.js` | Rewrite | Contact page: Formspree submission with inline toast |
| `robots.txt` | Create | Allow all crawlers, reference sitemap |
| `sitemap.xml` | Rewrite | Updated URLs, dates, priorities |
| `images/partners/` | Create dir | Reorganize existing partner logos into subdirectory |

---

### Task 1: CSS Design System Foundation

**Files:**
- Rewrite: `styling/styles.css`

This task creates the complete CSS file. All subsequent HTML tasks depend on these styles being in place.

- [ ] **Step 1: Write the CSS custom properties and reset**

Write the top of `styling/styles.css` with CSS reset, custom properties for the full color palette, typography, spacing, and radii:

```css
/* ============================================
   Tech-o Design System
   Direction: Bold & Clean
   Fonts: Sora (headlines) + DM Sans (body)
   ============================================ */

/* --- Reset --- */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colors */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-light: #3B82F6;
  --color-accent: #10B981;
  --color-text: #111827;
  --color-text-secondary: #6B7280;
  --color-bg: #F9FAFB;
  --color-surface: #FFFFFF;
  --color-stats-bg: #EFF6FF;
  --color-dark: #111827;
  --color-border: #E5E7EB;

  /* Typography */
  --font-heading: 'Sora', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 100px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-hover: 0 12px 32px rgba(0, 0, 0, 0.15);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  flex: 1 0 auto;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-hover);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}
```

- [ ] **Step 2: Add typography styles**

Append to `styling/styles.css`:

```css
/* --- Typography --- */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.2;
  color: var(--color-text);
}

h1 {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
}

h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.section-title {
  text-align: center;
  margin-bottom: var(--space-xl);
  color: var(--color-text);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-2xl);
  font-size: 1.1rem;
}
```

- [ ] **Step 3: Add header and navigation styles**

Append to `styling/styles.css`:

```css
/* --- Header & Navigation --- */
header {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.logo img {
  height: 40px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: var(--space-lg);
}

nav ul li a {
  color: var(--color-text);
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  padding: var(--space-xs) 0;
}

nav ul li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width var(--transition-base);
}

nav ul li a:hover::after,
nav ul li a.active::after {
  width: 100%;
}

nav ul li a:hover {
  color: var(--color-primary);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
  padding: var(--space-xs);
}
```

- [ ] **Step 4: Add hero section styles**

Append to `styling/styles.css`:

```css
/* --- Hero Sections --- */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px var(--space-lg) var(--space-3xl);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1e40af 70%, #2563eb 100%);
  color: white;
}

.hero--short {
  min-height: 60vh;
}

.hero h1 {
  color: white;
  margin-bottom: var(--space-md);
  max-width: 800px;
}

.hero p {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin-bottom: var(--space-xl);
  line-height: 1.7;
}

/* Geometric decoration for heroes */
.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -15%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%);
  pointer-events: none;
}

/* Hero fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero h1 {
  animation: fadeInUp 0.8s ease forwards;
}

.hero p {
  animation: fadeInUp 0.8s ease 0.15s forwards;
  opacity: 0;
}

.hero .cta-buttons {
  animation: fadeInUp 0.8s ease 0.3s forwards;
  opacity: 0;
}
```

- [ ] **Step 5: Add button styles**

Append to `styling/styles.css`:

```css
/* --- Buttons --- */
.cta-buttons {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: var(--font-body);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all var(--transition-base);
  border: 2px solid transparent;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  color: white;
  transform: scale(1.02);
}

.btn-outline {
  background-color: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
  color: white;
  transform: scale(1.02);
}

.btn-dark {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.btn-dark:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  color: white;
  transform: scale(1.02);
}
```

- [ ] **Step 6: Add partner banner / marquee styles**

Append to `styling/styles.css`:

```css
/* --- Partner Logo Marquee --- */
.partners {
  background-color: var(--color-surface);
  padding: var(--space-2xl) 0;
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.partners-label {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: var(--space-lg);
}

.marquee {
  display: flex;
  overflow: hidden;
  position: relative;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: var(--space-3xl);
  animation: marquee 30s linear infinite;
  flex-shrink: 0;
}

.marquee-track img {
  height: 40px;
  filter: grayscale(100%) opacity(0.5);
  transition: filter var(--transition-base);
  flex-shrink: 0;
}

.marquee-track img:hover {
  filter: grayscale(0%) opacity(1);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

- [ ] **Step 7: Add feature cards and service cards styles**

Append to `styling/styles.css`:

```css
/* --- Section Spacing --- */
.section {
  padding: var(--space-3xl) 0;
}

.section--alt {
  background-color: var(--color-surface);
}

/* --- Feature Cards (Why Choose Us) --- */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.feature-card {
  background-color: var(--color-surface);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.feature-card .icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-md);
  color: var(--color-primary);
}

.feature-card h3 {
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}

.feature-card p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* --- Services Grid --- */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.service-card {
  background-color: var(--color-surface);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.service-card .icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-md);
  color: var(--color-primary);
}

.service-card h3 {
  margin-bottom: var(--space-sm);
}

.service-card p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: var(--space-md);
}

.service-card .learn-more {
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.service-card .learn-more::after {
  content: '\2192';
  transition: transform var(--transition-fast);
}

.service-card:hover .learn-more::after {
  transform: translateX(4px);
}
```

- [ ] **Step 8: Add CTA banner styles**

Append to `styling/styles.css`:

```css
/* --- CTA Banner --- */
.cta-banner {
  background-color: var(--color-dark);
  color: white;
  padding: var(--space-3xl) 0;
  text-align: center;
}

.cta-banner h2 {
  color: white;
  margin-bottom: var(--space-md);
}

.cta-banner p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin-bottom: var(--space-xl);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
```

- [ ] **Step 9: Add about page specific styles (tabs, stats, team)**

Append to `styling/styles.css`:

```css
/* --- About Content --- */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: start;
}

.about-text h2 {
  margin-bottom: var(--space-md);
}

.about-text p {
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-md);
}

/* Decorative geometric visual */
.about-visual {
  position: relative;
  height: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
}

.about-visual::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 15%;
  width: 200px;
  height: 200px;
  border: 3px solid var(--color-primary);
  border-radius: var(--radius-lg);
  opacity: 0.3;
  transform: rotate(15deg);
}

.about-visual::after {
  content: '';
  position: absolute;
  bottom: 15%;
  right: 10%;
  width: 150px;
  height: 150px;
  background: var(--color-primary);
  border-radius: 50%;
  opacity: 0.08;
}

/* --- Tabs --- */
.tab-buttons {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.tab-btn {
  background: none;
  border: none;
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  font-weight: 600;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  position: relative;
  transition: color var(--transition-fast);
}

.tab-btn:hover {
  color: var(--color-primary);
}

.tab-btn.active {
  color: var(--color-primary);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
}

.tab-content {
  display: none;
  animation: fadeIn 0.4s ease;
}

.tab-content.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- Stats Section --- */
.stats {
  background-color: var(--color-stats-bg);
  padding: var(--space-3xl) 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  text-align: center;
}

.stat-item h3 {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-primary);
  margin-bottom: var(--space-xs);
}

.stat-item p {
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* --- Team Section --- */
.team-grid {
  display: flex;
  justify-content: center;
  gap: var(--space-3xl);
}

.team-member {
  text-align: center;
}

.team-member img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto var(--space-md);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  border: 4px solid var(--color-border);
}

.team-member img:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

.team-member h3 {
  margin-bottom: var(--space-xs);
}

.team-member p {
  color: var(--color-text-secondary);
}
```

- [ ] **Step 10: Add contact page styles**

Append to `styling/styles.css`:

```css
/* --- Contact Page --- */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
}

.contact-info h2,
.contact-form-section h2 {
  margin-bottom: var(--space-lg);
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.contact-card {
  background-color: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.contact-card h3 {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
  font-size: 1.1rem;
}

.contact-card h3 svg {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.contact-card p {
  color: var(--color-text-secondary);
  margin-bottom: 4px;
  font-size: 0.95rem;
}

.contact-card a {
  font-weight: 500;
}

/* --- Form Styles --- */
.form-group {
  margin-bottom: var(--space-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  background-color: var(--color-surface);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.form-group textarea {
  height: 160px;
  resize: vertical;
}

/* --- Toast Notification --- */
.toast {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.95rem;
  margin-top: var(--space-md);
  animation: fadeIn 0.4s ease;
  display: none;
}

.toast--success {
  display: block;
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.toast--error {
  display: block;
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
```

- [ ] **Step 11: Add footer styles**

Append to `styling/styles.css`:

```css
/* --- Footer --- */
footer {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: var(--space-2xl) 0;
  flex-shrink: 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.footer-logo img {
  height: 36px;
}

.footer-divider {
  height: 30px;
  width: 1px;
  background-color: var(--color-border);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-contact a {
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-nav {
  display: flex;
  gap: var(--space-lg);
}

.footer-nav a {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-nav a:hover {
  color: var(--color-primary);
}

.footer-copyright {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}
```

- [ ] **Step 12: Add scroll animation and responsive styles**

Append to `styling/styles.css`:

```css
/* --- Scroll Animations --- */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Responsive: Tablet (768px - 1024px) --- */
@media (max-width: 1024px) {
  .features-grid,
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-content,
  .contact-content {
    grid-template-columns: 1fr;
  }

  .about-visual {
    height: 300px;
  }
}

/* --- Responsive: Mobile (< 768px) --- */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  nav ul {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--color-surface);
    box-shadow: var(--shadow-md);
    padding: var(--space-sm) 0;
  }

  nav ul.show {
    display: flex;
  }

  nav ul li a {
    display: block;
    padding: var(--space-sm) var(--space-lg);
    text-align: center;
  }

  nav ul li a::after {
    display: none;
  }

  .hero {
    min-height: 80vh;
    padding: 100px var(--space-md) var(--space-2xl);
  }

  .hero--short {
    min-height: 50vh;
  }

  .features-grid,
  .services-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    flex-direction: column;
    align-items: center;
    gap: var(--space-2xl);
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-lg);
  }

  .footer-left {
    flex-direction: column;
  }

  .footer-divider {
    display: none;
  }

  .footer-nav {
    justify-content: center;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }
}

/* --- Reduced Motion --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .animate-on-scroll {
    opacity: 1;
    transform: none;
  }

  .marquee-track {
    animation: none;
  }

  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 13: Verify CSS file and commit**

Serve the site locally and open in browser to confirm CSS loads without errors:

```bash
python3 -m http.server 8000 &
# Open http://localhost:8000 -- page will look broken (old HTML) but CSS should load without console errors
```

Commit:

```bash
git add styling/styles.css
git commit -m "styling: Complete CSS design system rewrite

New design system with Bold & Clean direction: Sora + DM Sans typography,
blue primary palette, CSS custom properties, responsive breakpoints,
scroll animations, marquee, reduced motion support."
```

---

### Task 2: Shared JavaScript (Navigation, Scroll Animations, Counters)

**Files:**
- Rewrite: `scripts/script.js`

- [ ] **Step 1: Write mobile nav toggle**

Rewrite `scripts/script.js`:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Navigation Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');

  if (menuToggle && navUl) {
    menuToggle.addEventListener('click', function () {
      navUl.classList.toggle('show');
      // Toggle aria-expanded for accessibility
      const expanded = navUl.classList.contains('show');
      menuToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when a link is clicked
    navUl.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navUl.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll Animations (IntersectionObserver) ---
  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach(function (el, index) {
      // Add stagger delay for elements in the same parent
      el.style.transitionDelay = (index % 3) * 100 + 'ms';
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Stats Counter Animation ---
  var statNumbers = document.querySelectorAll('[data-count]');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      statsObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add scripts/script.js
git commit -m "scripts: Rewrite shared JS with nav toggle, scroll animations, stat counters

IntersectionObserver for scroll-triggered fade-ins with stagger delay.
requestAnimationFrame counter animation for stats section.
Accessible mobile nav with aria-expanded."
```

---

### Task 3: About Tabs JavaScript

**Files:**
- Rewrite: `scripts/about-tabs.js`

- [ ] **Step 1: Rewrite tabs script**

Rewrite `scripts/about-tabs.js`:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  var tabButtons = document.querySelectorAll('.tab-btn');
  var tabContents = document.querySelectorAll('.tab-content');

  function activateTab(tabId) {
    tabButtons.forEach(function (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabContents.forEach(function (content) {
      content.classList.remove('active');
    });

    var selectedButton = document.querySelector('[data-tab="' + tabId + '"]');
    var selectedContent = document.getElementById(tabId);

    if (selectedButton && selectedContent) {
      selectedButton.classList.add('active');
      selectedButton.setAttribute('aria-selected', 'true');
      selectedContent.classList.add('active');
    }
  }

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activateTab(this.getAttribute('data-tab'));
    });
  });

  // Activate first tab by default
  if (tabButtons.length > 0) {
    activateTab(tabButtons[0].getAttribute('data-tab'));
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add scripts/about-tabs.js
git commit -m "scripts: Rewrite about tabs with aria-selected accessibility"
```

---

### Task 4: Contact Form JavaScript

**Files:**
- Rewrite: `scripts/contact-form.js`

- [ ] **Step 1: Rewrite contact form script with inline toast**

Rewrite `scripts/contact-form.js`:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var toast = document.getElementById('form-toast');
  var submitBtn = form.querySelector('button[type="submit"]');
  var originalBtnText = submitBtn ? submitBtn.textContent : 'Send Message';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Disable button during submission
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Hide any previous toast
    if (toast) {
      toast.className = 'toast';
      toast.textContent = '';
    }

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    })
      .then(function (response) {
        if (response.ok) {
          showToast('success', 'Thank you for your message! We will get back to you soon.');
          form.reset();
        } else {
          showToast('error', 'Something went wrong. Please try again or contact us directly.');
        }
      })
      .catch(function () {
        showToast('error', 'Something went wrong. Please try again or contact us directly.');
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      });
  });

  function showToast(type, message) {
    if (!toast) return;
    toast.className = 'toast toast--' + type;
    toast.textContent = message;

    // Auto-hide after 6 seconds
    setTimeout(function () {
      toast.className = 'toast';
      toast.textContent = '';
    }, 6000);
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add scripts/contact-form.js
git commit -m "scripts: Rewrite contact form with inline toast notifications

Replace browser alert() with styled inline toast. Add loading state
on submit button. Auto-hide toast after 6 seconds."
```

---

### Task 5: Reorganize Partner Logo Images

**Files:**
- Create directory: `images/partners/`
- Move existing logo files

- [ ] **Step 1: Create partners directory and copy logos**

```bash
mkdir -p images/partners
cp images/yeastar-logo.png images/partners/yeastar.png
cp images/Ericsson-logo.png images/partners/ericsson.png
cp images/mitel-vector-logo.png images/partners/mitel.png
cp images/Aastra_Technologies_logo.svg.png images/partners/aastra.png
cp images/NEC-Logo.wine.png images/partners/nec.png
cp images/grandstream-logo.com.png images/partners/grandstream.png
cp images/Hikvision_logo.png images/partners/hikvision.png
cp images/dahua.png images/partners/dahua.png
```

- [ ] **Step 2: Commit**

```bash
git add images/partners/
git commit -m "images: Reorganize partner logos into partners/ subdirectory"
```

---

### Task 6: Homepage (index.html)

**Files:**
- Rewrite: `index.html`

Use the frontend-design:frontend-design skill when implementing this page. The design direction is Bold & Clean with Sora + DM Sans typography, blue `#2563EB` primary color. Follow the spec section 5.1 exactly.

- [ ] **Step 1: Write the complete index.html**

Rewrite `index.html` with all sections: head (SEO meta, OG tags, JSON-LD), header/nav, hero, partner marquee, why-us features, services preview, footer.

The full HTML must include:
- `<head>`: charset, viewport, google-site-verification, title, meta description, canonical, OG tags, JSON-LD LocalBusiness schema, Google Fonts link, CSS link
- Header: logo, nav links (Home active), hamburger
- Hero (100vh): h1 "Your Business, Better Connected.", subtext, two pill CTAs
- Partner banner: "Trusted Partner Brands" label, marquee with 8 logos (duplicated for seamless loop), referencing `images/partners/` paths
- Why Choose Tech-o: 3 feature cards with inline SVG icons, `.animate-on-scroll` class
- Services Preview: "What We Do" h2, 6 compact service cards with inline SVG icons, one-liner descriptions, "Learn More" links to services.html, `.animate-on-scroll` class
- Footer: logo, divider, contact links, nav links, copyright 2026

SVG icons to use (inline in HTML):
- Freelance Flexibility: a refresh/cycle icon
- Customized Solutions: a settings/gear icon
- Cost-Effective Services: a wallet/savings icon
- Telephony: a phone icon
- Networking: a globe/network icon
- Security: a shield icon
- Computer/Hardware: a monitor icon
- Web Design: a code/browser icon
- Android App: a smartphone icon

- [ ] **Step 2: Verify in browser**

Serve and check:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000` and verify:
- Hero loads with staggered fade-in animation
- Partner logos scroll in marquee, pause on hover, colorize on hover
- Feature cards fade in on scroll
- Service preview cards fade in on scroll
- Footer displays correctly
- Navigation links work
- Mobile hamburger menu works (resize browser to < 768px)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "index: Complete homepage rewrite with new design system

Hero with gradient background and staggered animations, partner logo
marquee, Why Choose section, Services Preview section, SEO meta tags,
Open Graph, JSON-LD LocalBusiness schema, inline SVG icons."
```

---

### Task 7: Services Page (services.html)

**Files:**
- Rewrite: `services.html`

Use the frontend-design:frontend-design skill. Follow spec section 5.2.

- [ ] **Step 1: Write the complete services.html**

Rewrite `services.html` with:
- `<head>`: SEO meta (title, description per spec), canonical, OG tags, JSON-LD Service schema for all 6 services, BreadcrumbList schema, Google Fonts, CSS
- Header/nav (Services active)
- Hero (60vh, `.hero--short`): h1 "Our Services", subtext, single CTA "Get a Quote"
- Services grid: 6 cards with inline SVG icons, h3 names, 2-3 sentence descriptions, `.animate-on-scroll`
  1. Complete Telephony Services
  2. Professional Network Installation & Maintenance
  3. Advanced Security & Surveillance Systems
  4. Comprehensive Computer & Hardware Solutions
  5. Web Design & Development (NEW)
  6. Android App Development (NEW)
- CTA banner: dark background, "Ready to get started?", pill CTA to contact.html
- Footer (same as homepage)

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8000/services.html` and verify:
- Hero displays at 60vh with gradient
- All 6 service cards render in 3-col grid
- Cards fade in on scroll
- CTA banner visible at bottom
- Mobile responsive layout (check at < 768px)

- [ ] **Step 3: Commit**

```bash
git add services.html
git commit -m "services: Complete services page rewrite with 6 services

Add Web Design and Android App Development as new services.
SEO meta, JSON-LD Service schema, CTA banner, inline SVG icons."
```

---

### Task 8: About Page (about.html)

**Files:**
- Rewrite: `about.html`

Use the frontend-design:frontend-design skill. Follow spec section 5.3.

- [ ] **Step 1: Write the complete about.html**

Rewrite `about.html` with:
- `<head>`: SEO meta (title, description per spec), canonical, OG tags, BreadcrumbList schema, Google Fonts, CSS
- Header/nav (About active)
- Hero (60vh, `.hero--short`): h1 "About Us", subtext, CTA "Get in Touch"
- About content section: two-column grid
  - Left: refreshed company intro (keep Bentronix mention), Mission/Vision/Values tabs
  - Right: `.about-visual` decorative CSS geometric element
- Stats section (`.stats`): 3 stat items with `data-count` and `data-suffix` attributes for counter animation
  - "15+" Years Experience (`data-count="15"` `data-suffix="+"`)
  - "99%" Customer Satisfaction (`data-count="99"` `data-suffix="%"`)
  - "100+" Projects Completed (`data-count="100"` `data-suffix="+"`)
- Team section: 2 team members centered
  - Paul Van Straaten, Head Engineer, `images/paul.png`, alt="Paul Van Straaten"
  - Riaan Van Straaten, Network Administrator, `images/riaan.jpg`, alt="Riaan Van Straaten" (fix the current broken alt text)
- Footer

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8000/about.html` and verify:
- Hero at 60vh
- Two-column about content with geometric visual on right
- Tabs switch between Mission, Vision, Values with fade animation
- Stats numbers count up when scrolled into view
- Team photos display in circles, scale on hover
- Mobile layout stacks correctly

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "about: Complete about page rewrite with tabs, stats counter, team

Two-column layout with geometric visual, restyled tabs, animated
stat counters, fixed Riaan alt text, SEO meta and BreadcrumbList."
```

---

### Task 9: Contact Page (contact.html)

**Files:**
- Rewrite: `contact.html`

Use the frontend-design:frontend-design skill. Follow spec section 5.4.

- [ ] **Step 1: Write the complete contact.html**

Rewrite `contact.html` with:
- `<head>`: SEO meta (title, description per spec), canonical, OG tags, BreadcrumbList schema, Google Fonts, CSS
- Header/nav (Contact active)
- Hero (60vh, `.hero--short`): h1 "Get In Touch", subtext
- Contact content section: two-column grid
  - Left: h2 "Contact Information", 3 contact cards with inline SVG icons (envelope, phone, headset):
    - General Inquiries: paul@tech-o.co.za, (031) 109 5092
    - Sales: riaan@tech-o.co.za, +27 (64) 999-9409
    - Customer Support: support@tech-o.co.za, (031) 109 5092
  - Right: h2 "Send Us a Message", form with id="contact-form", action="https://formspree.io/f/mzzpgyye", method="post"
    - Name input, Email input, Message textarea
    - Submit button with class `btn btn-primary`
    - `<div id="form-toast" class="toast"></div>` for inline notifications
- Footer
- Scripts: script.js + contact-form.js

Fix: No orphaned `</div>` tags. Clean, valid HTML.

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8000/contact.html` and verify:
- Hero at 60vh
- Contact cards display with hover effects
- Form fields have blue focus glow
- Submit button styled as pill
- No broken HTML (check DevTools console for errors)
- Mobile layout stacks info above form

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "contact: Complete contact page rewrite with inline toast

Three contact cards with SVG icons, styled form with focus states,
inline toast notifications replacing alert(), fixed broken HTML."
```

---

### Task 10: SEO Assets (robots.txt, sitemap.xml)

**Files:**
- Create: `robots.txt`
- Rewrite: `sitemap.xml`

- [ ] **Step 1: Create robots.txt**

Create `robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://tech-o.co.za/sitemap.xml
```

- [ ] **Step 2: Update sitemap.xml**

Rewrite `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://tech-o.co.za/</loc>
        <lastmod>2026-04-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://tech-o.co.za/services.html</loc>
        <lastmod>2026-04-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://tech-o.co.za/about.html</loc>
        <lastmod>2026-04-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://tech-o.co.za/contact.html</loc>
        <lastmod>2026-04-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
</urlset>
```

- [ ] **Step 3: Commit**

```bash
git add robots.txt sitemap.xml
git commit -m "seo: Add robots.txt and update sitemap with current dates"
```

---

### Task 11: Favicon Generation

**Files:**
- Create: `favicon.ico`
- Create: `favicon-32x32.png`
- Create: `favicon-16x16.png`
- Create: `apple-touch-icon.png`
- Create: `site.webmanifest`

The existing logo (`images/logo-no-background.png`) needs to be converted into favicon files so the Tech-o logo appears in Google search results, browser tabs, and bookmarks instead of a generic globe icon.

- [ ] **Step 1: Generate favicon files from the logo**

Use ImageMagick (or Python Pillow) to resize the logo into favicon sizes:

```bash
# Install ImageMagick if not present
sudo apt-get install -y imagemagick

# Generate favicon sizes from logo
convert images/logo-no-background.png -resize 16x16 -gravity center -background white -extent 16x16 favicon-16x16.png
convert images/logo-no-background.png -resize 32x32 -gravity center -background white -extent 32x32 favicon-32x32.png
convert images/logo-no-background.png -resize 180x180 -gravity center -background white -extent 180x180 apple-touch-icon.png
convert images/logo-no-background.png -resize 192x192 -gravity center -background white -extent 192x192 images/icon-192x192.png
convert images/logo-no-background.png -resize 512x512 -gravity center -background white -extent 512x512 images/icon-512x512.png
convert favicon-32x32.png favicon-16x16.png favicon.ico
```

If ImageMagick is not available, use Python Pillow as fallback:

```python
from PIL import Image
img = Image.open('images/logo-no-background.png')
# Generate sizes and save
```

- [ ] **Step 2: Create site.webmanifest**

Create `site.webmanifest`:

```json
{
  "name": "Tech-o",
  "short_name": "Tech-o",
  "icons": [
    { "src": "/images/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#2563EB",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

- [ ] **Step 3: Add favicon link tags to all HTML pages**

Add the following inside `<head>` of every HTML page (index.html, about.html, services.html, contact.html):

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

- [ ] **Step 4: Commit**

```bash
git add favicon.ico favicon-16x16.png favicon-32x32.png apple-touch-icon.png site.webmanifest images/icon-192x192.png images/icon-512x512.png
git commit -m "seo: Add favicon and web manifest for search result branding

Tech-o logo now appears in Google search results, browser tabs,
bookmarks, and mobile home screens."
```

---

### Task 12: Final Visual Verification

**Files:** None (verification only)

- [ ] **Step 1: Serve the site and verify all pages**

```bash
python3 -m http.server 8000
```

Open each page and check:
- `http://localhost:8000` -- homepage hero, marquee, cards, services preview, footer
- `http://localhost:8000/about.html` -- hero, about content, tabs, stats counter, team
- `http://localhost:8000/services.html` -- hero, 6 service cards, CTA banner
- `http://localhost:8000/contact.html` -- hero, contact cards, form, toast

For each page verify:
- No console errors
- All animations fire correctly
- Mobile nav works (resize to < 768px)
- All links navigate correctly between pages
- Partner logos marquee runs smoothly
- Stats count up once when scrolled into view

- [ ] **Step 2: Verify SEO elements**

For each page, check in DevTools Elements panel:
- Single h1 tag
- Unique title tag
- Meta description present
- OG tags present
- JSON-LD script present (homepage: LocalBusiness, services: Service schemas)
- Canonical URL present
- All images have descriptive alt text
- Favicon displays in browser tab (Tech-o logo, not generic globe)

- [ ] **Step 3: Fix any issues found**

Address any visual or functional issues discovered during verification.

- [ ] **Step 4: Final commit if fixes were needed**

```bash
git add -A
git commit -m "fix: Address issues found during final verification"
```
