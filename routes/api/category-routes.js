const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {id: req.params.id},
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//update a category
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {id: req.params.id}
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//delete a category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
