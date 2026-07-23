'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cera-cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  const saveCart = (updated: any[]) => {
    setCart(updated)
    localStorage.setItem('cera-cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('cart-updated'))
  }

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item._id !== id)
    saveCart(updated)
  }

  const increaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    saveCart(updated)
  }

  const decreaseQty = (id: string) => {
    const updated = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0)
    saveCart(updated)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-center mb-8 md:mb-12" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
        <span className="text-3xl md:text-5xl">Korpa</span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 md:py-24">
          <p style={{ color: 'var(--text-light)' }} className="mb-8">Korpa je prazna</p>
          <Link href="/catalog">
            <button className="px-10 py-3 text-sm tracking-widest uppercase border hover:opacity-60 transition-opacity" style={{ borderColor: 'var(--foreground)' }}>
              Idi na katalog
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Список товаров */}
          <div className="divide-y" style={{ borderColor: 'var(--muted)' }}>
            {cart.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6">

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--muted)' }}>
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 300 }} className="md:text-[22px]">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm mt-1" style={{ color: 'var(--text-light)' }}>
                      {item.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 pl-0 md:pl-0">
                  {/* Счётчик количества */}
                  <div className="flex items-center gap-3 border" style={{ borderColor: 'var(--muted)' }}>
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity"
                    >
                      −
                    </button>
                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right" style={{ minWidth: '80px' }}>
                    <p className="text-sm md:text-base">{item.price * item.quantity} RSD</p>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-xs md:text-sm tracking-widest uppercase hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--text-light)' }}
                  >
                    Ukloni
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Итог */}
          <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between md:items-center" style={{ borderColor: 'var(--muted)' }}>
            <div>
              <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--text-light)' }}>Ukupno</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }} className="text-2xl md:text-4xl">
                {total} RSD
              </p>
            </div>
            <Link href="/checkout">
              <button className="w-full md:w-auto px-12 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-70" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
                Poruči
              </button>
            </Link>
          </div>
        </>
      )}
    </main>
  )
}