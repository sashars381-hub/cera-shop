import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Header from './components/Header'
import { getSettings } from './lib/settings'
import { Analytics } from '@vercel/analytics/react'
import WhatsAppButton from './components/WhatsAppButton'
import PageViewTracker from './components/PageViewTracker'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: settings?.siteName || 'Cera',
    description: settings?.tagline || 'Autorske svece',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const bg = settings?.primaryColor || '#FAF8F5'
  const accent = settings?.accentColor || '#C9B99A'

  return (
    <html lang="ru">
      <head>
        {settings?.fbPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '" + settings.fbPixelId + "');fbq('track', 'PageView');"
            }}
          />
        )}
        {settings?.googleAnalyticsId && (
          <>
            <script async src={"https://www.googletagmanager.com/gtag/js?id=" + settings.googleAnalyticsId} />
            <script
              dangerouslySetInnerHTML={{
                __html: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '" + settings.googleAnalyticsId + "');"
              }}
            />
          </>
        )}
        {settings?.customHeadCode && (
          <div dangerouslySetInnerHTML={{ __html: settings.customHeadCode }} />
        )}
        <style>{":root { --background: " + bg + "; --accent: " + accent + "; }"}</style>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xrch5iyl3u");
            `,
          }}
        />
      </head>
      <body>
        <Header settings={settings} />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        {children}
        <Analytics />
        <WhatsAppButton />
      </body>
    </html>
  )
}
