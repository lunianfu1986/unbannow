import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keystatic CMS',
  description: 'Content Management System',
}

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <div style={{ width: '100vw', height: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
```
