'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header({ settings }: { settings: any }) {
  const siteName = settings?.siteName || 'Cèra'
  const [cartCount, setCartCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const updateCount = () => {
    const saved = localStorage.getItem('cera-cart')
    if (saved) {
      const cart = JSON.parse(saved)
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    } else {
      setCartCount(0)
    }
  }

  useEffect(() => {
    updateCount()
    window.addEventListener('cart-updated', updateCount)
    window.addEventListener('storage', updateCount)
    return () => {
      window.removeEventListener('cart-updated', updateCount)
      window.removeEventListener('storage', updateCount)
    }
  }, [])

  return (
    <>
      <div style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }} className="text-center py-2 text-[10px] md:text-xs tracking-widest uppercase px-4">
      Besplatna dostava za Beograd      </div>
      <header
        style={{
          backgroundColor: 'var(--background)',
          borderBottom: '1px solid var(--muted)',
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between relative">

          {/* Десктоп-навигация слева */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/catalog" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">
              Katalog
            </Link>
            <Link href="/?category=Podarci" className="flex items-center gap-2 text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="8" width="18" height="13" />
                <path d="M3 8h18M12 8v13M12 8c-1.5-3-4-5-6-3.5S3 8 3 8M12 8c1.5-3 4-5 6-3.5S21 8 21 8" />
              </svg>
              Pokloni
            </Link>
          </nav>

          {/* Бургер-кнопка на мобильном */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6"
            aria-label="Meni"
          >
            <span style={{ backgroundColor: 'var(--foreground)' }} className="block h-[1px] w-full" />
            <span style={{ backgroundColor: 'var(--foreground)' }} className="block h-[1px] w-full" />
          </button>

          {/* Логотип по центру */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, letterSpacing: '0.15em' }} className="text-xl md:text-[28px]">
              {siteName}
            </span>
          </Link>

          {/* Десктоп-навигация справа */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/contacts" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">
              Kontakt
            </Link>
            <Link href="/cart" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">
              Korpa{cartCount > 0 ? ` (${cartCount})` : ''}
            </Link>
          </nav>

          {/* Иконка корзины на мобильном */}
          <Link href="/cart" className="md:hidden text-xs tracking-widest uppercase">
            Korpa{cartCount > 0 ? ` (${cartCount})` : ''}
          </Link>

        </div>
      </header>

      {/* Мобильное меню на весь экран */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col md:hidden"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: 'var(--muted)' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300 }}>
              {siteName}
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Zatvori" className="text-2xl leading-none">
              ×
            </button>
          </div>
          <nav className="flex flex-col gap-8 px-8 py-12 text-center">
            <Link href="/catalog" onClick={() => setMenuOpen(false)} className="text-lg tracking-widest uppercase">
              Katalog
            </Link>
            <Link href="/?category=Podarci" onClick={() => setMenuOpen(false)} className="text-lg tracking-widest uppercase">
              Pokloni
            </Link>
            <Link href="/contacts" onClick={() => setMenuOpen(false)} className="text-lg tracking-widest uppercase">
              Kontakt
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}