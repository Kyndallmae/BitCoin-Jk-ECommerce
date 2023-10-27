const { ProductTag } = require('../models');

const productTagInfo = [
  {
    product_id: 1,
    tag_id: 1,
  },
  {
    product_id: 2,
    tag_id: 2,
  },
  {
    product_id: 3,
    tag_id: 3,
  },
  {
    product_id: 4,
    tag_id: 4,
  },
  {
    product_id: 5,
    tag_id: 5,
  },
];

const seedProductInfo = () => ProductTag.bulkCreate(productTagInfo);

module.exports = seedProductInfo;