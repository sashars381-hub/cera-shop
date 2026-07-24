'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
})

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source).width(400).url()
}

export default function GiftBuilderPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedBasket, setSelectedBasket] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const data = await client.fetch(`*[_type == "product"]`)
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const baskets = products.filter((p) => p.category === 'Basket')
  const items = products.filter((p) => p.category !== 'Basket')

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id))
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id])
      }
    }
  }

  const selectedProducts = products.filter((p) => selectedItems.includes(p._id))
  const basketProduct = products.find((p) => p._id === selectedBasket)

  const rawTotal =
    selectedProducts.reduce((sum, p) => sum + p.price, 0) +
    (basketProduct ? basketProduct.price : 0)

  const discountedTotal = Math.round(rawTotal * 0.9)

  const canAddToCart = selectedItems.length >= 2 && selectedBasket !== null

  const addBundleToCart = async () => {
    if (!canAddToCart) return

    const bundleName =
      'Poklon set: ' + selectedProducts.map((p) => p.name).join(', ') + ' + ' + basketProduct?.name

    const bundleItem = {
      _id: 'bundle-' + Date.now(),
      name: bundleName,
      category: 'Poklon set',
      price: discountedTotal,
      quantity: 1,
      imageUrl: basketProduct ? urlFor(basketProduct.image) : null,
    }

    const saved = localStorage.getItem('cera-cart')
    const cart = saved ? JSON.parse(saved) : []
    cart.push(bundleItem)
    localStorage.setItem('cera-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'add_to_cart', productName: bundleName }),
    })

    router.push('/cart')
  }

  if (loading) {
    return <p className="text-center py-32" style={{ color: 'var(--text-light)' }}>Učitavanje...</p>
  }

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <p className="text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 text-center" style={{ color: 'var(--text-light)' }}>
        Napravite svoj
      </p>
      <h1 className="text-center mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
        <span className="text-3xl md:text-5xl">Poklon set</span>
      </h1>
      <p className="text-center mb-10 md:mb-16 text-sm md:text-base" style={{ color: 'var(--text-light)' }}>
        Izaberite 2–3 proizvoda i korpu za pakovanje. Dobijate 10% popusta na ceo set.
      </p>

      {/* Шаг 1 — выбор товаров */}
      <div className="mb-4">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--text-light)' }}>
          1. Izaberite proizvode ({selectedItems.length}/3)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((product) => {
            const isSelected = selectedItems.includes(product._id)
            return (
              <button
                key={product._id}
                onClick={() => toggleItem(product._id)}
                className="text-left transition-opacity"
                style={{ opacity: !isSelected && selectedItems.length >= 3 ? 0.4 : 1 }}
              >
                <div
                  className="overflow-hidden mb-2 relative"
                  style={{
                    backgroundColor: 'var(--muted)',
                    aspectRatio: '3/4',
                    border: isSelected ? '2px solid var(--foreground)' : '2px solid transparent',
                  }}
                >
                  {product.image && (
                    <img src={urlFor(product.image)} alt={product.name} className="w-full h-full object-cover" />
                  )}
                  {isSelected && (
                    <div
                      className="absolute top-2 right-2 flex items-center justify-center rounded-full"
                      style={{ width: '22px', height: '22px', backgroundColor: 'var(--foreground)', color: 'var(--background)', fontSize: '12px' }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <p className="text-xs md:text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {product.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-light)' }}>{product.price} RSD</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Шаг 2 — выбор корзины */}
      <div className="mt-10 md:mt-14 mb-8">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--text-light)' }}>
          2. Izaberite korpu za pakovanje
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {baskets.map((basket) => {
            const isSelected = selectedBasket === basket._id
            return (
              <button
                key={basket._id}
                onClick={() => setSelectedBasket(basket._id)}
                className="text-left"
              >
                <div
                  className="overflow-hidden mb-2 relative"
                  style={{
                    backgroundColor: 'var(--muted)',
                    aspectRatio: '3/4',
                    border: isSelected ? '2px solid var(--foreground)' : '2px solid transparent',
                  }}
                >
                  {basket.image && (
                    <img src={urlFor(basket.image)} alt={basket.name} className="w-full h-full object-cover" />
                  )}
                  {isSelected && (
                    <div
                      className="absolute top-2 right-2 flex items-center justify-center rounded-full"
                      style={{ width: '22px', height: '22px', backgroundColor: 'var(--foreground)', color: 'var(--background)', fontSize: '12px' }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <p className="text-xs md:text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {basket.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-light)' }}>{basket.price} RSD</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Итог */}
      <div className="mt-10 md:mt-14 p-6 md:p-8" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: 'var(--text-light)' }}>Cena bez popusta</span>
          <span className="text-sm line-through" style={{ color: 'var(--text-light)' }}>{rawTotal} RSD</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm tracking-widest uppercase">Ukupno sa popustom (-10%)</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300 }}>
            {discountedTotal} RSD
          </span>
        </div>
        <button
          onClick={addBundleToCart}
          disabled={!canAddToCart}
          className="w-full py-4 text-sm tracking-widest uppercase transition-all hover:opacity-70"
          style={{
            backgroundColor: canAddToCart ? 'var(--foreground)' : 'var(--accent)',
            color: 'var(--background)',
            cursor: canAddToCart ? 'pointer' : 'not-allowed',
          }}
        >
          {canAddToCart ? 'Dodaj set u korpu' : 'Izaberite bar 2 proizvoda i korpu'}
        </button>
      </div>
    </main>
  )
}
