import Link from 'next/link'
import { getSettings } from '../lib/settings'

export default async function ThankYouPage() {
  const settings = await getSettings()

  return (
    <main className="flex flex-col items-center justify-center text-center py-32 px-8">

      {settings?.thankYouPixelCode && (
        <div dangerouslySetInnerHTML={{ __html: settings.thankYouPixelCode }} />
      )}

      <p className="text-sm tracking-widest uppercase mb-6" style={{ color: 'var(--text-light)' }}>
        Hvala na porudžbini
      </p>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '56px', fontWeight: 300 }}>
        Kontaktiraćemo vas<br />uskoro
      </h1>
      <Link href="/">
        <button className="mt-12 px-10 py-3 text-sm tracking-widest uppercase border hover:opacity-60 transition-opacity" style={{ borderColor: 'var(--foreground)' }}>
          Nazad na početnu
        </button>
      </Link>
    </main>
  )
}