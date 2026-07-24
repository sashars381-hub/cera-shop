export const order = {
  name: 'order',
  title: 'Zakazi',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Ime kupca',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Adresa dostave',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Proizvodi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Naziv', type: 'string' },
            { name: 'quantity', title: 'Količina', type: 'number' },
            { name: 'price', title: 'Cena po komadu', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'total',
      title: 'Ukupno (RSD)',
      type: 'number',
    },
    {
      name: 'createdAt',
      title: 'Datum',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Nova', 'U obradi', 'Poslato', 'Završeno'],
      },
      initialValue: 'Nova',
    },
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'total',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title,
        subtitle: subtitle ? `${subtitle} RSD` : '',
      }
    },
  },
}
