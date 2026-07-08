# Subtitle Studio — Frontend Design Prompt

## 1. Product & Positioning

**Product name:** Subtitle Studio  
**Core promise:** Upload any short-form video. Get perfectly timed, translated, burned-in subtitles in under a minute.

This micro-SaaS does exactly one thing, so the interface must make that one thing feel **inevitable, magical, and worth paying for**. The design language should borrow from high-end video-editing tools and modern AI startups: cinematic, precise, and quietly confident.

**Target audience:**
- Solo content creators publishing Reels, Shorts, and TikToks
- Social-media managers and micro-agencies
- Founders and educators repurposing long-form content into clips

**Tone of voice:** Clear, calm, capable. No hype, no exclamation marks. The product speaks like an expert assistant that has already done the work.

---

## 2. Design Direction

### Aesthetic thesis
A **dark, theater-like workspace** surrounded by soft light. The UI should feel less like a web app and more like a professional video suite that happens to run in the browser. Use deep backgrounds, generous negative space, glowing accents, and glass panels to stage the video as the hero.

### Signature element
The **Live Subtitle Preview Card**: an interactive, phone-shaped viewport on the landing page that demonstrates the workflow without clicking anything. A looping short clip plays, animated captions pop in word-by-word with a subtle glow, language chips morph between "English", "Español", "日本語", and a waveform breathes beneath the timeline. This single element must communicate the entire value proposition in the first 3 seconds.

### Visual keywords
Cinematic, luminous, precise, effortless, premium, minimal.

---

## 3. Design Tokens

### Color palette

| Role | Hex | Usage |
|------|-----|-------|
| Background primary | `#050506` | Page canvas, dashboard shell |
| Background elevated | `#0F0F11` | Cards, panels, modals |
| Background glass | `rgba(15, 15, 17, 0.72)` | Floating headers, overlays |
| Border subtle | `rgba(255, 255, 255, 0.08)` | Dividers, card strokes |
| Border glow | `rgba(124, 58, 237, 0.35)` | Focus rings, active states |
| Text primary | `#F7F7F8` | Headlines, primary labels |
| Text secondary | `#A1A1AA` | Body copy, descriptions |
| Text muted | `#52525B` | Metadata, placeholders |
| Accent primary | `#7C3AED` | CTAs, active language, progress |
| Accent secondary | `#EC4899` | Subtitle glow, translation indicator |
| Accent cyan | `#22D3EE` | Success, exported state, AI badge |

Gradients:
- Hero glow: `radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.18), transparent 60%)`
- Accent button: `linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)`
- Subtitle burn preview vignette: `radial-gradient(circle at center, transparent 40%, #050506 100%)`

### Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | **Space Grotesk** | 500, 600, 700 | Hero headline, section titles, large stats |
| Body | **Inter** | 400, 500 | Paragraphs, labels, buttons, form text |
| Monospace | **JetBrains Mono** | 400, 500 | Timestamps, status logs, technical metadata |

Type scale (mobile-first):
- Hero: `clamp(2.5rem, 6vw, 5rem)` / line-height 1.05 / tracking -0.02em
- H2: `clamp(1.75rem, 3vw, 2.5rem)` / line-height 1.1 / tracking -0.01em
- H3: `1.25rem` / line-height 1.3
- Body: `1rem` / line-height 1.6
- Caption/mono: `0.75rem` / line-height 1.5

### Spacing & layout
- Max content width: `1280px`
- Section vertical padding: `clamp(5rem, 10vw, 9rem)`
- Card padding: `1.5rem` desktop, `1rem` mobile
- Grid gap: `1.5rem` standard, `2.5rem` for feature blocks
- Border radius: `1rem` for cards, `0.75rem` for buttons, `1.5rem` for large panels
- Standard transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- Spring transition for reveals: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## 4. Landing Page

### Section A: Navigation
- Fixed, glass-blurred header that fades in on load.
- Logo: a minimal play-capsule icon + wordmark "Subtitle Studio" in Inter 600.
- Links: Product, Pricing, Docs (all scroll to sections).
- Right side: "Log in" ghost button, "Start free trial" primary button.
- On mobile: hamburger becomes a bottom-sheet menu with the same glass treatment.

