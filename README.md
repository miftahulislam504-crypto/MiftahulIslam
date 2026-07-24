# Portfolio OS

"Personal Workspace OS" themed portfolio — every section is designed as a piece
of software UI (terminal, command palette, desktop windows, file explorer,
git timeline, macOS dock) rather than generic cards.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber / Three.js (wired in Phase 5)
- Lenis (smooth scroll)
- Deploy target: Vercel

## Getting started

No local terminal needed if you're using the usual zip → GitHub → Vercel
workflow. If you do have a terminal available:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Next.js (see `vercel.json`).
3. No environment variables are required for Phase 0/1.

## Progress

- [x] **Phase 0** — Project scaffold, Tailwind design tokens, fonts, folder structure
- [x] **Phase 1** — Global layout: loading screen, custom cursor, scroll progress
      bar, dark/light toggle, spotlight search (⌘K) nav with active-section
      indicator, back-to-top button, page transition, section reveal + text
      reveal helpers, parallax image helper, hover glow helper
- [x] **Phase 2** — Hero (minimal typography + live status-bar detail) + About
      (Terminal panel with sequential typing animation + Blueprint SVG
      illustration with scroll parallax)
- [x] **Phase 3** — All 7 signature sections built: Skills (command palette),
      Projects (mini desktop windows, horizontal scroll + fullscreen preview),
      Experience (git commit timeline), Services (app launcher grid),
      Certificates (file explorer + preview modal), Tech Stack (draggable
      sticker wall), Stats (animated dashboard widgets)
- [x] **Phase 4** — Resume (embedded PDF viewer with graceful "not uploaded
      yet" fallback), Contact (macOS-style dock with mouse-distance
      magnification), Footer (typed terminal sign-off). The full page is now
      assembled end to end: Hero → About → Skills → Projects → Experience →
      Services → Certificates → Tech Stack → Stats → Resume → Contact → Footer
- [x] **Phase 5** — 3D layer: a wireframe truss structure (React Three Fiber)
      floats behind the Hero typography, and Project desktop-window cards get
      a mouse-tracked 3D tilt (CSS transform, not R3F — cheaper and works
      identically on the cards' existing hover surface). Both are gated to
      desktop/fine-pointer/no-reduced-motion via `useCanRender3D`, and the
      Hero canvas pauses its render loop entirely when scrolled out of view.
- [x] **Phase 6** — Micro-interaction polish pass: fixed a real bug where
      `useLenis()` always returned `null` (ref instead of state); added a
      shared `useScrollLock` hook and wired it into every modal/overlay
      (Spotlight, Projects fullscreen preview, Certificates preview, Loading
      screen); added Escape-to-close on the two modals that lacked it;
      hover-only animations (Services app icons, Tech Stack stickers) are now
      gated to desktop so they don't get stuck "on" after a tap on touch
      devices, with `whileTap`/`whileDrag` covering touch feedback instead;
      extended `HoverGlow` to the Stats widgets and fixed it to clip to
      rounded corners.
- [ ] **Phase 7** — Deploy & QA

## Design tokens (see `tailwind.config.ts`)

- **Colors**: near-black `os.bg` (#0B0D10) / warm paper `os.bgLight` (#F3F1EA)
  desktop backgrounds, amber `accent` (#E8A33D) as the single signature color
  (echoes a "window traffic light" rather than a generic gradient), red/green
  `signal` colors used sparingly for system-style states.
- **Type**: JetBrains Mono (terminal/command-palette/git-timeline chrome) +
  Space Grotesk (display headings) + Inter (body copy).
- **Signature element**: the Spotlight Search (⌘K) replacing the navbar
  entirely — it's both navigation and the first proof that this site behaves
  like an OS, not a webpage.

## Notes for next phase

- **Fixed bug worth knowing about**: `useLenis()` previously always returned
  `null` because the Lenis instance lived in a `ref`, which doesn't trigger
  re-renders when set inside an effect. It's now `useState`, so anything
  calling `useLenis()` (Spotlight search's scroll-to, Back-to-top,
  `useScrollLock`) gets the real instance once Lenis initializes.
- **`hooks/use-scroll-lock.ts`** is the shared pattern for any future
  modal/overlay — call `useScrollLock(isOpen)` and it stops both Lenis and
  native scroll while true, restoring both on close.
- **Touch-safety pattern**: anywhere a component uses `whileHover` purely for
  visual delight (not information), gate it behind `useCursor().isDesktop`
  and give touch users `whileTap`/`whileDrag` instead — otherwise iOS/Android
  can leave the hover state visually "stuck" after a tap. Applied to Services
  and Tech Stack in Phase 6; worth checking again if you add new hover-driven
  components later.
- **Important dependency fix (Phase 5)**: `@react-three/fiber@9.6.1` /
  `@react-three/drei@10.7.7` — the React-19-compatible line. If you ever
  bump React back to 18, bump these back to the v8/v9 pair too.
- **3D performance gate**: `hooks/use-can-render-3d.ts` decides whether any
  WebGL mounts at all (desktop + fine pointer + no reduced-motion + ≥768px
  wide). Mobile visitors never download the Three.js bundle — `next/dynamic`
  with `ssr: false` code-splits it out entirely.
- The Hero 3D scene (`components/three/`) pauses its render loop via
  `frameloop="never"` when scrolled out of view, using an IntersectionObserver
  in `hero-canvas.tsx` — it won't burn CPU/battery once you've scrolled past it.
- `public/resume.pdf` is not included. Drop your real resume there and the
  Resume section's viewer will pick it up automatically (it checks for the
  file and falls back to a placeholder otherwise — nothing breaks if it's
  missing).
- **Contact dock links are placeholders** (`SITE.socials` / `DOCK_ITEMS` in
  `lib/config.ts`) — replace with your real GitHub, LinkedIn, email, and
  WhatsApp links before deploying.
- All Phase 3 content (projects, skills, experience, services, certificates,
  tech stack, stats) lives in `lib/config.ts` — edit the data there, not
  inside the section components.
- **Projects** currently render a colored gradient placeholder instead of a
  real screenshot/video. Swap the placeholder `<div>` in
  `components/sections/projects.tsx` for an `<Image>` or `<video>` once you
  have real project media — drop files in `public/projects/`.
- **Certificates** preview modal is a placeholder panel; once PDFs are
  uploaded to `public/certificates/`, wire them in with the same embedded-PDF
  approach used in Resume.
- Hero and About copy live in `lib/config.ts` (`SITE` and `ABOUT` objects).
- The blueprint illustration in About is a hand-drawn inline SVG (no image
  asset needed). Swap it for a real drafting scan later if you have one, by
  replacing the contents of `components/os/blueprint-panel.tsx`.
- **Next up: Phase 7** — deploy to Vercel and QA (since `npm install` can't
  run in this sandbox, the first real build will happen on Vercel; watch the
  build log for anything version-related and report back if it fails).
