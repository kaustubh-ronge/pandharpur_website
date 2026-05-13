import { TagIcon } from '@sanity/icons'

const otherAttractionCategory = {
  name: 'otherAttractionCategory',
  title: 'Other Attraction Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
      description: 'e.g., Historical Sites, Gardens & Parks, Unique Spots',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 2,
    },
  ],
};

export default otherAttractionCategory;