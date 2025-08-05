const hotel = {
  name: "hotel",
  title: "Hotels",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Hotel Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Hotel Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required().min(10),
    },
    {
      name: "website",
      title: "Website URL",
      type: "url",
      description: "Full URL (e.g., https://hotelabc.com)",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https"] }),
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
    },
  ],
};

export default hotel;
