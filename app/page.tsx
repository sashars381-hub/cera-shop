import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import { getSettings } from './lib/settings'
import AddToCart from './components/AddToCart'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source).width(800).height(1000).fit('fillmax').bg('FAF8F5').url()
}

function urlForCategory(source: any) {
  return builder.image(source).width(1200).url()
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const query = category
    ? `*[_type == "product" && category == "${category}"]`
    : `*[_type == "product"]`

  const products = await client.fetch(query)
  const settings = await getSettings()

  const categories = settings?.categories || []
  const siteName = settings?.siteName || 'Cèra'

  return (
    <main>

      {/* Категории */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 pt-0 pb-8 md:pb-12">

          <div
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2"
            style={{ gridTemplateRows: 'auto' }}
          >

            {/* Большой блок слева — первая категория */}
            {categories[0] && (() => {
              const cat = categories[0]
              const catTitle = typeof cat === 'string' ? cat : cat.title
              const catImage = typeof cat === 'object' && cat.image ? urlForCategory(cat.image) : null
              return (
                <Link href={`/?category=${catTitle}`} className="md:row-span-2">
                  <div className="relative overflow-hidden group cursor-pointer h-[280px] md:h-[500px]">
                    {catImage && (
                      <img
                        src={catImage}
                        alt={catTitle}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: 'left center' }}
                      />
                    )}
                    <div className="absolute inset-0" style={{ backgroundColor: catImage ? 'rgba(0,0,0,0.25)' : 'var(--muted)' }} />
                    <div className="absolute bottom-0 left-0 p-5 md:p-8">
                      <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Kolekcija</p>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: catImage ? 'white' : 'var(--foreground)' }} className="text-2xl md:text-4xl">
                        {catTitle}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })()}

            {/* Маленький блок сверху справа — вторая категория */}
            {categories[1] && (() => {
              const cat = categories[1]
              const catTitle = typeof cat === 'string' ? cat : cat.title
              const catImage = typeof cat === 'object' && cat.image ? urlForCategory(cat.image) : null
              return (
                <Link href={`/?category=${catTitle}`}>
                  <div className="relative overflow-hidden group cursor-pointer h-[180px] md:h-[246px]">
                    {catImage && (
                      <img
                        src={catImage}
                        alt={catTitle}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: 'center center' }}
                      />
                    )}
                    <div className="absolute inset-0" style={{ backgroundColor: catImage ? 'rgba(0,0,0,0.25)' : 'var(--muted)' }} />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                      <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Kolekcija</p>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: catImage ? 'white' : 'var(--foreground)' }} className="text-lg md:text-2xl">
                        {catTitle}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })()}

            {/* Маленький блок снизу справа — третья категория */}
            {categories[2] && (() => {
              const cat = categories[2]
              const catTitle = typeof cat === 'string' ? cat : cat.title
              const catImage = typeof cat === 'object' && cat.image ? urlForCategory(cat.image) : null
              return (
                <Link href={`/?category=${catTitle}`}>
                  <div className="relative overflow-hidden group cursor-pointer h-[180px] md:h-[246px]">
                    {catImage && (
                      <img
                        src={catImage}
                        alt={catTitle}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: 'center center' }}
                      />
                    )}
                    <div className="absolute inset-0" style={{ backgroundColor: catImage ? 'rgba(0,0,0,0.25)' : 'var(--muted)' }} />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                      <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Kolekcija</p>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: catImage ? 'white' : 'var(--foreground)' }} className="text-lg md:text-2xl">
                        {catTitle}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })()}

          </div>
        </section>
      )}

      {/* Активный фильтр */}
      {category && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 mb-6 md:mb-8 flex items-center justify-center gap-4">
          <p className="text-xs md:text-sm tracking-widest uppercase" style={{ color: 'var(--text-light)' }}>
            Prikazano: {category}
          </p>
          <Link href="/" className="text-xs md:text-sm tracking-widest uppercase underline hover:opacity-60 transition-opacity">
            Poništi
          </Link>
        </div>
      )}

      {/* Товары */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
        {products.length === 0 ? (
          <p className="text-center" style={{ color: 'var(--text-light)' }}>
            Proizvodi nisu pronađeni
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {products.map((product: any) => (
              <div key={product._id} className="group">
                <Link href={`/product/${product._id}`}>
                  <div className="overflow-hidden mb-3 md:mb-4" style={{ backgroundColor: 'var(--muted)', aspectRatio: '3/4' }}>
                    {product.image && (
                      <img
                        src={urlFor(product.image)}
                        alt={product.name}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }} className="text-base md:text-xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm" style={{ color: 'var(--text-light)' }}>
                    {product.category}
                  </p>
                </Link>

                {/* Цена и кнопка */}
                <div className="flex items-center justify-between mt-2 md:mt-3 gap-2">
                  <p className="text-sm md:text-base">{product.price} RSD</p>
                  <AddToCart product={{ ...product, imageUrl: product.image ? urlFor(product.image) : null }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-10 md:py-12 px-4 md:px-8 text-center text-sm tracking-widest" style={{ borderColor: 'var(--muted)', color: 'var(--text-light)' }}>
        <p className="mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: 'var(--foreground)' }}>
          {siteName}
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 uppercase mb-4 text-xs md:text-sm">
          <Link href="/contacts" className="hover:opacity-60 transition-opacity">Kontakt</Link>
          <Link href="/dostava" className="hover:opacity-60 transition-opacity">Dostava</Link>
          <Link href="/uslovi" className="hover:opacity-60 transition-opacity">Uslovi</Link>
        </div>
        <p className="text-xs md:text-sm">© 2026 {siteName}. Sva prava zadržana.</p>
      </footer>

    </main>
  )
}