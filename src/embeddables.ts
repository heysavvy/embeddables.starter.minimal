import { config } from '../embeddables/_dist/config.ts'
import { modules as generatedModules } from '../embeddables/_dist/modules.ts'

function envString(value: string | undefined): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export const publishableKey = envString(import.meta.env.EMBEDDABLES_PUBLISHABLE_KEY)

// * Analytics needs a publishable key to send events; without one, skip the module.
export const modules = publishableKey
  ? generatedModules
  : generatedModules.filter((module) => module.key !== 'analytics')

const projectId = envString(import.meta.env.EMBEDDABLES_PROJECT_ID) ?? config.projectId

export const embeddablesConfig = {
  ...config,
  projectId,
}
