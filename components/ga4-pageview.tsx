'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function GA4PageView({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!measurementId) return
    if (typeof window === 'undefined') return
    if (!window.gtag) return

    // 不统计后台 /admin
    if (pathname?.startsWith('/admin')) return

    const qs = searchParams?.toString()
    const page_path = qs ? `${pathname}?${qs}` : pathname

    // 这里用 config 方式上报 SPA page_view
    window.gtag('config', measurementId, {
      page_path,
    })
  }, [pathname, searchParams, measurementId])

  return null
}
