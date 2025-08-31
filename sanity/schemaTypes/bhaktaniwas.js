const bhaktaniwas = {
  name: "bhaktaniwas",
  title: "Bhaktaniwas",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Bhaktaniwas Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Featured Bhaktaniwas',
      type: 'boolean',
      description: 'Set this to ON to feature this on the main page or at the top of lists.',
      initialValue: false,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'managedBy',
      title: 'Managed By',
      type: 'string',
      description: 'e.g., Vitthal-Rukmini Mandir Samiti, Gajanan Maharaj Trust, etc.',
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description (for list view)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
    },
    {
      name: "detailedDescription",
      title: "Detailed Description (for detail page view)",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phoneNumber",
      title: "Contact Phone Number",
      type: "string",
    },
    {
      name: "website",
      title: "Official Website or Booking Link",
      type: "url",
    },
    {
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "Get the embed URL from Google Maps (Share > Embed a map).",
    },
    {
        name: 'bookingType',
        title: 'Booking Type',
        type: 'string',
        options: {
            list: [
                {title: 'Online Booking Available', value: 'online'},
                {title: 'Offline / On-site Booking Only', value: 'offline'},
                {title: 'First-Come, First-Served', value: 'walk-in'},
            ],
            layout: 'radio'
        }
    },
    {
        name: 'capacity',
        title: 'Approximate Capacity',
        type: 'string',
        description: 'e.g., 500 rooms, 2000 devotees'
    },
    {
      name: "facilities",
      title: "Facilities Available",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: 'tags' },
       description: 'e.g., Hot Water, Filtered Water, Parking, Canteen, etc.',
    },
    {
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
   icon: () => '🏠',
};

export default bhaktaniwas;