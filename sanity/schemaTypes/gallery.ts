export const gallery = {
  name: 'gallery',
  title: 'Galerija kupaca',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Fotografije',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    },
  ],
}
