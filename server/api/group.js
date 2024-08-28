const router = require('express').Router()
const { models: { Group }} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

//POST: add a new Group
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Group.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id)
    res.send(await group.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Get read all groups
router.get('/:id', async (req, res, next) => {
  try {
    const group = await Group.findByPk();
    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    await group.destroy();
    res.send(group);
  } catch (error) {
    next(error);
  }
});
