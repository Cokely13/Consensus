


const router = require('express').Router();
const {
  models: { User, Group, UserResponse, GroupMember, Invite },
} = require('../db');
module.exports = router;

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'username', 'careerHighWinStreak', 'careerHighLossStreak', 'careerHighNoVoteStreak'], // Explicitly select only the id and username fields
//       include: [
//         {
//           model: Group, // Include associated groups
//           through: { model: GroupMember }, // Specify the through table for the association
//           attributes: ['id', 'name'], // Select specific fields for the Group
//         },
//         {
//           model: UserResponse, // Include associated user responses
//           attributes: ['id', 'response', 'questionId'], // Select specific fields for UserResponse
//         },
//       ],
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'careerHighWinStreak', 'careerHighLossStreak', 'careerHighNoVoteStreak', 'admin'],
      include: [
        {
          model: Group,
          through: { model: GroupMember },
          attributes: ['id', 'name'],
        },
        {
          model: UserResponse,
          attributes: ['id', 'response', 'questionId'],
        },
        {
          model: Invite, // Include invites sent to this user
          as: 'invites', // Alias for the invites association
          attributes: ['id', 'status', 'groupId', 'inviterId', 'createdAt'],
          include: [
            { model: Group, attributes: ['id', 'name'] },
            { model: User, as: 'inviter', attributes: ['id', 'username'] },
          ],
        },
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update user fields
    await user.update(req.body);

    // Return the updated user
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

// router.get('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id, {
//       attributes: ['id', 'username', 'careerHighWinStreak', 'careerHighLossStreak', 'careerHighNoVoteStreak'],
//       include: [
//         {
//           model: Group, // Include associated groups
//           through: { model: GroupMember }, // Specify the through table for the association
//           attributes: ['id', 'name'], // Select specific fields for the Group
//         },
//         {
//           model: UserResponse, // Include associated user responses
//           attributes: ['id', 'response', 'questionId'], // Select specific fields for UserResponse
//         },
//       ],
//     });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'careerHighWinStreak', 'careerHighLossStreak', 'careerHighNoVoteStreak', 'admin'],
      include: [
        {
          model: Group,
          through: { model: GroupMember },
          attributes: ['id', 'name'],
        },
        {
          model: UserResponse,
          attributes: ['id', 'response', 'questionId'],
        },
        {
          model: Invite, // Include invites sent to this user
          as: 'invites',
          attributes: ['id', 'status', 'groupId', 'inviterId', 'createdAt'],
          include: [
            { model: Group, attributes: ['id', 'name'] },
            { model: User, as: 'inviter', attributes: ['id', 'username'] },
          ],
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

