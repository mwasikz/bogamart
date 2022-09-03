export default {
    name: 'categories',
    type: 'document',
    title: 'Categories',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Category Name',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'short_description',
            type: 'string',
            title: 'short description',
            validation: (Rule) => Rule.max(200),
        },
        {
            name: 'shops',
            type: 'array',
            title: 'Shops',
            of: [{ type: 'reference', to: [{ type: 'shop' }] }],
        },
    ]
}