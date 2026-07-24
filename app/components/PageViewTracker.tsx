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

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'page_view', productName: pathname }),
      })
    }
  }, [pathname, searchParams])

  return null
}