### Section B: Hero
- **Headline:** "Subtitles that follow the story." (one line, large)
- **Subheadline:** "Upload a short video. We detect the language, transcribe every word, translate into 40+ languages, and burn the subtitles in — in seconds."
- **CTA group:**
  - Primary: "Upload your first video"
  - Secondary: "See how it works"
- **Trust bar below fold:** small logos / social proof: "Trusted by 2,000+ creators", star rating, "No credit card required".
- **Hero visual:** The Live Subtitle Preview Card floats on the right (desktop) or stacks below (mobile). Behind it, a soft violet radial glow pulses slowly.

**Load animation sequence:**
1. Background gradient fades in (300ms).
2. Headline words stagger up from `translateY(24px)` opacity 0 (600ms, stagger 40ms).
3. Subheadline and CTAs fade in (400ms).
4. Preview card scales from `0.96` to `1` and tilts slightly into place (800ms, spring easing).
5. Ambient glow begins pulsing.

### Section C: The One-Feature Workflow
Because there is only one feature, present it as a **5-step ritual** with cinematic stills or abstract UI mockups. Each step should feel like a panel in a storyboard.

1. **Upload** — Drag or pick a video. Show a dropzone with subtle shimmer border.
2. **Detect** — AI recognizes spoken language. Show a language chip resolving.
3. **Transcribe** — Words align to audio. Show a waveform with text snippets attaching.
4. **Translate** — Choose languages. Show chips expanding into a small grid.
5. **Burn & Export** — Download the finished video. Show a download card with a progress ring.

**Interaction:** As the user scrolls, each step slides in from the right and locks briefly at center before the next appears (sticky horizontal scroll or vertical step reveal). On mobile, steps stack vertically with numbered, connected nodes.

### Section D: Feature Spotlight
Three micro-features presented as premium cards with glass borders:
- **Word-level precision** — Subtitles sync to the exact beat of speech.
- **40+ languages** — Translate once, publish everywhere.
- **Studio export** — SRT, VTT, or burned-in MP4.

Each card has a hover lift (`translateY(-4px)`), border glow intensifies, and an icon animates on entry.

### Section E: Pricing
Two plans only. Avoid decision fatigue.
- **Starter** — $12/mo: 10 videos, 5 languages, standard export.
- **Pro** — $29/mo: Unlimited videos, all languages, priority burning, 4K export.

Both cards sit on the same glass background. The Pro card has a subtle violet glow ring and a "Most popular" badge. Monthly/annual toggle switches price with a sliding pill.

### Section F: FAQ
Accordion with minimal, calm copy. Focus on objections:
- "What video formats are supported?"
- "How accurate are the subtitles?"
- "Can I edit the transcript?"
- "Do you store my videos?"

### Section G: Footer
Simple, dark footer with logo, links grouped in columns, and a final CTA row: "Start creating today — Upload your first video."

---

## 5. Dashboard

### Shell
- Full-screen dark canvas.
- Left sidebar (collapsible on mobile): Logo, "New project" primary button, Projects, Templates, Settings, Billing.
- Top bar: Search, notification bell, user avatar.

### Empty State
A large, centered dropzone that is itself a piece of interface art:
- Dashed border that animates into a solid glow when a file is dragged over.
- Illustration of a film strip unspooling into a subtitle line.
- Headline: "Drop a video to begin."
- Supported formats listed in muted mono text.

### Uploading State
- A prominent upload card with file name, size, and a progress bar.
- The progress bar uses the accent gradient and has a subtle shimmer.
- Beneath: a live status log in mono text:
  - "Uploading..."
  - "Detecting language..."
  - "Generating transcript..."
  - "Burning subtitles..."
- Each step gets a checkmark as it completes. The active step gently pulses.

### Editor State
Once processed, the layout splits:
- **Left (video preview):** 60% width. A cinematic player with black letterbox bars, playback controls, and a floating subtitle track. Users can scrub.
- **Right (transcript panel):** 40% width. Scrollable transcript with editable text segments, timestamps, and speaker labels. Clicking a line jumps the playhead.
- **Bottom (language strip):** Horizontal row of language chips. Selected language is filled; others are outline. A "+ Add language" chip opens a dropdown.
- **Top-right action:** "Export" button opens a drawer with options: resolution, subtitle style (position, font, background), burned-in vs. SRT.

