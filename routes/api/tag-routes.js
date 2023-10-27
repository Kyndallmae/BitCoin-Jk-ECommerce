const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async(req, res) => {
  try {
    const tagInfo = await Tag.findAll({
      attributes: ["id", "tag_name"],
      includes: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: "ProductTag",
        },
      ],
    })
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      includes: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: "ProductTag",
        },
      ],
    })
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const tagData = await Tag.update(req.body.tag_name, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const tagInfo = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'Could not find the Tag!' });
      return;
    }

    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;