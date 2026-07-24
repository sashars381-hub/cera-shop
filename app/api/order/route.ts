import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const resend = new Resend(process.env.RESEND_API_KEY)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, email, address, cart, total } = body

  const cartItems = cart.map((item: any) =>
    `${item.name} — ${item.quantity} шт. — ${item.price * item.quantity} ₽`
  ).join('\n')

  try {
    // Сохраняем заказ в Sanity
    await client.create({
      _type: 'order',
      customerName: name,
      phone,
      email,
      address,
      items: cart.map((item: any) => ({
        _key: Math.random().toString(36).slice(2),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      createdAt: new Date().toISOString(),
      status: 'Nova',
    })

    // Отправляем письмо
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.MY_EMAIL!,
      subject: `Новый заказ от ${name}`,
      text: `
Новый заказ!
Имя: ${name}
Телефон: ${phone}
Email: ${email}
Адрес доставки: ${address}
Состав заказа:
${cartItems}
Итого: ${total} ₽
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
