# Tech-o Website Revamp -- Design Specification

**Date:** 2026-04-18
**Status:** Approved
**Domain:** tech-o.co.za
**Hosting:** GitHub Pages (static HTML/CSS/JS, no build step)

---

## 1. Overview

Complete visual and structural revamp of the Tech-o website (tech-o.co.za), a 4-page static site for a Durban-based telecommunications and IT services company. The revamp modernizes the design, adds two new services (Web Design, Android App Development), refreshes all copy, and implements comprehensive SEO optimization.

## 2. Business Context

- **Company:** Tech-o (sister company: Bentronix for hardware)
- **Team:** Paul Van Straaten (Head Engineer), Riaan Van Straaten (Network Administrator)
- **Location:** Durban, KwaZulu-Natal, South Africa
- **Clients:** SMBs in Durban/KZN for on-site services; businesses across SA for remote services (telephony hosting, web design, app dev)
- **Contact form recipients:** paul@tech-o.co.za (existing Formspree) + joshuavanstraaten100@gmail.com (add via Formspree dashboard)

## 3. Design Direction: Bold & Clean

### Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary | Blue | `#2563EB` |
| Primary hover | Dark blue | `#1D4ED8` |
| Secondary/accent | Blue light | `#3B82F6` |
| Success/CTA accent | Green | `#10B981` |
| Text primary | Near black | `#111827` |
| Text secondary | Gray | `#6B7280` |
| Background | Off-white | `#F9FAFB` |
| Surface | White | `#FFFFFF` |
| Stats/accent bg | Light blue | `#EFF6FF` |
| Footer bg | Light gray | `#F9FAFB` |

### Typography

| Role | Font | Weight | Source |
|---|---|---|---|
| Headlines (h1-h3) | Sora | 600, 700 | Google Fonts |
| Body text | DM Sans | 400, 500, 700 | Google Fonts |

Both loaded via `<link>` with `font-display: swap`.

### Design Principles

- Clean white base with bold blue primary
- Generous whitespace and clear visual hierarchy
- Pill-shaped CTA buttons
- Rounded corners (12-16px on cards, 8px on inputs)
- Subtle shadows for depth, deeper on hover
- Professional and trustworthy -- optimized for B2B service conversion

## 4. File Structure

```
/
├── index.html
├── about.html
├── services.html
├── contact.html
├── robots.txt                  (NEW)
├── sitemap.xml                 (updated)
├── CNAME
├── .gitignore
├── styling/
│   └── styles.css              (complete rewrite)
├── scripts/
│   ├── script.js               (rewritten -- nav, scroll animations, counters)
│   ├── about-tabs.js           (rewritten)
│   └── contact-form.js         (rewritten -- inline toast instead of alert())
└── images/
    ├── logo-no-background.png  (keep)
    ├── paul.png                (keep)
    ├── riaan.jpg               (keep)
    ├── (hero backgrounds are CSS gradient-based, no image files needed)
    ├── partners/               (existing brand logos, reorganized)
    │   ├── yeastar.png
    │   ├── ericsson.png
    │   ├── mitel.png
    │   ├── aastra.png
    │   ├── nec.png
    │   ├── grandstream.png
    │   ├── hikvision.png
    │   └── dahua.png
    └── icons/                  (NEW -- inline SVGs preferred, fallback files)
```

## 5. Page Specifications

### 5.1 Homepage (index.html)

**Title:** `Tech-o | Telecommunications & IT Solutions Durban`
**Meta description:** `Expert telecommunications, networking, security & IT solutions in Durban & KZN. 15+ years experience. Telephony, CCTV, networking, web design & app development.`

**Sections in order:**

1. **Hero** (100vh)
   - Full-viewport with CSS gradient background (brand blues + dark navy)
   - H1: "Your Business, Better Connected."
   - Subtext: "Expert telecommunications, networking, security, and digital solutions across KwaZulu-Natal and South Africa."
   - Two pill CTAs: "Our Services" (solid blue) + "Get in Touch" (outlined blue)
   - Staggered fade-in-up animation on load (headline 0ms, subtext 150ms, buttons 300ms)

2. **Partner Logo Banner**
   - Label: "Trusted Partner Brands"
   - 8 logos in CSS-only infinite marquee scroll
   - Grayscale default, full color on hover
   - Logos duplicated in HTML for seamless loop
   - Pauses on hover

