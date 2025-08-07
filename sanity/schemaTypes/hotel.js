// const hotel = {
//   name: "hotel",
//   title: "Hotels",
//   type: "document",
//   fields: [
//     {
//       name: "name",
//       title: "Hotel Name",
//       type: "string",
//       validation: (Rule) => Rule.required().min(3).max(100),
//     },
//     {
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: {
//         source: "name",
//         maxLength: 96,
//       },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "image",
//       title: "Hotel Image",
//       type: "image",
//       options: {
//         hotspot: true,
//       },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "address",
//       title: "Address",
//       type: "string",
//       validation: (Rule) => Rule.required().min(10),
//     },
//     {
//       name: "website",
//       title: "Website URL",
//       type: "url",
//       description: "Full URL (e.g., https://hotelabc.com)",
//       validation: (Rule) =>
//         Rule.required().uri({ scheme: ["http", "https"] }),
//     },
//     {
//       name: "description",
//       title: "Short Description",
//       type: "text",
//       rows: 3,
//       validation: (Rule) => Rule.required().min(10).max(300),
//     },
//   ],
// };

// export default hotel;


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

    // ✅ Additional Optional Fields
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "locationMapUrl",
      title: "Google Maps Link",
      type: "url",
    },
    {
      name: "priceRange",
      title: "Price Range",
      type: "string",
    },
    {
      name: "facilities",
      title: "Facilities",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Budget", value: "budget" },
          { title: "Deluxe", value: "deluxe" },
          { title: "Dharmashala", value: "dharmashala" },
          { title: "Lodge", value: "lodge" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "rating",
      title: "Rating (Static)",
      type: "number",
    },
  ],
};

export default hotel;
