export default function TermsPage() {
    return (
      <main className="max-w-2xl mx-auto px-4 md:px-8 py-14 md:py-24">
        <p className="text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 text-center" style={{ color: 'var(--text-light)' }}>
          Dokumenti
        </p>
        <h1 className="text-center mb-10 md:mb-16" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
          <span className="text-3xl md:text-5xl">Uslovi korišćenja</span>
        </h1>

        <div className="flex flex-col gap-8 md:gap-10 text-sm md:text-base" style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
          <div>
            <h2 className="mb-3 text-xl md:text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'var(--foreground)' }}>
              Plaćanje
            </h2>
            <p>Plaćanje se vrši isključivo gotovinom prilikom preuzimanja porudžbine.</p>
          </div>
          <div>
            <h2 className="mb-3 text-xl md:text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'var(--foreground)' }}>
              Povraćaj
            </h2>
            <p>Povraćaj proizvoda je moguć u roku od 14 dana od dana prijema, pod uslovom da je proizvod netaknut i u originalnom pakovanju.</p>
          </div>
          <div>
            <h2 className="mb-3 text-xl md:text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'var(--foreground)' }}>
              Lični podaci
            </h2>
            <p>Vaše podatke čuvamo isključivo radi obrade porudžbina i ne delimo ih sa trećim licima.</p>
          </div>
        </div>
      </main>
    )
  }