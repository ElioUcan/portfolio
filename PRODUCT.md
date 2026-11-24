# Product

## Register

brand

## Users

Tech recruiters and engineering hiring managers evaluating candidates for data engineering and AI roles. They scan dozens of portfolios in a session; the site has roughly 10-15 seconds to earn continued attention in a time-pressured desktop review setting. Secondary audience: engineering peers arriving from GitHub or LinkedIn.

## Product Purpose

Convert a recruiter visit into an interview request. The portfolio must establish technical credibility fast enough that a hiring manager downloads the resume or sends an email within 2 minutes of landing.

The site is hosted on GitHub Pages as static HTML, CSS, and vanilla JS with no build step or runtime framework.

## Visual Architecture

Two-Column Split layout on pure white (`#FFFFFF`) with subtle neutral hover surface (`#F5F5F5`), ink (`#171717`), secondary neutral (`#525252`), hairline dividers (`#E5E5E5` / `#D4D4D4`), and cobalt blue (`#1D4ED8` / `#1E40AF`) editorial accents. On desktop, the left column stays sticky with name, concise bio, anchor navigation, resume download, and contact links; the right column presents a flat vertical index of focus, experience, projects, skills, credentials, and education without boxed cards or carousels. Typography uses Plus Jakarta Sans across the entire interface and reserves IBM Plex Mono strictly for CLI code snippets (`npx better-readmes`).

## Anti-references

- Generic dark dev template: GitHub-dark or VS Code palettes with cookie-cutter layouts.
- Safe corporate blue/white: consulting-firm templates with no distinct visual point of view.
- Warm cream / editorial AI default (2026): beige or sand backgrounds paired with serif display headings.
- Flashy agency portfolio: heavy WebGL or 3D heroes, boxed card grids, and build-tool-dependent animations that conflict with static hosting.

## Design Principles

1. Flat typographic hierarchy over boxed cards: use spacing, hairline dividers, and tabular numeric metadata instead of card containers.
2. Static-first discipline: every feature must work as static files on GitHub Pages with vanilla HTML, CSS, and JS (no bundler, SSR, or Node runtime).
3. Scannable identity and index: keep the left column anchored for instant access to resume, contact, and section navigation while scanning projects and credentials.
4. Work anchors, design frames: projects and credentials are the primary content; the visual system supports them without competing for attention.
5. Technical precision: use direct factual descriptions, verifiable metrics, and explicit stacks.

## Accessibility & Inclusion

Target: readable contrast, keyboard-navigable anchor links and copy controls, semantic landmarks (`header`, `nav`, `main`, `section`), visible focus outlines, and functional without JS (progressive enhancement). Maintain `prefers-reduced-motion` support across transitions and scrolling.
