const { Tag } = require('../models');

const tagInfo = [
  {
    tag_name: 'blouse',
  },
  {
    tag_name: 'boots',
  },
  {
    tag_name: 'summer',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'silver',
  },
  {
    tag_name: 'jewlery',
  },
  {
    tag_name: 'shorts',
  },
  {
    tag_name: 'hats',
  },
];

const seedTags = () => Tag.bulkCreate(tagInfo);

export default seedTags;