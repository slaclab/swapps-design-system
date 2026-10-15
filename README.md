# SWAPPS Design System

A shared foundation for consistent software interfaces.

Developed and maintained by **SWAPPS** at **SLAC National Accelerator Laboratory**.

## Overview

The SWAPPS Design System provides:

- **Design guidelines** — Colors, typography, spacing, layout patterns, and accessibility standards.
- **A React component library** (`@swapps/ui`) — Reusable, configurable application-level components built on [IBM Carbon](https://carbondesignsystem.com/).
- **A documentation website** — A Docusaurus-powered reference for developers.

The system is designed for adoption by any software development team. Organization-specific branding (logos, names, colors) is configurable through component props — not hardcoded.

## Repository structure

```
swapps-design-system/
├── apps/docs/         Docusaurus documentation website
├── packages/ui/       @swapps/ui React component library
├── .github/workflows/ CI configuration
├── pnpm-workspace.yaml
└── package.json       Root scripts
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- [pnpm](https://pnpm.io/) 10 or later

### Install dependencies

```bash
pnpm install
```

### Development commands

| Command | Description |
|---|---|
| `pnpm dev:docs` | Start the documentation dev server |
| `pnpm build:docs` | Build the documentation website |
| `pnpm build:ui` | Build the UI component package |
| `pnpm test` | Run component tests |
| `pnpm typecheck` | TypeScript checks across all packages |
| `pnpm build` | Build everything (UI + docs) |

### Quick start

```bash
# Start the documentation site
pnpm dev:docs

# In another terminal, watch UI package changes
pnpm --filter @swapps/ui dev
```

## Technology stack

| Area | Technology |
|---|---|
| Documentation | [Docusaurus](https://docusaurus.io/) 3 |
| Component library | React + TypeScript |
| Component foundation | [IBM Carbon](https://carbondesignsystem.com/) (`@carbon/react`) |
| Package manager | [pnpm](https://pnpm.io/) workspaces |
| Testing | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) |
| CI | GitHub Actions |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on contributing to the design system.

## Status

This project is in early development (v0.1.0). The component library is not yet published to a package registry.

See the [roadmap](apps/docs/docs/resources/roadmap.mdx) for planned work and open decisions.
