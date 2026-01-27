import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "UnbanNow",
  description: "Appeal & game account recovery platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* =========================
            Umami Analytics
        ========================== */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="7cff103d-5f99-4bc6-85a9-801740b212ed"
          strategy="afterInteractive"
        />

        {/* =========================
            Google AdSense / Google Analytics base script
        ========================== */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7976801863448636"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        {/* 
          ⚠️ 如果你的项目里使用了 useSearchParams / useRouter
          必须包在 Suspense 中，否则 build / prerender 会报错
        */}
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
