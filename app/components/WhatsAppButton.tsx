'use client'

export default function WhatsAppButton() {
  const handleClick = () => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'whatsapp_click' }),
    })
  }

  return (
    
    <a href="https://wa.me/79213945962"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center transition-all hover:opacity-80"
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: 'var(--foreground)',
        borderRadius: '50%',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      }}
      aria-label="WhatsApp"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l4.93-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
      </svg>
    </a>
  )
}