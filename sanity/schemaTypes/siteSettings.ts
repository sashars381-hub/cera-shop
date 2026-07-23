export const siteSettings = {
    name: 'siteSettings',
    title: 'Настройки сайта',
    type: 'document',
    fields: [
      {
        name: 'siteName',
        title: 'Название магазина',
        type: 'string',
      },
      {
        name: 'tagline',
        title: 'Подзаголовок на главной',
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
        title: 'Основной цвет сайта',
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
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Название категории',
                type: 'string',
              },
              {
                name: 'image',
                title: 'Фото категории',
                type: 'image',
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
        name: 'fbPixelId',
        title: 'Facebook Pixel ID',
        type: 'string',
      },
      {
        name: 'googleAnalyticsId',
        title: 'Google Analytics ID',
        type: 'string',
      },
      {
        name: 'customHeadCode',
        title: 'Дополнительный код в <head>',
        description: 'Любые скрипты — TikTok Pixel, Яндекс.Метрика и т.д.',
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
      {
        name: 'instagramUrl',
        title: 'Instagram ссылка',
        type: 'string',
      },
      {
        name: 'aboutText',
        title: 'Текст на странице О нас',
        type: 'text',
      },
      {
        name: 'deliveryText',
        title: 'Текст про доставку',
        type: 'text',
      },
      {
        name: 'activeTheme',
        title: 'Активная тема',
        type: 'reference',
        to: [{ type: 'theme' }],
      },
      {
        name: 'contactsImage',
        title: 'Фото на странице Контакты',
        type: 'image',
      },
      {
        name: 'thankYouPixelCode',
        title: 'FB Pixel код для страницы Thank You (конверсия)',
        description: 'Вставьте сюда код события Purchase/Lead для отслеживания конверсий',
        type: 'text',
      },
    ],
  }