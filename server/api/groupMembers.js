const router = require('express').Router()
const { models: { GroupMember }} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const groupMembers = await GroupMember.findAll();
    res.json(groupMembers);
  } catch (err) {
    next(err);
  }
});

//POST: add a new GroupMember
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await GroupMember.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const groupMember = await GroupMember.findByPk(req.params.id)
    res.send(await groupMember.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Get read all groupMembers
router.get('/:id', async (req, res, next) => {
  try {
    const groupMember = await GroupMember.findByPk();
    res.json(groupMember);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const groupMember = await GroupMember.findByPk(req.params.id);
    await groupMember.destroy();
    res.send(groupMember);
  } catch (error) {
    next(error);
  }
});
