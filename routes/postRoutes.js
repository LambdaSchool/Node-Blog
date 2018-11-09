// NODE MODULES
// ==============================================
const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

// EXPRESS ROUTER
// ==============================================
const router = express.Router();

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'The posts could not be retrieved from the database.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postDb.get(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'The post could not be retrieved from the database.' });
  }
});

router.get('/:id/tags', async (req, res) => {
  try {
    const tags = await postDb.getPostTags(req.params.id);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: "The post's could not not be retrieved from the database." });
  }
});

router.post('/', async (req, res) => {
  if (req.body.userId && req.body.text) {
    const user = await userDb.get(req.body.userId);
    if (user) {
      try {
        const addedPost = await postDb.insert(req.body);
        const post = await postDb.get(addedPost.id);
        res.status(201).json({ post });
      } catch (err) {
        res
          .status(500)
          .json({ error: 'There was an error while saving the post to the database.' });
      }
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    }
  } else {
    res.status(400).json({ errorMessage: 'Please provide a userID and text for the post.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await postDb.remove(req.params.id);
    count
      ? res.status(200).json({ message: 'Sucessfully deleted post.' })
      : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json({ error: 'There was an database error deleting the post.' });
  }
});

router.put('/:id', async (req, res) => {
  if (req.body.userId && req.body.text) {
    const user = await userDb.get(req.body.userId);
    if (user) {
      try {
        const count = await postDb.update(req.params.id, req.body);
        if (count > 0) {
          const post = await postDb.get(req.params.id);
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      } catch (err) {
        res.status(500).json({ error: 'There was an database error updating the post.' });
      }
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    }
  } else {
    res.status(400).json({ errorMessage: 'Please provide a userId and text for the post.' });
  }
});

module.exports = router;
