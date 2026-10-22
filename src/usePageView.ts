import {
  useEmbeddables,
  useRegisterPageView,
  type RegisterPageViewHookResult,
} from '@embeddables/core/react'
import { useEffect } from 'react'

type PageView = Parameters<RegisterPageViewHookResult['registerPageView']>[0]

export const homePageView = { pageKey: 'home' } as const satisfies PageView

export function usePageView(page: PageView) {
  const embeddables = useEmbeddables()
  const ready = embeddables != null && !embeddables.isError
  const pageView = useRegisterPageView()

  useEffect(() => {
    if (!ready) return
    void pageView.registerPageView(page)
  }, [page.pageKey, pageView.registerPageView, ready])

  return pageView
}
