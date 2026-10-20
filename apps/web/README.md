# Greenroom — web

The frontend: pick a room, join the voice call, read the debrief. Next.js (App Router), React,
TypeScript, Tailwind.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm lint
pnpm build
```

## Architecture: feature-based

Code is grouped by **what it does for the user**, not by what kind of file it is.

```
src/
├── app/            # routes only: thin pages that compose features
├── features/
│   ├── session-setup/   # pick a job posting and a persona
│   ├── live-call/       # the voice call
│   ├── report/          # the debrief after the call
│   └── pitch-drill/     # timed pitch practice
│       ├── components/  # UI for this feature
│       ├── hooks/       # React adapters over model/
│       ├── model/       # plain TypeScript: state, rules, state machines (no React)
│       └── api/         # calls to the backend for this feature
└── shared/
    ├── ui/         # generic UI building blocks, no business logic
    ├── api/        # API client (generated from the backend's OpenAPI schema) and fetch wrapper
    └── lib/        # small generic utilities
```

### Rules

1. **`app/` only composes.** Routing, layouts and data loading live there; business logic does not.
2. **Features never import from each other.** What two features need moves to `shared/`.
   `shared/` never imports from `features/` or `app/`. ESLint enforces both.
3. **Business logic is plain TypeScript in `model/`.** Hooks only connect it to React, so the
   logic is testable without a browser and usable from Server Components, where hooks don't run.
4. **Components render; they don't fetch.** Backend calls go through the feature's `api/`, which
   uses the shared client.
5. Inside a feature, import with relative paths; across folders, use the `@/` alias.
