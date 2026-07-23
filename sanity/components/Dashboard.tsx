import { useEffect, useState } from 'react'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
})

export default function Dashboard() {
  const [stats, setStats] = useState({
    pageViews: 0,
    productViews: 0,
    addToCart: 0,
    orders: 0,
    revenue: 0,
    phoneClicks: 0,
    emailClicks: 0,
    whatsappClicks: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const events = await client.fetch(`*[_type == "analyticsEvent"]`)

      const pageViews = events.filter((e: any) => e.type === 'page_view')
      const productViews = events.filter((e: any) => e.type === 'product_view')
      const addToCart = events.filter((e: any) => e.type === 'add_to_cart')
      const orders = events.filter((e: any) => e.type === 'order_placed')
      const phoneClicks = events.filter((e: any) => e.type === 'contact_phone_click')
      const emailClicks = events.filter((e: any) => e.type === 'contact_email_click')
      const whatsappClicks = events.filter((e: any) => e.type === 'whatsapp_click')
      const revenue = orders.reduce((sum: number, e: any) => sum + (e.total || 0), 0)

      setStats({
        pageViews: pageViews.length,
        productViews: productViews.length,
        addToCart: addToCart.length,
        orders: orders.length,
        revenue,
        phoneClicks: phoneClicks.length,
        emailClicks: emailClicks.length,
        whatsappClicks: whatsappClicks.length,
      })

      setRecentOrders(orders.slice(-5).reverse())
      setLoading(false)
    }

    fetchStats()
  }, [])

  const cardStyle = {
    backgroundColor: '#FAF8F5',
    border: '1px solid #E8E0D5',
    borderRadius: '4px',
    padding: '20px',
    flex: 1,
    minWidth: '140px',
  }

  const labelStyle = {
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#8A7F74',
    marginBottom: '8px',
  }

  const valueStyle = {
    fontSize: '32px',
    fontWeight: 300,
    color: '#1a1a1a',
    fontFamily: 'Georgia, serif',
  }

  const sectionTitleStyle = {
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#8A7F74',
    marginBottom: '16px',
    marginTop: '40px',
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#8A7F74' }}>
        Загрузка...
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px' }}>

      {/* Заголовок */}
      <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 300, fontSize: '32px', marginBottom: '8px' }}>
        Аналитика
      </h1>
      <p style={{ color: '#8A7F74', fontSize: '13px', marginBottom: '20px' }}>
        Статистика магазина в реальном времени
      </p>

      {/* Воронка продаж */}
      <p style={sectionTitleStyle}>Воронка продаж</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={cardStyle}>
          <p style={labelStyle}>Заходы на сайт</p>
          <p style={valueStyle}>{stats.pageViews}</p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Просмотры товара</p>
          <p style={valueStyle}>{stats.productViews}</p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>В корзину</p>
          <p style={valueStyle}>{stats.addToCart}</p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Заказы</p>
          <p style={valueStyle}>{stats.orders}</p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Выручка</p>
          <p style={valueStyle}>{stats.revenue.toLocaleString()} RSD</p>
        </div>
      </div>

      {/* Конверсии */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <p style={labelStyle}>Сайт → Товар</p>
          <p style={valueStyle}>
            {stats.pageViews > 0 ? Math.round((stats.productViews / stats.pageViews) * 100) : 0}%
          </p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Товар → Корзина</p>
          <p style={valueStyle}>
            {stats.productViews > 0 ? Math.round((stats.addToCart / stats.productViews) * 100) : 0}%
          </p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Корзина → Заказ</p>
          <p style={valueStyle}>
            {stats.addToCart > 0 ? Math.round((stats.orders / stats.addToCart) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Контакты */}
      <p style={sectionTitleStyle}>Клики по контактам</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <p style={labelStyle}>Телефон</p>
          <p style={valueStyle}>{stats.phoneClicks}</p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Email</p>
          <p style={valueStyle}>{stats.emailClicks}</p>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>WhatsApp</p>
          <p style={valueStyle}>{stats.whatsappClicks}</p>
        </div>
      </div>

      {/* Последние заказы */}
      <p style={sectionTitleStyle}>Последние заказы</p>
      <div style={{ border: '1px solid #E8E0D5', borderRadius: '4px', overflow: 'hidden' }}>
        {recentOrders.length === 0 ? (
          <div style={{ padding: '24px', color: '#8A7F74', fontSize: '13px' }}>
            Заказов пока нет
          </div>
        ) : (
          recentOrders.map((order, i) => (
            <div
              key={i}
              style={{
                padding: '16px 24px',
                borderBottom: i < recentOrders.length - 1 ? '1px solid #E8E0D5' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '13px', color: '#8A7F74' }}>
                {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                {order.total?.toLocaleString()} RSD
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}