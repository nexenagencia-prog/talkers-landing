# Talkers Premium CMS V8 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Rebuild the current Talkers interface to match the approved premium mockup while preserving the working Supabase/Vercel CMS and making every visible content element editable.

**Architecture:** Keep the existing Next.js App Router + Supabase architecture and existing tables. Expand the section renderer with dedicated Talkers section types, store global contact/social/footer fields inside the existing `theme_json`, and reuse one editable casting section on both the homepage and `/casting`. Add a one-time UI version migration in application code so existing projects receive the new sections without manual SQL and future CMS edits are preserved.

**Tech Stack:** Next.js 15, React 19, Supabase JS, CSS, Vercel.

**Spec:** Approved Talkers premium interface mockup from this conversation and the user's requirement that logo, menus, buttons, links, text, photos, descriptions, titles, contact and casting are editable.

## Global Constraints

- Preserve the current Supabase connection, login and CMS APIs that already work.
- Do not require a new database table or manual SQL migration.
- Preserve `/casting` and its click-to-expand speaker interaction.
- Keep all existing generic section types functional.
- Use generous vertical spacing; new sections must not be compressed into each other.
- All content visible in the new interface must have CMS fields.
- Do not overwrite CMS edits after the one-time V8 migration has run.

---

### Task 1: Smoke specification
**Files:** Create `scripts/smoke.mjs`; Modify `package.json`.
**Interfaces:** Produces `npm run smoke` as a static acceptance check.
- [x] Write checks for required V8 section kinds, casting editor, contact fields and UI version migration.
- [x] Run `npm run smoke` and confirm it fails before implementation.

### Task 2: Talkers content model and migration
**Files:** Create `lib/talkersDefaults.js`; Modify `app/page.js`, `app/casting/page.js`.
**Interfaces:** Produces `ensureTalkersV8(sb)` and shared `TALKERS_SECTIONS` defaults.
- [x] Add V8 default settings, nav and 10+ spacious sections based on the approved interface.
- [x] Add one-time migration guarded by `theme_json.ui_version`.
- [x] Reuse the editable `casting` section for homepage preview and `/casting`.

### Task 3: Premium frontend renderer
**Files:** Modify `components/SectionRenderer.js`, `components/SiteHeader.js`, `components/CastingGrid.js`, `app/globals.css`.
**Interfaces:** Renders hero, intro cards, milestone/features, testimonials, brand strip, services, growth metrics, casting, CTA, FAQ and footer with premium responsive layout.
- [x] Add dedicated section renderers without removing existing generic renderers.
- [x] Add reusable line icons and premium cards.
- [x] Add generous section rhythm on desktop/tablet/mobile.
- [x] Preserve modal expansion for speaker cards.

### Task 4: Fully editable CMS
**Files:** Modify `app/admin/AdminClient.js`.
**Interfaces:** CMS can edit every V8 section field and global contact/social/footer data.
- [x] Extend settings for contact, WhatsApp, Instagram, LinkedIn, YouTube and footer columns inside `theme_json`.
- [x] Add section types for features, testimonials, brand strip, services, growth, casting and CTA.
- [x] Add editors for feature items, testimonials, service cards, metrics and speakers including uploadable images.
- [x] Preserve generic section editors and menu management.

### Task 5: Verification and package
**Files:** Modify `README.md`; Create final ZIP.
**Interfaces:** A GitHub-ready package compatible with current Vercel environment variables.
- [x] Run `npm run smoke`.
- [ ] Run `npm install` and `npm run build` on a networked environment (artifact container has no npm DNS).
- [x] Inspect build output for `/`, `/admin`, `/casting`, API routes.
- [x] Zip project without node_modules/.next.
