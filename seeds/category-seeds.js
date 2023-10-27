const { Category } = require('../models');

const categorySeeds = [
  {
    category_name: 'Tops',
  },
  {
    category_name: 'Bottoms',
  },
  {
    category_name: 'Dresses',
  },
  {
    category_name: 'Shoes',
  },
  {
    category_name: 'Accessories',
  },
];

const seedCategories = () => Category.bulkCreate(categorySeeds);

export default seedCategories;