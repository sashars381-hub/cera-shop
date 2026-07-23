import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, email, address, cart, total } = body

  const cartItems = cart.map((item: any) =>
    `${item.name} — ${item.quantity} шт. — ${item.price * item.quantity} ₽`
  ).join('\n')

  try {
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
    return NextResponse.json({ success: false }, { status: 500 })
  }
}