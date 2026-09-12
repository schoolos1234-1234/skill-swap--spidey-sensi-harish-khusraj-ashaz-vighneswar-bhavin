# 🔄 SkillSwap — A Skill Swap Platform

A community marketplace where people trade skills instead of money: teach what you know, learn what you love. Built for the **Design Championship**.

## ✨ Features

- **Homepage** — animated gradient hero with a live search bar, count-up stats, featured skills, category shortcuts, a testimonial carousel, and a call-to-action banner.
- **Browse & Search** — live keyword search, category chips, level filters, sorting (newest / A–Z / highest rated), a "load more" grid, and a detail modal with a simulated "Request Swap" action.
- **Post a Skill** — a validated multi-field form (category, level, description, tags, icon picker) with a **live preview card** that updates as you type, plus a success screen.
- **How It Works** — a four-step visual timeline, quick tips, and an FAQ accordion.
- **Profile** — an editable profile header, tabs for *My Skills*, *Wishlist*, *Swap History*, and *Achievements* (unlockable badges based on what you've actually posted).
- **Dark mode**, scroll-in animations, hover/ripple micro-interactions, and a responsive layout down to mobile — all with `prefers-reduced-motion` respected.

## 🛠 Tech

Plain **HTML, CSS, and vanilla JavaScript**. No frameworks, no build step, no dependencies to install — the only network request is a Google Fonts stylesheet. Data you post (skills, profile edits, wishlist) is saved to the browser's `localStorage`, so it's local to your browser and persists across the site's pages and reloads, but isn't sent anywhere.

## 📁 Project structure

```
├── index.html          Homepage
├── browse.html          Browse / search page
├── post-skill.html      Skill posting form
├── how-it-works.html    How-it-works + FAQ
├── profile.html          Profile page
├── css/
│   └── styles.css        Shared design system & styles
├── js/
│   ├── app.js             Shared: data, storage, nav, theme, animations
│   ├── home.js             Homepage behavior
│   ├── browse.js           Search/filter logic
│   ├── post-skill.js       Form validation + live preview
│   └── profile.js          Tabs, wishlist, achievements
└── README.md
```

## ▶️ Running it

No build tools needed. Either:

1. **Double-click `index.html`** to open it straight in your browser, or
2. **Serve it locally** (recommended, so saved data is consistent across pages):
   ```bash
   python3 -m http.server 8080
   ```
   then open `http://localhost:8080`.

## 🎨 Design notes

- Palette: indigo/violet/pink gradient system, with 8 category colors and a light/dark theme pair.
- Type: "Plus Jakarta Sans" for headings, "Inter" for body text.
- All sample skills, testimonials, and profile data are illustrative demo content.
