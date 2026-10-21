# Embeddables Starter

Minimal Vite, React, and Tailwind app wired to Embeddables Core and Forms. No
protocol, brand, or multi-product setup — a clean base for a new project.

## Run

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and set:

- `EMBEDDABLES_PUBLISHABLE_KEY` — `pk_sandbox_…` for local dev, `pk_live_…` in production
- `EMBEDDABLES_PROJECT_ID` — your project UUID (overrides `embeddables/config.yaml` when set)

Values come from `em init` or Settings → Portal / SDK in the admin app.

## Connect your Embeddables project

`embeddables/config.yaml` ships with a placeholder project id and one sample
form (`Contact`) so the app typechecks and builds before login. Replace it
with your project:

```bash
pnpm exec em login
pnpm exec em init
pnpm build
```

Add more forms with `pnpm exec em form create --name "<name>"`, or protocols
with `pnpm exec em protocol install <protocol-id>` — then `pnpm build` and
import from `embeddables/_dist`.

Docs: https://docs.platform.embeddables.com/
