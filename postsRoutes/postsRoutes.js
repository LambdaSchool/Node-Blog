// POSTS ROUTE HANDLERS
const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');

router.route('/')
  .post((req, res) => {
    const { userId, text } = req.body;
    const newPost = { userId, text };
    if (!userId) return res.status(400).json({ errorMessage: "Please provide a user id." });
    if (!text) return res.status(400).json({ errorMessage: "Please provide some text." });
    userDb.get(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
        else {
          postDb.insert(newPost)
            .then(newPost => res.status(201).json(newPost))
            .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
        }
      })
      .catch(err => res.status(500).json({ error: "There was an error while finding the user in the database" }));
    
  })
  .get((req, res) => {
    postDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The request for posts could not be retrieved." }));
  })

router.route('/:id')
  .put((req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    const editedPost = { userId, text };
    postDb.update(id, editedPost)
      .then(updatedPost => {
        if (!updatedPost) return res.status(404).json({ message: "The post with the specified ID does not exist." });
        if (!userId) return res.status(400).json({ errorMessage: "Please provide a userId for the user." });
        return res.status(200).json(updatedPost);
      })
      .catch(err => res.status(500).json({ error: "The post information could not be modified." }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    postDb.remove(id)
      .then(removedPost => {
        if (!removedPost) return res.status(404).json({ message: "The post with the specified ID does not exist." });
        return res.status(202).json(removedPost);
      })
      .catch(err => res.status(500).json({ error: "The post could not be removed." }));
  })

  module.exports = router;
  