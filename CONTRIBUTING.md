# Contributing to the SWAPPS Design System

Thank you for your interest in contributing. The SWAPPS Design System is maintained by the SWAPPS team at SLAC National Accelerator Laboratory, and we welcome contributions from team members and developers at other laboratories.

## Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/slaclab/swapps-design-system.git
   cd swapps-design-system
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Familiarize yourself with the [development setup guide](apps/docs/docs/development/setup.mdx).

## Ways to contribute

### Report issues

Open a GitHub issue for bugs, feature requests, or suggestions. Include enough context for someone unfamiliar with the problem to understand it.

### Propose design guidelines

1. Open an issue describing the guideline and the problem it addresses.
2. Include examples showing the current inconsistency or use case.
3. Label the proposal clearly — the team will review and discuss.
4. Approved guidelines are added to the documentation site.

### Add or improve documentation

1. Edit or create `.mdx` files in `apps/docs/docs/`.
2. Update `apps/docs/sidebars.ts` if adding new sidebar entries.
3. Preview your changes: `pnpm dev:docs`
4. Submit a pull request.

### Create or update a component

1. Open an issue to discuss the component's purpose and API.
2. Implement the component in `packages/ui/src/components/`.
3. Add tests alongside the component.
4. Add a documentation page with usage examples.
5. Submit a pull request.

## Code standards

- **TypeScript** for all component code.
- **Tests** for all component behavior using Vitest and React Testing Library.
- **Accessibility** — Follow Carbon conventions, test with keyboard, provide ARIA labels.
- **No hardcoded branding** — Organization identity must be configurable via props.
- **Build on Carbon** — Use existing Carbon components; don't recreate primitives.

## Pull request process

1. Create a branch from `main`.
2. Make your changes.
3. Ensure all checks pass: `pnpm build && pnpm test`
4. Write a clear PR description explaining what changed and why.
5. Request review from the SWAPPS team.

## Open decisions

Some governance and policy decisions have not been finalized:

- Licensing terms
- Package publishing scope and registry
- Public contribution policies
- Release cadence

These will be documented in the project as they are resolved.
