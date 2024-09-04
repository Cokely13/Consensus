


const router = require('express').Router();
const {
  models: { User, Group, UserResponse, GroupMember },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'], // Explicitly select only the id and username fields
      include: [
        {
          model: Group, // Include associated groups
          through: { model: GroupMember }, // Specify the through table for the association
          attributes: ['id', 'name'], // Select specific fields for the Group
        },
        {
          model: UserResponse, // Include associated user responses
          attributes: ['id', 'response', 'questionId'], // Select specific fields for UserResponse
        },
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username'],
      include: [
        {
          model: Group, // Include associated groups
          through: { model: GroupMember }, // Specify the through table for the association
          attributes: ['id', 'name'], // Select specific fields for the Group
        },
        {
          model: UserResponse, // Include associated user responses
          attributes: ['id', 'response', 'questionId'], // Select specific fields for UserResponse
        },
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

