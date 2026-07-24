export const analyticsEvent = {
    name: 'analyticsEvent',
    title: 'Аналитика',
    type: 'document',
    fields: [
      {
        name: 'type',
        title: 'Тип события',
        type: 'string',
        // page_view, add_to_cart, order_placed
      },
      {
        name: 'productName',
        title: 'Товар',
        type: 'string',
      },
      {
        name: 'total',
        title: 'Сумма заказа',
        type: 'number',
      },
      {
        name: 'createdAt',
        title: 'Дата',
        type: 'datetime',
      },
        {
  name: 'source',
  title: 'Izvor saobraćaja',
  type: 'string',
},
    ],
  }
