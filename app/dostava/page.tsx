export default function DeliveryPage() {
    return (
      <main className="max-w-2xl mx-auto px-4 md:px-8 py-14 md:py-24">
        <p className="text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 text-center" style={{ color: 'var(--text-light)' }}>
          Dostava
        </p>
        <h1 className="text-center mb-10 md:mb-16" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
          <span className="text-3xl md:text-5xl">Uslovi dostave</span>
        </h1>

        <div className="flex flex-col gap-8 md:gap-12">

          <div className="border-b pb-6 md:pb-8" style={{ borderColor: 'var(--muted)' }}>
            <h2 className="mb-3 md:mb-4 text-xl md:text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Beograd
            </h2>
            <p className="text-sm md:text-base" style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
              Besplatna dostava za sve porudžbine u okviru Beograda. Vreme isporuke 1–2 radna dana.
            </p>
          </div>

          <div className="border-b pb-6 md:pb-8" style={{ borderColor: 'var(--muted)' }}>
            <h2 className="mb-3 md:mb-4 text-xl md:text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Ostatak Srbije
            </h2>
            <p className="text-sm md:text-base" style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
              Šaljemo širom Srbije putem kurirskih službi. Cena dostave zavisi od grada i težine pošiljke i obračunava se prema važećem cenovniku kurirske službe u trenutku slanja. Vreme isporuke 2–4 radna dana.
            </p>
          </div>

          <div>
            <h2 className="mb-3 md:mb-4 text-xl md:text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Preuzimanje
            </h2>
            <p className="text-sm md:text-base" style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
              Poručene proizvode možete preuzeti i lično. Adresu i vreme preuzimanja dogovaramo pojedinačno nakon porudžbine.
            </p>
          </div>

        </div>
      </main>
    )
  }