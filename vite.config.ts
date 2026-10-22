import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

const ENV_PREFIXES = ['VITE_', 'EMBEDDABLES_']

/** `vars.EMBEDDABLES_PUBLISHABLE_KEY` from wrangler.jsonc, or undefined when it is empty. */
function wranglerPublishableKey(): string | undefined {
  const wrangler = readFileSync(path.resolve(import.meta.dirname, 'wrangler.jsonc'), 'utf8')
  return /"EMBEDDABLES_PUBLISHABLE_KEY"\s*:\s*"([^"]+)"/.exec(wrangler)?.[1]
}

export default defineConfig(({ mode }) => {
  // * The publishable key lives in wrangler.jsonc so the deployed build gets it without a CI
  // * secret. A key from the environment or a .env file still wins.
  const env = loadEnv(mode, import.meta.dirname, ENV_PREFIXES)
  const fallbackKey = wranglerPublishableKey()
  if (!env.EMBEDDABLES_PUBLISHABLE_KEY && fallbackKey) {
    process.env.EMBEDDABLES_PUBLISHABLE_KEY = fallbackKey
  }
  return {
    envPrefix: ENV_PREFIXES,
    plugins: [react(), tailwindcss(), cloudflare()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
      },
    },
  }
})