### Loading Skeletons
- Dashboard cards: rounded rectangles with subtle shimmer gradient.
- Video preview: dark placeholder with pulsing play icon.
- Transcript panel: 8 lines of varying widths.

### Toast / Feedback
- Success: bottom-left toast with cyan accent, "Video exported — download started."
- Error: same position with pink/red border, explicit next step: "Upload failed. Try a file under 500 MB."

---

## 6. Components

### Buttons
- **Primary:** Gradient background, white text, no border, shadow `0 4px 24px rgba(124, 58, 237, 0.25)`. Hover: brightness 1.1, shadow intensifies.
- **Secondary:** Transparent with subtle border, light text. Hover: background `rgba(255,255,255,0.06)`.
- **Ghost:** No border, muted text. Hover: text primary.
- **Destructive:** Pink/red background, used sparingly for delete.

### Cards
- Background: `#0F0F11` or glass rgba.
- Border: `1px solid rgba(255,255,255,0.08)`.
- Hover: border brightens, shadow appears, translateY(-4px).
- Entry animation: fade + scale from 0.98.

### Inputs
- Dark field with subtle border.
- Focus: violet glow ring.
- Drag-and-drop zone: dashed border, animated dash offset, glow on drag.

### Chips
- Language chips: pill shape, outline by default, filled when selected.
- Hover: background tint.
- Active translation: a small dot indicator pulses.

### Modals / Drawers
- Glass backdrop blur.
- Slide up on mobile, slide from right on desktop.
- Close via X, backdrop click, or Escape.

---

## 7. Motion & Micro-interactions

### Global
- Page transitions: 300ms fade between landing and dashboard.
- Scroll-triggered reveals: elements fade up 24px with `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reduced motion: disable transforms, keep opacity fades only.

### Specific
- Upload progress bar: continuous shimmer animation.
- Language chip selection: background color morphs, checkmark draws in.
- Subtitle words in preview: pop in with `scale(0.9) → scale(1)` and opacity.
- Button hover: subtle lift + glow intensify.
- Card hover: `translateY(-4px)` + border glow.
- Toast entrance: slide up + fade; exit: fade out.
- Modal: backdrop fades in, panel springs up.

---

## 8. Responsive Behavior

### Desktop (1280px+)
- Hero: two-column, preview floats right.
- Dashboard: fixed sidebar, two-column editor.

### Tablet (768px–1279px)
- Hero stacks, preview centered below CTA.
- Dashboard sidebar collapses to icon rail.
- Editor becomes single column with transcript below video.

### Mobile (< 768px)
- Single column everywhere.
- Dashboard bottom nav replaces sidebar.
- Upload dropzone fills width.
- Export drawer becomes full-screen bottom sheet.
- Touch targets minimum 44px.

---

## 9. Accessibility

- All text meets WCAG 4.5:1 contrast (primary text on dark surfaces passes).
- Focus rings visible on every interactive element (violet glow).
- Buttons and links have descriptive labels.
- Icons paired with text or `aria-label`.
- `prefers-reduced-motion` respected globally.
- Color never used alone to indicate status; icons and text accompany it.
- Dashboard keyboard navigable: Tab order logical, Escape closes modals, Space/Enter activates buttons.

---

## 10. Conversion Strategy

- Single, repeated CTA: "Upload your first video" appears in hero, workflow, and footer.
- No friction before value: free trial requires only email, no credit card.
- Trust signals placed near CTAs: star rating, creator count, security badges.
- Pricing contrast makes Pro feel obvious (unlimited + all languages).
- Dashboard empty state immediately invites action.

---

## 11. Deliverables

- High-fidelity landing page design (responsive).
- Dashboard design with all states: empty, uploading, editing, exporting.
- Component library: buttons, cards, inputs, chips, modals, toasts, loaders.
- Motion specification for all animations.
- Accessibility checklist.

---

## 12. What to Avoid

- Generic gradient blobs that have no relation to video.
- Three-column feature grids with stock icons.
- Bright, saturated rainbows. Keep the palette disciplined.
- Cluttered dashboards with too many controls.
- Walls of marketing copy. Every word should earn its place.
- Exclamation points and hype language.
