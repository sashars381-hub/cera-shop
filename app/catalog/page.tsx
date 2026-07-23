import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
})
const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source).width(600).url()
}

// label — то что видно в URL и на кнопке, dbValue — реальное название категории в базе
const CATEGORY_FILTERS = [
  { label: 'SOAPS', dbValue: 'SOAPS' },
  { label: 'Podarci', dbValue: 'Podarci' },
  { label: 'Aroma', dbValue: 'Aroma' },
  { label: 'Basket', dbValue: 'Basket' },
]

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  // находим реальное значение категории в базе по label из URL
  const matched = CATEGORY_FILTERS.find((c) => c.label === category)
  const dbCategory = matched?.dbValue

  const query = dbCategory
    ? `*[_type == "product" && category == "${dbCategory}"]`
    : `*[_type == "product"]`
  const products = await client.fetch(query)

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Заголовок */}
      <h1 className="text-center mb-8 md:mb-12" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }} >
        <span className="text-3xl md:text-5xl">Katalog</span>
      </h1>

      {/* Фильтры */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-16 px-2">
        <Link href="/catalog">
          <button
            className="text-xs md:text-sm tracking-widest uppercase pb-1 transition-all hover:opacity-60"
            style={{
              borderBottom: !category ? '1px solid var(--foreground)' : '1px solid transparent',
            }}
          >
            Sve
          </button>
        </Link>
        {CATEGORY_FILTERS.map((cat) => (
          <Link key={cat.label} href={`/catalog?category=${cat.label}`}>
            <button
              className="text-xs md:text-sm tracking-widest uppercase pb-1 transition-all hover:opacity-60"
              style={{
                borderBottom: cat.label === category ? '1px solid var(--foreground)' : '1px solid transparent',
              }}
            >
              {cat.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Товары */}
      {products.length === 0 ? (
        <p className="text-center" style={{ color: 'var(--text-light)' }}>
          Proizvodi nisu pronađeni
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {products.map((product: any) => (
            <Link href={`/product/${product._id}`} key={product._id}>
              <div className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-3 md:mb-4" style={{ backgroundColor: 'var(--muted)' }}>
                  {product.image && (
                    <img
                      src={urlFor(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }} className="text-base md:text-xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs md:text-sm" style={{ color: 'var(--text-light)' }}>
                  {product.category}
                </p>
                <p className="mt-1 text-xs md:text-sm">
                  {product.price} RSD
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
