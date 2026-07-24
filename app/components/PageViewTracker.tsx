'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Отключаем трекинг по ссылке ?notrack=1 (один раз открой сайт с этим параметром)
    if (searchParams.get('notrack') === '1') {
      localStorage.setItem('cera-no-track', 'true')
    }

    const isExcluded = localStorage.getItem('cera-no-track') === 'true'
    if (isExcluded) return

    // Проверяем — был ли уже уникальный визит в этой сессии
    const hasVisited = sessionStorage.getItem('cera-visited')

    if (!hasVisited) {
      sessionStorage.setItem('cera-visited', 'true')

      // Определяем источник трафика
      const utmSource = searchParams.get('utm_source')
      const referrer = typeof document !== 'undefined' ? document.referrer : ''

      let source = 'Direktan pristup'

      if (utmSource) {
        source = utmSource
      } else if (referrer) {
        try {
          const referrerHost = new URL(referrer).hostname
          if (referrerHost.includes('google')) source = 'Google'
          else if (referrerHost.includes('facebook')) source = 'Facebook'
          else if (referrerHost.includes('instagram')) source = 'Instagram'
          else if (referrerHost.includes('olx')) source = 'OLX'
          else if (referrerHost.includes('kupujemprodajem')) source = 'Kupujem Prodajem'
          else if (referrerHost.includes('pinterest')) source = 'Pinterest'
          else if (referrerHost.includes('tiktok')) source = 'TikTok'
          else source = referrerHost
        } catch {
          source = 'Nepoznato'
        }
      }

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'page_view', productName: pathname, source }),
      })
    }
  }, [pathname, searchParams])

  return null
}
