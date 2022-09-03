export default {
  name: "shop",
  title: "Shop",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Shop name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Shop",
    },
    {
      name: "products",
      type: "array",
      title: "Products",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    },
  ],
};