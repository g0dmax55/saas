# Subtitle Studio

A premium AI-powered micro SaaS that helps content creators generate professional subtitles for short-form videos.

## Product Workflow

Upload Short Video → Detect Spoken Language → Generate Accurate Subtitles → Create Transcript → Translate Subtitles → Burn into Video → Export

## Structure

- `frontend/` — Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- `backend/` — Backend service (to be implemented)

## Frontend

The frontend is a production-ready design system with a premium white-first aesthetic, large editorial typography, generous whitespace, purple-to-blue gradients, and motion-first interactions.

See `frontend/DESIGN.md` for the complete design system documentation.

### Quick start

```bash
cd frontend
npm install
npm run dev
```

### Pages

- `/` — Landing page with hero, workflow, style gallery, translation showcase, before/after, features, pricing, FAQ, CTA
- `/dashboard` — Three-panel upload / processing / editor workspace

### Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Lucide React
- React Hook Form + Zod
- next-themes
- Sonner
- React Dropzone
