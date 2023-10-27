const categorySeeds = require('./category-seeds');
const productSeeds = require('./product-seeds');
const tagSeeds = require('./tag-seeds');
const productTagSeeds = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const addSeeds = async () => {
  await sync({ force: true });
  console.log('Database added!');
  
  await categorySeeds();
  console.log('Categories added!');
  
  await productSeeds();
  console.log('Products added!');

  await tagSeeds();
  console.log('Tags added!');

  await productTagSeeds();
  console.log('Product tags added!');

  process.exit(0);
};

addSeeds();