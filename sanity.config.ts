import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import Dashboard from './sanity/components/Dashboard'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Меню')
          .items([
            S.listItem()
              .title('📊 Аналитика')
              .child(
                S.component(Dashboard).title('Аналитика')
              ),
            S.divider(),
            S.listItem()
              .title('🛒 Zakazi')
              .child(S.documentTypeList('order').title('Zakazi').defaultOrdering([{ field: 'createdAt', direction: 'desc' }])),
            S.listItem()
              .title('🕯 Товары')
              .child(S.documentTypeList('product').title('Товары')),
            S.listItem()
              .title('⭐ Отзывы')
              .child(S.documentTypeList('review').title('Отзывы')),
            S.listItem()
              .title('⚙️ Настройки сайта')
              .child(S.documentTypeList('siteSettings').title('Настройки')),
            S.listItem()
              .title('📈 События')
              .child(S.documentTypeList('analyticsEvent').title('События')),
            S.listItem()
              .title('🎨 Темы')
              .child(S.documentTypeList('theme').title('Темы')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
