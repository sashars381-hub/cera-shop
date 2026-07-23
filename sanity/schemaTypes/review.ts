export const review = {
    name: 'review',
    title: 'Отзывы',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Имя покупателя',
        type: 'string',
      },
      {
        name: 'city',
        title: 'Город',
        type: 'string',
      },
      {
        name: 'text',
        title: 'Текст отзыва',
        type: 'text',
      },
      {
        name: 'rating',
        title: 'Оценка',
        type: 'number',
        options: {
          list: [1, 2, 3, 4, 5],
        },
      },
      {
        name: 'productName',
        title: 'Купила свечу',
        type: 'string',
      },
    ],
  }