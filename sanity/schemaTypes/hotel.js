

const hotel = {
  name: "hotel",
  title: "Hotels",
  type: "document",
  icon: () => '🏨',
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
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subscriptionPlan",
      title: "Subscription Plan 🌟",
      type: "string",
      options: {
        list: [
          { title: "Premium", value: "premium" },
          { title: "Standard", value: "standard" },
          { title: "Basic", value: "basic" },
          { title: "None / Free", value: "none" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "none",
      description:
        "Select the subscription tier. Premium listings will appear first on the main hotels page.",
    },
    {
      name: "image",
      title: "Main Hotel Image",
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
      title: "Detailed Description (for single page view)",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required().min(10),
    },
    
    // +++ UPDATED PHONE NUMBER FIELDS +++
    {
      name: "whatsappNumber",
      title: "WhatsApp Phone Number",
      type: "string",
      description: "Enter a single WhatsApp number (e.g., 919876543210). This number will be used for the 'Book Now' button.",
      validation: (Rule) => Rule.regex(/^91[0-9]{10}$/, {
        name: "phone-number",
        invert: false,
      }).error("Number must be 12 digits and start with 91."),
    },
    {
      name: "contactNumbers",
      title: "Other Contact Numbers",
      description: "Add multiple contact numbers for general inquiries.",
      type: "array",
      of: [{ type: "string" }],
    },
    // +++ END OF CHANGE +++

    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "website",
      title: "Website URL (for 'Book Now' button)",
      type: "url",
      description:
        "If you leave this empty, the 'Book Now' button will not appear.",
    },
    {
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description:
        "Go to Google Maps, find the hotel, click Share > Embed a map, and copy ONLY the URL from the src attribute of the iframe code.",
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
      name: "priceRange",
      title: "Price Range (e.g., ₹800 - ₹2500)",
      type: "string",
    },
    {
      name: "rating",
      title: "Star Rating (1-5)",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
    },
    {
      name: "facilities",
      title: "Facilities & Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "roomTypes",
      title: "Room Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "typeName",
              title: "Type Name (e.g., AC Deluxe)",
              type: "string",
            },
            { name: "price", title: "Price per night", type: "number" },
            {
              name: "amenities",
              title: "Room Amenities",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            },
          ],
        },
      ],
    },
    {
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
};

export default hotel;