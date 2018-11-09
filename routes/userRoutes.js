// NODE MODULES
// ==============================================
const express = require('express');
const userDb = require('../data/helpers/userDb.js');

// EXPRESS ROUTER
// ==============================================
const router = express.Router();

// CUSTOM MIDDLEWARE
// ==============================================
const capitalizeName = (req, _, next) => {
  if (req.body.name.indexOf(' ') >= 0) {
    req.body.name = req.body.name
      .split(' ')
      .map(name => name.charAt(0).toUpperCase() + name.slice(1, name.length).toLowerCase())
      .join(' ');
    next();
  } else {
    const { name } = req.body;
    req.body.name = name.charAt(0).toUpperCase() + name.slice(1, name.length).toLowerCase();
    next();
  }
};

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'The users could not be retrieved from the database.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userDb.get(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json({ error: 'The user could not be retrieved from the database.' });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await userDb.getUserPosts(req.params.id);
    posts
      ? res.status(200).json(posts)
      : res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json({ error: 'The user could not be retrieved from the database.' });
  }
});

router.post('/', capitalizeName, async (req, res) => {
  if (req.body.name && req.body.name.length < 129) {
    try {
      const addedUser = await userDb.insert(req.body);
      const user = await userDb.get(addedUser.id);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: 'There was an error while saving the user to the database.' });
    }
  } else {
    res.status(400).json({
      errorMessage:
        'Please provide a name (character length must be below 128 characters) for the user.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await userDb.remove(req.params.id);
    count
      ? res.status(200).json({ message: 'Successfully deleted user.' })
      : res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json({ error: 'There was a database error deleting the user.' });
  }
});

router.put('/:id', capitalizeName, async (req, res) => {
  if (req.body.name && req.body.name.length < 129) {
    try {
      const count = await userDb.update(req.params.id, req.body);
      if (count > 0) {
        const user = await userDb.get(req.params.id);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
      }
    } catch (err) {
      res.status(500).json({ error: "The user's name could not be modified." });
    }
  } else {
    res.status(400).json({
      errorMessage:
        'Please provide a name (character length must be below 128 characters) for the user.'
    });
  }
});

module.exports = router;
