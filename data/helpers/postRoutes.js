const express = require('express');
const postDB = require('./postDB.js');
const userDb = require('./userDb.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await postDB.get(req.query);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({message: 'Could not get posts'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postDB.get(req.params.id);
    if (post.length === 0) {
      res.status(404).send({ error: 'The post with the specified ID does not exist.'});
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send({ error: 'The post information could not be retrieved.' });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.userId || !req.body.text) {
      res.status(400).json({message: 'Provide userid and text'});
    } else {
      const { text, userId } = req.body;
      const post = await postsDB.insert(text, userId);
      res.status(201).json(post);
    }
  } catch (err) {
    res.status(500).json({message: 'COuld not create post'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await postDB.get(req.params.id);
    if (post.length === 0) {
      res.status(404).send({ error: 'The post with the specified ID does not exist.' })
    } else {
      await postDb.remove(req.params.id)
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send({ error: 'The post could not be removed.' });
  }
});

router.put('/api/posts/:id', async (req, res) => {
  const { userId, text } = req.body;

  if (!text) {
    res.status(400).send({ error: 'Please provide text for the post.' });
  }

  try {
    const user = await userDb.get(userId);
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.'});
    } 
  } catch (err) {
    res.status(400).send({ error: 'Please provide a user ID for the post.' });
  }

  try {
    let post = await postDb.get(req.params.id);
    if (post.length === 0) {
      res.status(404).send({ error: 'The post with the specified ID does not exist.' })
    } else {
      await postDb.update(req.params.id, req.body);
      post = await postDb.get(req.params.id);
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send({ error: 'The post information could not be modified.' });
  }
});

module.exports = router;