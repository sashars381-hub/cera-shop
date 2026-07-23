export function formatPrice(price: number) {
    const rsd = Math.round(price * 1.15)
    return `${rsd} RSD`
  }