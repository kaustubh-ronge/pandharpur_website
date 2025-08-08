const temple = {
  name: "temple",
  title: "Temple",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Temple Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Temple Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "topAttraction",
      title: "Top Attraction",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "timing",
      title: "Visiting Hours",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
export default temple;
