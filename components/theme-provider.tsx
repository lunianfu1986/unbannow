'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps & { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      // 如果你有配置过自定义主题列表，也可以在这里加：
      // themes={['light', 'dark']}
      // disableTransitionOnChange 也可以按需加：
      // disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
