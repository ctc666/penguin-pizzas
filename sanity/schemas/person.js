import { MdFace as icon } from 'react-icons/md';

export default {
  // Computer name
  name: 'person',
  // Visible title
  title: 'SliceMasters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'person',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'person',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a bit about them',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
