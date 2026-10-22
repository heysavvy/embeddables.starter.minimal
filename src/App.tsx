import { EmbeddablesProvider, useAppUserId, useEmbeddables } from '@embeddables/core/react'
import { useForm, useFormField } from '@embeddables/forms/react'
import { Route, Routes } from 'react-router'

import { embeddablesConfig, modules, publishableKey } from '@/embeddables.ts'
import { homePageView, usePageView } from '@/usePageView.ts'

const CONTACT_FORM_ID = '00000000-0000-4000-8000-000000000001'

function ContactForm() {
  const { form } = useForm({ formId: CONTACT_FORM_ID })
  const name = useFormField({ form, key: 'name' })
  const email = useFormField({ form, key: 'email' })

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        void form?.submit()
      }}
    >
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">Name</span>
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          value={(name.value as string | undefined) ?? ''}
          onChange={(event) => name.setValue(event.target.value)}
          onBlur={() => void name.onBlur()}
        />
        {name.error?.[0] && <p className="text-sm text-red-700">{name.error[0]}</p>}
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">Email</span>
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          type="email"
          value={(email.value as string | undefined) ?? ''}
          onChange={(event) => email.setValue(event.target.value)}
          onBlur={() => void email.onBlur()}
        />
        {email.error?.[0] && <p className="text-sm text-red-700">{email.error[0]}</p>}
      </label>

      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Submit
      </button>
    </form>
  )
}

function Home() {
  const embeddables = useEmbeddables()
  const appUserId = useAppUserId()
  usePageView(homePageView)
  const initError =
    embeddables?.isError && embeddables.error instanceof Error
      ? embeddables.error.message
      : embeddables?.isError
        ? 'Embeddables could not initialize.'
        : null

  return (
    <div className="mx-auto max-w-xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Embeddables Starter</h1>
        <p className="text-zinc-600">
          A minimal Vite + React app wired to Embeddables Core and Forms. Edit{' '}
          <code className="font-mono text-sm">src/App.tsx</code> and{' '}
          <code className="font-mono text-sm">embeddables/config.yaml</code> to build your flow.
        </p>
      </div>

      {publishableKey == null && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Set <code className="font-mono">EMBEDDABLES_PUBLISHABLE_KEY</code> in{' '}
          <code className="font-mono">.env</code> to reach Embeddables. Identity still works
          locally.
        </p>
      )}

      <p className="font-mono text-sm text-zinc-500">App user: {appUserId}</p>

      {initError ? (
        <p className="text-red-700">{initError}</p>
      ) : embeddables == null ? (
        <p className="text-zinc-500">Loading…</p>
      ) : (
        <ContactForm />
      )}
    </div>
  )
}

export default function App() {
  return (
    <EmbeddablesProvider
      config={embeddablesConfig}
      modules={modules}
      publishableKey={publishableKey}
    >
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </EmbeddablesProvider>
  )
}
