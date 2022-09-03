export default {
  name: 'deals',
  title: 'Featured Deals',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Deal name',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'image',
      type: 'image',
      title: 'Image of category',
    },
  ],
}
