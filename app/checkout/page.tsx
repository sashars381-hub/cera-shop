'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { track } from '@vercel/analytics'
export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('cera-cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.address) {
      alert('Molimo popunite sva polja')
      return
    }

    setLoading(true)

    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, cart, total }),
    })

    const data = await res.json()

    if (data.success) {
      localStorage.removeItem('cera-cart')
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'order_placed', total }),
      })
      router.push('/thank-you')
    } else {
      alert('Greška prilikom slanja porudžbine. Pokušajte ponovo.')
    }
    track('order_placed', { total })
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    borderBottom: '1px solid var(--accent)',
    padding: '12px 0',
    background: 'transparent',
    outline: 'none',
    fontSize: '16px',
    fontFamily: 'Jost, sans-serif',
    fontWeight: 300,
  }

  return (
    <main className="max-w-2xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-center mb-8 md:mb-12" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
        <span className="text-3xl md:text-5xl">Poručivanje</span>
      </h1>

      {/* Состав заказа */}
      <div className="mb-8 md:mb-12 p-4 md:p-6" style={{ backgroundColor: 'var(--muted)' }}>
        <p className="text-xs md:text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--text-light)' }}>
          Vaša porudžbina
        </p>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between py-2 text-sm md:text-base">
            <span>{item.name} × {item.quantity}</span>
            <span>{item.price * item.quantity} RSD</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 mt-4 border-t" style={{ borderColor: 'var(--accent)' }}>
          <span className="text-xs md:text-sm tracking-widest uppercase">Ukupno</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-xl md:text-2xl">{total} RSD</span>
        </div>
      </div>

      {/* Форма */}
      <div className="flex flex-col gap-6 md:gap-8">
        <input
          name="name"
          placeholder="Vaše ime"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="phone"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="address"
          placeholder="Adresa za dostavu"
          value={form.address}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-8 md:mt-10 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-70"
        style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
      >
        {loading ? 'Šaljemo...' : 'Potvrdi porudžbinu'}
      </button>
    </main>
  )
}