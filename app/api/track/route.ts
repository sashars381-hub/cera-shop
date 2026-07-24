import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { type, productName, total, source } = body

  await client.create({
    _type: 'analyticsEvent',
    type,
    productName: productName || null,
    total: total || null,
    source: source || null,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ success: true })
}
