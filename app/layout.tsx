// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Script from 'next/script'
import { GA4PageView } from '@/components/ga4-pageview'
import { Suspense } from 'react' // ✅ 新增

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gaming Account Unban Service for CS2, Escape from Tarkov, Apex, and others',
  description:
    'Professional Gaming Account Unban Service - Get unbanned from CS2, Apex, PUBG, Escape from Tarkov, VAC bans, MapleStory, Overwatch, and many more!',
}

const GA_MEASUREMENT_ID = 'G-BVG0Z8T1EJ'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ✅ GA4：加载 gtag（排除 /admin） */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${G-BVG0Z8T1EJ}`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            (function () {
              // 不统计后台 /admin
              if (window.location && window.location.pathname && window.location.pathname.startsWith('/admin')) return;

              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('js', new Date());

              // 关闭自动首屏 page_view，交给下面的 GA4PageView 统一上报（避免首屏重复统计）
              gtag('config', '${G-BVG0Z8T1EJ}', { send_page_view: false });
            })();
          `}
        </Script>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="7cff103d-5f99-4bc6-85a9-801740b212ed"></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7976801863448636"
     crossOrigin="anonymous"></script>

        {/* ✅ 关键修复：useSearchParams() 必须包在 Suspense 里，否则 build/prerender 会报错 */}
        <Suspense fallback={null}>
          <GA4PageView measurementId={G-BVG0Z8T1EJ} />
        </Suspense>

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
