export const theme = {
    name: 'theme',
    title: 'Темы сайта',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Название темы',
        type: 'string',
      },
      {
        name: 'siteName',
        title: 'Название магазина',
        type: 'string',
      },
      {
        name: 'tagline',
        title: 'Подзаголовок',
        type: 'string',
      },
      {
        name: 'heroTitle',
        title: 'Заголовок Hero',
        type: 'string',
      },
      {
        name: 'heroImage',
        title: 'Фото на Hero',
        type: 'image',
      },
      {
        name: 'primaryColor',
        title: 'Основной цвет фона',
        description: 'Например: #FAF8F5',
        type: 'string',
      },
      {
        name: 'accentColor',
        title: 'Акцентный цвет',
        description: 'Например: #C9B99A',
        type: 'string',
      },
      {
        name: 'categories',
        title: 'Категории товаров',
        type: 'array',
        options: {
          sortable: true,
        },
        of: [
          {
            type: 'object',
            name: 'category',
            fields: [
              {
                name: 'title',
                title: 'Название категории',
                type: 'string',
                readOnly: false,
              },
              {
                name: 'image',
                title: 'Фото категории',
                type: 'image',
                readOnly: false,
                options: {
                  hotspot: true,
                },
              },
            ],
            preview: {
              select: {
                title: 'title',
                media: 'image',
              },
            },
          },
        ],
      },
      {
        name: 'aboutText',
        title: 'Текст О нас',
        type: 'text',
      },
      {
        name: 'deliveryText',
        title: 'Текст про доставку',
        type: 'text',
      },
      {
        name: 'contactEmail',
        title: 'Email для заказов',
        type: 'string',
      },
      {
        name: 'contactPhone',
        title: 'Телефон',
        type: 'string',
      },
    ],
  }