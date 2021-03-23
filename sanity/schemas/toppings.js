import { FaPepperHot as icon } from 'react-icons/fa';
import { RiLeafFill as veg } from 'react-icons/ri';

export default {
  // Computer name
  name: 'topping',
  // Visible title
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegitarian',
      title: 'Vegitarian',
      type: 'boolean',
      description: 'Is the topping vegitarian?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegitarian: 'vegitarian',
    },
    prepare: (fields) => ({
      title: `${fields.name} ${fields.vegitarian ? '(v)' : ''}`,
    }),
  },
};
