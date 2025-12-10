// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Script from 'next/script'   // ⭐ 新增这一行

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // 👉 这里保持你现在项目里原来的 metadata 内容就行
  // 不用改我这句示例，直接用你自己的配置
  title: 'UnbanNow – Game Ban Appeal & Account Recovery Guides',
  description: '...',
  // 其他字段随你现在的代码
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ⭐⭐⭐ Google Analytics 4 统计代码开始 ⭐⭐⭐ */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BVG0Z8T1EJ"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BVG0Z8T1EJ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* ⭐⭐⭐ Google Analytics 4 统计代码结束 ⭐⭐⭐ */}

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
