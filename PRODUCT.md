# Product

## Register

brand

## Users

Tech recruiters and engineering hiring managers evaluating candidates for data engineering / AI internship roles. They scan dozens of portfolios in a session; the portfolio has roughly 10–15 seconds to earn continued attention. Context: desktop browser, professional review setting, time-pressured. Secondary: engineering peers who may encounter the site via GitHub or LinkedIn.

## Product Purpose

Convert a recruiter's click into an interview request. The portfolio must establish technical credibility and distinctive character fast enough that a hiring manager who would otherwise scroll past instead downloads the resume or drafts an email. Success = recruiter takes action within 2 minutes of landing.

The site is hosted on GitHub Pages as a static HTML/CSS page — no build step, no runtime framework.

## Brand Personality

Creative · Inventive · Unconventional — but grounded in engineering precision. The design should feel like something an engineer built with deliberate intent, not a theme they applied. Technical expressiveness is the mode; spectacle for its own sake is not.

## Anti-references

- **Generic dark dev template**: GitHub-dark / VS Code palette, sidebar nav, cookie-cutter portfolio-builder aesthetics — blends into every other dev portfolio.
- **Safe corporate blue/white**: Consulting-firm legibility without a point of view — professional but forgettable.
- **Warm cream / editorial AI default (2026)**: Beige/sand body background, cozy-tech serif editorial vibe — the AI-generation monoculture.
- **Flashy agency portfolio**: Heavy WebGL / 3D heroes, build-tool-dependent GSAP orchestrations — incompatible with static hosting and signals design-over-engineering priority.

## Design Principles

1. **Technical expressiveness over decoration** — every visual choice should read as intentional engineering craft; avoid effects that exist purely for decoration without expressing the underlying system's logic.
2. **Static-first discipline** — every effect must function as a static file on GitHub Pages: no bundler, no server-side rendering, no Node runtime. Vanilla JS and CSS only.
3. **Stop the scroll in two seconds** — the hero must establish identity and credibility before the visitor decides to keep reading; information hierarchy is optimized for the scanning, not the settled reader.
4. **Work anchors, design amplifies** — the projects and credentials are the primary content; the visual system frames and elevates them without competing for attention.
5. **Unconventional and credible simultaneously** — take visual risks that signal a distinctive perspective, while maintaining the authority a hiring manager needs to feel confident forwarding the resume.

## Accessibility & Inclusion

No specific WCAG level required. Target: readable, keyboard-navigable, functional without JS (progressive enhancement). prefers-reduced-motion already implemented; maintain it in all future animation work.
