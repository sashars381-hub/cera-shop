'use client'

import { useState } from 'react'

export default function AddToCart({ product, fullWidth = false }: { product: any, fullWidth?: boolean }) {
  const [show, setShow] = useState(false)

  const addToCart = async () => {
    const saved = localStorage.getItem('cera-cart')
    const cart = saved ? JSON.parse(saved) : []
    const existing = cart.find((item: any) => item._id === product._id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cera-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'add_to_cart', productName: product.name }),
    })

    setShow(true)
    setTimeout(() => setShow(false), 3000)
  }

  return (
    <>
      <button
        onClick={addToCart}
        className={`${fullWidth ? 'w-full mt-10 py-4 text-sm' : 'px-4 py-2 text-[10px] md:text-xs whitespace-nowrap'} tracking-widest uppercase transition-all hover:opacity-70`}        style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
      >
        U korpu
      </button>

      {/* Уведомление */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-10 py-4 text-sm tracking-widest uppercase transition-all duration-500"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--accent)',
          color: 'var(--foreground)',
          opacity: show ? 1 : 0,
          transform: show ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
          pointerEvents: 'none',
          letterSpacing: '0.15em',
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        Proizvod je dodat u korpu
      </div>
    </>
  )
}