'use client'

import { useEffect } from 'react'

export default function ProductViewTracker({ productName }: { productName: string }) {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product_view', productName }),
    })
  }, [productName])

  return null
}