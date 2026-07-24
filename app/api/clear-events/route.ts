import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST() {
  const events = await client.fetch(`*[_type == "analyticsEvent"]{_id}`)

  const ids = events.map((e: any) => e._id)

  if (ids.length === 0) {
    return NextResponse.json({ deleted: 0 })
  }

  const transaction = client.transaction()
  ids.forEach((id: string) => transaction.delete(id))
  await transaction.commit()

  return NextResponse.json({ deleted: ids.length })
}
