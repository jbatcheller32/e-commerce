const router = require('express').Router();
const { Category, Product } = require('../../models');


// This is to find all products in all categories
router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// this route will get products by their id
router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No product found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});


// this route is for creating a new category
router.post('/', async (req, res) => {

  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});


// this is to update a category based on its id value
router.put('/:id', async (req, res) => {

  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});


// this will delete a category by its id value
router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy(req.body, {
      where: {
        id: req.params.id,
      },

    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
