const festival= {
  name: 'festival',
  title: 'Pandharpur Festival',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Festival Name (e.g. "Ashadhi Ekadashi")',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Major Festival', value: 'major'},
          {title: 'Monthly Event', value: 'monthly'},
          {title: 'Daily Ritual', value: 'daily'}
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date/Time',
      type: 'string',
      description: 'e.g. "July 6-8" or "Every Ekadashi"'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'highlights',
      title: 'Key Rituals',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g. ["Palkhi Procession", "Abhishekam"]'
    },
    {
      name: 'schedule',
      title: 'Timings (for major festivals)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'time', type: 'string', title: 'Time (e.g. "5:00 AM")'},
          {name: 'event', type: 'string', title: 'Ritual (e.g. "Kakad Aarti")'}
        ]
      }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'image'
    }
  }
}

export default festival