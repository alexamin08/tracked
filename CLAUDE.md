# Tracked

AI music supervisor for content creators. 50/50 JV with Signature Tracks (broadcast scoring house behind major unscripted TV).

## What it does

Creator describes their scene (text, YouTube URL, or video upload) → AI matches them to broadcast-proven music from 53,000+ compositions → recommends specific composition, version, and placement.

## Tech stack

Next.js 14 (App Router), Supabase (PostgreSQL + pgvector), Clerk (auth, Google default), Stripe (billing), Algolia (search fallback), PostHog (analytics), Cloudflare (CDN), OpenAI (embeddings + LLM), Resend (email)

## Business model

Starter $15/mo, Pro $29/mo, Team $79/mo. Unlimited downloads all tiers. 14-day free trial, credit card upfront. Annual: 2 months free. Differentiation: AI power (URL analyses, file uploads), licensing scope, file formats, platforms, team members.

## Key decisions

Homepage: AI input IS the product. Suggested prompts. Rich below-fold modules.
Auth gate at download, not first visit. Google Sign-In default.
Design: Azure Curator (working direction, Stitch redesign Phase 2). Plus Jakarta Sans, #0058bb, pill-shaped, glassmorphic.
Content: MDX in /content/ at launch. Sanity.io Month 3-6.
Database: 14 tables in Supabase. See PRD v4.2 Appendix A.2 for schema.

## Context files

CLAUDE.md (this file): what we're building
BRAND.md: voice, tone, design taste
DESIGN.md (Phase 2): design tokens from Stitch

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
