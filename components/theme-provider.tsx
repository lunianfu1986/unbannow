'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// 关键：不再从 'next-themes' 里 import 类型，
// 而是用 React.ComponentProps<typeof NextThemesProvider> 来推导类型。
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      // 按需可以开启/关闭这些：
      // disableTransitionOnChange
      // themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  )
}
