'use client'

export default function TrackedLink({
  href,
  eventType,
  className,
  children,
}: {
  href: string
  eventType: string
  className?: string
  children: React.ReactNode
}) {
  const handleClick = () => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: eventType }),
    })
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}