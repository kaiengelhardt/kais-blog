# Implementation plans

Status: Kai approved this index, the brief, and plans 01–02 on 2026-10-02.
Plans 03–08 remain drafts for later review. Begin only the requested milestone
from an approved plan. Track completed work in each plan's milestone checkboxes.

## Feature plans

1. [Technical foundation](01-foundation.md): Astro, assets, metadata, and 404.
2. [Visual foundation](02-visual-foundation.md): typography, colors, glass,
   navigation, responsive behavior, and accessibility.
3. [Home and About](03-home-about.md): professional introduction and personal life.
4. [Blog, Recents, and PagesCMS](04-blog-cms.md): articles and publishing.
5. [Resume and image viewer](05-resume-gallery.md): career, PDF, and galleries.
6. [Apps](06-apps.md): directory and product pages.
7. [Legal and analytics](07-legal-analytics.md): German notices and GoatCounter.
8. [Deployment](08-deployment.md): GitHub Actions, STRATO, and launch.

Mark a milestone `[x]` when its work and in-change checks are complete.

Each milestone should be one reviewable change. If implementing it requires
several independently understandable behaviors, split it before writing code.
Pause after each milestone so Kai can read it. Verification belongs within the
change, except for the explicitly marked external-system milestones.

Start with foundation, visual foundation, and the home introduction. Blog, resume,
About, and apps can then progress individually. Add deployment when there is real
content to publish; CMS and analytics external checks depend on that pipeline.

## Review and later inputs

[The brief](../brief.md) records the agreed product decisions. The feature plans
translate them into small implementation steps and propose the technical
approaches for final review. There are no remaining product questions.
Final font selection can wait for the first visual milestone.

Inputs intentionally deferred: portrait, biography, exact career details and PDF,
initial app selection and assets, personal photos/values and playlist URL, current
legal details, GoatCounter setup, and STRATO/GitHub access configuration. These
need not block completing the plans.

The inspection is complete. Consult [reference findings](../reference-findings.md)
when writing the foundation, blog, analytics, or deployment plans.