3. **Why Choose Tech-o**
   - H2: "Why Choose Tech-o?"
   - 3 cards in responsive grid with inline SVG icons:
     - "Freelance Flexibility" -- adaptability of freelance with reliability of full-scale provider
     - "Customized Solutions" -- tailored communication solutions for unique business needs
     - "Cost-Effective Services" -- top-tier telecom without corporate overhead
   - Cards fade-in on scroll with stagger delay

4. **Services Preview** (NEW)
   - H2: "What We Do"
   - 6 compact cards in 3x2 grid with SVG icons + one-liner + "Learn More" link to services.html
   - Covers all 6 services
   - Fade-in on scroll

5. **Footer**
   - Logo left, contact info (email + phone), quick nav links, copyright "2026 Tech-o"
   - Light background `#F9FAFB`, blue accent links

### 5.2 Services Page (services.html)

**Title:** `Services | Tech-o - Telephony, Networking, Security & Web Development`
**Meta description:** `Comprehensive IT services: telephony systems, network installation, CCTV surveillance, computer hardware, web design and Android app development in Durban.`

**Sections:**

1. **Hero** (60vh)
   - CSS gradient background (brand blues + dark navy)
   - H1: "Our Services"
   - Subtext: "Comprehensive technology solutions tailored to your business needs."
   - CTA: "Get a Quote"

2. **Services Grid**
   - H2: "Solutions Tailored to Your Needs"
   - 6 cards (3 col desktop, 2 tablet, 1 mobile), each with SVG icon, h3 name, 2-3 sentence description
   - Services:
     1. Complete Telephony Services
     2. Professional Network Installation & Maintenance
     3. Advanced Security & Surveillance Systems
     4. Comprehensive Computer & Hardware Solutions
     5. Web Design & Development (NEW)
     6. Android App Development (NEW)
   - Fade-in on scroll with stagger

3. **CTA Banner** (NEW)
   - Dark background (`#111827`), white text
   - "Ready to get started? Let's talk about your project."
   - Pill CTA to contact page

### 5.3 About Page (about.html)

**Title:** `About Tech-o | Trusted Telecom Experts in KwaZulu-Natal`
**Meta description:** `Meet the Tech-o team. 15+ years delivering reliable telecommunications, networking and security solutions across Durban and South Africa.`

**Sections:**

1. **Hero** (60vh)
   - CSS gradient background (brand blues + dark navy)
   - H1: "About Us"
   - Subtext: "Read more about our team, vision, mission, and values."
   - CTA: "Get in Touch"

2. **About Content**
   - Two-column: text left, decorative CSS geometric visual right (stacks on mobile)
   - Company intro copy (refreshed, keep Bentronix mention)
   - Mission / Vision / Values tabs below text
     - Restyled: blue underline indicator, smooth fade transitions
     - Keep existing tab content, refresh copy

3. **Stats**
   - Light blue background (`#EFF6FF`)
   - 3 stats: "15+" Years Experience, "99%" Customer Satisfaction, "100+" Projects Completed
   - Numbers count up on scroll (JS, `requestAnimationFrame`, fires once)
   - Numbers in Sora bold, blue `#2563EB`

4. **Team**
   - H2: "Meet Our Expert Team"
   - 2 centered cards with circular photos (paul.png, riaan.jpg)
   - Name (Sora bold) + role (DM Sans)
   - Hover: scale(1.05) + shadow
   - Fix Riaan's alt text (currently says "Paul Van Straaten")

### 5.4 Contact Page (contact.html)

**Title:** `Contact Tech-o | Get a Quote for Telecom & IT Services`
**Meta description:** `Contact Tech-o for telecommunications, networking, security and IT solutions in Durban. Call (031) 109 5092 or email paul@tech-o.co.za.`

**Sections:**

1. **Hero** (60vh)
   - CSS gradient background (brand blues + dark navy)
   - H1: "Get In Touch"
   - Subtext: "Have a question, need support, or want to discuss a custom solution? We're ready to help."

