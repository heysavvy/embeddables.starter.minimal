import type { forms } from './index.ts';

declare module '@embeddables/forms/react' {
  interface EmbeddablesSchemaRegistry {
    forms: typeof forms;
  }
}
