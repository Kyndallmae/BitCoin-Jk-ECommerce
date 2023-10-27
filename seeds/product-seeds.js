const { Product } = require('../models');

const productData = [
  {
    product_name: 'Ghost Band Shirt',
    price: 19.99,
    stock: 20,
    category_id: 1,
  },
  {
    product_name: 'Levi 504 Jeans',
    price: 104.99,
    stock: 17,
    category_id: 2,
  },
  {
    product_name: 'Summer Floral Wrap Dress',
    price: 34.99,
    stock: 10,
    category_id: 3,
  },
  {
    product_name: 'Convers HighTops in Red',
    price: 49.99,
    stock: 8,
    category_id: 4,
  },
  {
    product_name: 'Gold Chain Necklace',
    price: 149.99,
    stock: 5,
    category_id: 5,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

export default seedProducts;