2. **Contact Content**
   - Two-column: info left, form right (stacks on mobile)
   - Left -- 3 contact cards with SVG icons:
     - General Inquiries: paul@tech-o.co.za, (031) 109 5092
     - Sales: riaan@tech-o.co.za, +27 (64) 999-9409
     - Customer Support: support@tech-o.co.za, (031) 109 5092
   - Right -- Formspree form (keep action URL `formspree.io/f/mzzpgyye`)
     - Fields: Name, Email, Message
     - Rounded inputs with blue focus glow
     - Pill submit button
     - Inline toast for success/error (replace `alert()`)
   - Fix orphaned `</div>` tags from current contact.html

## 6. Animations & Interactions

| Animation | Trigger | Implementation |
|---|---|---|
| Hero content fade-in-up | Page load | CSS `@keyframes` with staggered `animation-delay` |
| Card fade-in | Scroll into view | `IntersectionObserver` + `.animate-on-scroll` / `.is-visible` classes |
| Card stagger | Scroll into view | Incremental `transition-delay` per card in group |
| Card hover lift | Hover | `translateY(-6px)` + deeper `box-shadow` |
| Button hover | Hover | Background darken + `scale(1.02)` |
| Nav link underline | Hover | Pseudo-element width transition |
| Partner logos | Continuous | CSS `@keyframes` translateX marquee, pauses on hover |
| Partner logo color | Hover | `filter: grayscale()` transition |
| Stats counter | Scroll into view | JS `requestAnimationFrame`, fires once via `IntersectionObserver` |
| Team photo | Hover | `scale(1.05)` + shadow |
| Mobile nav | Click | CSS height + opacity transition |
| Reduced motion | User preference | `@media (prefers-reduced-motion: reduce)` disables all |

## 7. SEO Implementation

### Meta Tags (per page)
- `<title>` -- unique per page (see section 5)
- `<meta name="description">` -- unique per page (see section 5)
- `<meta name="viewport">` -- already present
- `<link rel="canonical">` -- absolute URL per page
- `<meta name="google-site-verification">` -- keep existing value

### Open Graph (per page)
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- `og:image` -- use the Tech-o logo (`images/logo-no-background.png`) as the shared OG image

### Structured Data (JSON-LD)

**Homepage -- LocalBusiness:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tech-o",
  "url": "https://tech-o.co.za",
  "telephone": "(031) 109 5092",
  "email": "paul@tech-o.co.za",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Durban",
    "addressRegion": "KwaZulu-Natal",
    "addressCountry": "ZA"
  },
  "areaServed": ["Durban", "KwaZulu-Natal", "South Africa"],
  "description": "Expert telecommunications, networking, security & IT solutions"
}
```

**Services page -- Service schema** for each of the 6 services.

**All pages -- BreadcrumbList** for navigation.

### Technical SEO
- `robots.txt`: allow all, reference sitemap
- `sitemap.xml`: updated dates, correct priorities (home 1.0, services 0.9, about 0.7, contact 0.6)
- Semantic HTML: single h1 per page, proper h2/h3 hierarchy
- Descriptive alt text on every image
- Fast load: optimized images, minimal JS, no render-blocking
- Mobile-first responsive (Google mobile-first indexing)

## 8. Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| > 1024px | Full desktop: 3-col grids, two-column layouts |
| 768px - 1024px | Tablet: 2-col grids, two-column layouts maintained |
| < 768px | Mobile: single column, hamburger nav, stacked layouts |

## 9. Images

### Hero Images
Use CSS gradient-based hero backgrounds as the primary approach -- these are lightweight, distinctive, and don't require external images. The gradients will use the brand color palette (blues, dark navy) with geometric or radial patterns for visual interest. This avoids any dependency on stock photo sources and loads instantly.

If higher-fidelity hero backgrounds are desired later, the user can source and add photos manually -- the CSS is structured to support a background-image overlay approach as a drop-in replacement.

The existing team photos (paul.png, riaan.jpg) are kept as-is.

### Service Icons
Inline SVG icons for each service. Clean, minimal line-style icons matching the design language. One color (blue `#2563EB` or gray `#6B7280`).

### Partner Logos
Keep all 8 existing logo files. Move to `images/partners/` subdirectory for organization.

## 10. Technical Constraints

- **No build step** -- raw HTML/CSS/JS deployed directly to GitHub Pages
- **No frameworks or dependencies** -- vanilla everything
- **No external JS libraries** -- all animations in CSS or vanilla JS
- **Formspree** for contact form (keep existing endpoint)
- **Google Fonts** via `<link>` tag (only external dependency)
- **GitHub Pages** deployment -- push to main branch
