import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'UnbanNow – Game Ban Appeal & Account Recovery Guides',
    template: '%s | UnbanNow',
  },
  description:
    'Step-by-step guides to help you understand game bans, prepare strong appeals, and protect your accounts in popular online games like Escape from Tarkov, CS2, Apex Legends, FIFA / FC 25, War Thunder, Rainbow Six Siege and more.',
  openGraph: {
    title: 'UnbanNow – Game Ban Appeal & Account Recovery Guides',
    description:
      'Step-by-step guides to help you understand game bans, prepare strong appeals, and protect your accounts in popular online games like Escape from Tarkov, CS2, Apex Legends, FIFA / FC 25, War Thunder, Rainbow Six Siege and more.',
    url: 'https://unbannow.vercel.app',
    siteName: 'UnbanNow',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnbanNow – Game Ban Appeal & Account Recovery Guides',
    description:
      'Step-by-step guides to help you understand game bans, prepare strong appeals, and protect your accounts in popular online games like Escape from Tarkov, CS2, Apex Legends, FIFA / FC 25, War Thunder, Rainbow Six Siege and more.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
