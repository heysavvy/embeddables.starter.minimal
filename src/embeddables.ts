import { config } from '../embeddables/_dist/config.ts'
import { modules } from '../embeddables/_dist/modules.ts'

export { modules }

function envString(value: string | undefined): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export const publishableKey = envString(import.meta.env.EMBEDDABLES_PUBLISHABLE_KEY)

const projectId = envString(import.meta.env.EMBEDDABLES_PROJECT_ID) ?? config.projectId

export const embeddablesConfig = {
  ...config,
  projectId,
}
