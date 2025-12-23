
export default {
  name: 'ownerContact',
  title: 'Owner Contact',
  type: 'document',
  fields: [
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Phone Number',
      type: 'string',
      description: "Enter the owner's WhatsApp number to receive 'Join Us' inquiries.",
      validation: (Rule) =>
        Rule.required().regex(/^91[0-9]{10}$/, {
          name: 'phone-number',
          invert: false,
        }).error('Number must be 12 digits and start with 91.'),
    },
  ],
  icon: () => '📱',
};
