import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-07-20',
  useCdn: false,
})

export async function getSettings() {
  const settings = await client.fetch(`
    *[_type == "siteSettings"][0]{
      ...,
      activeTheme->
    }
  `)

  if (!settings) return null

  // Если активная тема выбрана — мержим её поверх настроек
  if (settings.activeTheme) {
    return {
      ...settings,
      siteName: settings.activeTheme.siteName || settings.siteName,
      tagline: settings.activeTheme.tagline || settings.tagline,
      heroTitle: settings.activeTheme.heroTitle || settings.heroTitle,
      heroImage: settings.activeTheme.heroImage || settings.heroImage,
      primaryColor: settings.activeTheme.primaryColor || settings.primaryColor,
      accentColor: settings.activeTheme.accentColor || settings.accentColor,
      categories: settings.activeTheme.categories || settings.categories,
      aboutText: settings.activeTheme.aboutText || settings.aboutText,
      deliveryText: settings.activeTheme.deliveryText || settings.deliveryText,
      contactEmail: settings.activeTheme.contactEmail || settings.contactEmail,
      contactPhone: settings.activeTheme.contactPhone || settings.contactPhone,
    }
  }

  return settings
}

export { client }