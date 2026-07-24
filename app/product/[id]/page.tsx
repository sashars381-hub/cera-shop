import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import AddToCart from '../../components/AddToCart'
import ProductViewTracker from '../../components/ProductViewTracker'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
})

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source).width(800).url()
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await client.fetch(`*[_type == "product" && _id == "${id}"][0]`)
  const reviews = await client.fetch(`*[_type == "review"] | order(_createdAt desc)`)
  const relatedProducts = await client.fetch(
    `*[_type == "product" && category == "${product?.category}" && _id != "${id}"][0...4]`
  )

  if (!product) {
    return <p className="text-center py-32">Proizvod nije pronađen</p>
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">

      <ProductViewTracker productName={product.name} />

      {/* Карточка товара */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

        {/* Фото */}
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--muted)', aspectRatio: '3/4' }}>
          {product.image && (
            <img
              src={urlFor(product.image)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Информация */}
        <div className="flex flex-col justify-center">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4" style={{ color: 'var(--text-light)' }}>
            {product.category}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, lineHeight: 1.1 }} className="text-3xl md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 md:mt-6 text-xl md:text-2xl tracking-wide">
            {product.price} RSD
          </p>
          <p className="mt-4 md:mt-6 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-light)' }}>
            {product.description}
          </p>
          <AddToCart product={{ ...product, imageUrl: urlFor(product.image) }} fullWidth={true} />
        </div>

      </div>

      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 md:mt-24">
          <p className="text-sm tracking-widest uppercase text-center mb-8 md:mb-12" style={{ color: 'var(--text-light)' }}>
            Možda vam se svidi
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {relatedProducts.map((related: any) => (
              <Link href={`/product/${related._id}`} key={related._id}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden mb-3" style={{ backgroundColor: 'var(--muted)', aspectRatio: '3/4' }}>
                    {related.image && (
                      <img
                        src={urlFor(related.image)}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }} className="text-sm md:text-lg">
                    {related.name}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm">
                    {related.price} RSD
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Отзывы */}
      {reviews.length > 0 && (
        <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review: any) => (
            <div key={review._id} className="flex flex-col gap-4 p-6 md:p-8" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--muted)' }}>

              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: '40px', height: '40px', backgroundColor: 'var(--accent)', color: 'white', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}
                >
                  {review.name?.charAt(0)}
                </div>
                <div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 300 }}>
                    {review.name}
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-light)' }}>
                    {review.city}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '14px',
                      color: i < (review.rating || 5) ? '#D4A843' : 'var(--muted)',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="leading-relaxed text-sm" style={{ color: 'var(--text-light)' }}>
                {review.text}
              </p>

              <p className="text-xs tracking-widest uppercase pt-2 border-t" style={{ borderColor: 'var(--muted)', color: 'var(--text-light)' }}>
                Kupila: {review.productName}
              </p>

            </div>
          ))}
        </section>
      )}

    </main>
  )
}
