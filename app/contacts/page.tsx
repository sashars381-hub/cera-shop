import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { getSettings } from '../lib/settings'
import TrackedLink from '../components/TrackedLink'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
})

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source).width(900).url()
}

export default async function ContactsPage() {
  const settings = await getSettings()

  const contactsImage = settings?.contactsImage
    ? urlFor(settings.contactsImage)
    : 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=900&auto=format&fit=crop&q=80'

  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

        <div className="order-2 md:order-1">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4" style={{ color: 'var(--text-light)' }}>
            Kontakt
          </p>
          <h1 className="mb-6 md:mb-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, lineHeight: 1.15 }}>
            <span className="text-3xl md:text-5xl">Uvek smo tu<br />za razgovor</span>
          </h1>

          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-light)' }}>Email</p>
              <TrackedLink
                href="mailto:sasha.rs381@gmail.com"
                eventType="contact_email_click"
                className="text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                sasha.rs381@gmail.com
              </TrackedLink>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-light)' }}>Telefon</p>
              <TrackedLink
                href="tel:+381616684751"
                eventType="contact_phone_click"
                className="text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                +381 61 6684 751
              </TrackedLink>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-light)' }}>Instagram</p>
              <a href="#" className="text-base md:text-lg hover:opacity-60 transition-opacity">Coming Soon</a>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-light)' }}>Radno vreme</p>
              <p className="text-base md:text-lg">Pon — Pet, 10:00 — 19:00</p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 overflow-hidden" style={{ backgroundColor: 'var(--muted)', aspectRatio: '4/5' }}>
          <img
            src={contactsImage}
            alt="Cèra"
            className="w-full h-full object-cover"
          />
        </div>

      </section>
    </main>
  )
}