const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Finds all the products
router.get('/', async (req, res) => {
  try {
    const productInfo = await Product.findAll({
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: "ProductTag"
        },
      ],
    })
    res.status(200).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Finds one products by Pk
router.get('/:id', async (req, res) => {
  try {
    const productInfo = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: "ProductTag"
        },
      ],
    })
    res.status(200).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // Creates tags in bulk
      if (req.body.tagIds.length) {
        const productBulk = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productBulk);
      }
      // If there are not tags with the id
      res.status(200).json(product);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Updates a product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
    
          const productIds = productIds.map(({ tag_id }) => tag_id);
          const newTags = req.body.tagIds
          .filter((tag_id) => !productIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

          const removeTag = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
          
          return Promise.all([
            ProductTag.destroy({ where: { id: removeTag } }),
            ProductTag.bulkCreate(newTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async(req, res) => {
  try {
    const productInfo = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productInfo) {
      res.status(404).json({ message: 'Could not find product!' });
      return;
    }

    res.status(200).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
