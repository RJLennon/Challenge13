const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [Product,{
        model: Product,
        through: ProductTag
      }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {id: req.params.id},
      include: [Product,{
        model: Product,
        through: ProductTag
      }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//update a tag
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {id: req.params.id}
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
