# better-auth-svelte-ui

This repository is a SvelteKit project scaffolded with the Svelte CLI. It uses the minimal template with TypeScript enabled as a starting point for building the Better Auth UI. Tailwind CSS is configured via the Svelte CLI add-on.

## Getting started

### Prerequisites
- Node.js 18 or later
- pnpm 9 or later

### Installation
Install project dependencies with pnpm:

```bash
pnpm install
```

### Development server (Vite)
Start a local development server at `http://localhost:5173`:

```bash
pnpm run dev
```

### Cloudflare/Miniflare preview (uses D1 + Worker locally)
Build and run the Worker with Miniflare (Wrangler dev in local mode, with persistence):

```bash
pnpm run dev:mf
```

- Runs `vite build --watch` in the background and serves `.svelte-kit/cloudflare/_worker.js` via Miniflare.  
- Uses `wrangler.toml` bindings; bring your secrets into local dev with `wrangler secret put ... --local` and apply D1 migrations once:

```bash
pnpm exec wrangler d1 migrations apply better-auth-svelte-ui --local --config wrangler.toml
```

> Note: Wrangler v4 では永続化は `--persist-to .wrangler/state` を使います（旧 `--persist` は無効）。`dev:mf` / `preview:mf` は既にこのオプションを指定済みです。

### Type checking
Run SvelteKit's check to validate types and generated routes:

```bash
pnpm run check
```

### Production build
Create an optimized production build:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

### Testing
- Run the Vitest suite (server and browser projects) in CI-friendly mode:

```bash
pnpm run test:unit -- --run
```

- Run end-to-end tests with Playwright (requires installed browsers):

```bash
pnpm run test:e2e
```

If Playwright browsers are missing locally, install them once with:

```bash
pnpm exec playwright install --with-deps
```

### Storybook
- Launch the Storybook development server at `http://localhost:6006`:

```bash
pnpm run storybook
```

- Build the static Storybook bundle (outputs to `storybook-static/`):

```bash
pnpm run storybook:build
```

- The `Auth/SignedIn` story demonstrates how protected content renders only when a session is present.
