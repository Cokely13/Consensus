// // server/api/invites.js
// const router = require('express').Router();
// const {
//   models: { Invite, User, Group },
// } = require('../db');

// module.exports = router


// router.get('/', async (req, res, next) => {
//   try {
//     const invites= await Invite.findAll( {include : [User, Group]}
//     );
//     res.json(invites);
//   } catch (err) {
//     next(err);
//   }
// });

// //POST: add a new Invite
// router.post("/", async (req, res, next) => {
//   try {
//     res.status(201).send(await Invite.create(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/:id', async (req, res, next) => {
//   try {
//     const invite= await Invite.findByPk(req.params.id)
//     res.send(await invite.update(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

// //Get read all invites
// router.get('/:id', async (req, res, next) => {
//   try {
//     const invite = await Invite.findByPk(req.params.id,{include : [User, Invite]});
//     res.json(invite);
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const invite = await Invite.findByPk(req.params.id);
//     await invite.destroy();
//     res.send(invite);
//   } catch (error) {
//     next(error);
//   }
// });

const router = require('express').Router();
const {
  models: { Invite, User, Group },
} = require('../db');

module.exports = router;

// GET: Get all invites with details of users and groups
router.get('/', async (req, res, next) => {
  try {
    const invites = await Invite.findAll({
      include: [
        { model: User, as: 'inviter', attributes: ['id', 'username'] }, // Inviter details
        { model: User, as: 'invitee', attributes: ['id', 'username'] }, // Invitee details
        { model: Group, attributes: ['id', 'name'] }, // Group details
      ],
    });
    res.json(invites);
  } catch (err) {
    next(err);
  }
});

// POST: Add a new Invite
router.post('/', async (req, res, next) => {
  try {
    const newInvite = await Invite.create(req.body);
    res.status(201).send(newInvite);
  } catch (error) {
    next(error);
  }
});

// PUT: Update an Invite status (accept/reject)
router.put('/:id', async (req, res, next) => {
  try {
    const invite = await Invite.findByPk(req.params.id);
    if (!invite) {
      return res.status(404).send('Invite not found');
    }
    const updatedInvite = await invite.update(req.body);
    res.send(updatedInvite);
  } catch (error) {
    next(error);
  }
});

// GET: Get a specific Invite by ID
router.get('/:id', async (req, res, next) => {
  try {
    const invite = await Invite.findByPk(req.params.id, {
      include: [
        { model: User, as: 'inviter', attributes: ['id', 'username'] },
        { model: User, as: 'invitee', attributes: ['id', 'username'] },
        { model: Group, attributes: ['id', 'name'] },
      ],
    });
    if (!invite) {
      return res.status(404).send('Invite not found');
    }
    res.json(invite);
  } catch (err) {
    next(err);
  }
});

// DELETE: Delete an Invite
router.delete('/:id', async (req, res, next) => {
  try {
    const invite = await Invite.findByPk(req.params.id);
    if (!invite) {
      return res.status(404).send('Invite not found');
    }
    await invite.destroy();
    res.send(invite);
  } catch (error) {
    next(error);
  }
});
