const express = require('express');
const postsRoute = express.Router();

const postDb = require('../data/helpers/postDb');
const validate = (req, res, next) => {
  postDb.get(req.body.id)
  .then(response => next())
  .catch(err => next("u20"));
}

postsRoute.get('/', (req, res) => {
  postDb.get()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json({ error: `Could not retrieve posts: ${err}`}));
});

postsRoute.post('/', (req, res) => {
  const { text, userId } = req.body;
  const newPost = { userId, text }
  postDb.get(userId)
  .then(resp => {
    postDb.insert(newPost)
      .then(response => {
        res.status(201).json({
          ...response,
          ...newPost
        })
      })
      .catch(err => res.status(500).json({ error: `Server Error --> ${err}`}));
  })
  .catch(err => res.status(400).json({error: 'User does not exist.'}));
});

postsRoute.delete('/', validate, (req, res) => {
  const { id } = req.body
  postDb.remove(id)
    .then(response => {
      if(response) {
        res.status(200).json({ message: "Post delete success."})
      } else {
        res.status(500).json({ error: "Server error." })
      }
    })
    .catch(err => res.status(500).json({ error: "Delete error." }));
});

postsRoute.put('/',validate, (req, res) => {
  const { text, id } = req.body;
  const updatePost = req.body;
  postDb.update(id, updatePost)
    .then(response => {
      if (response) {
        res.status(200).json({ message: "Update succesful." })
      } else {
        res.status(500).json({ error: "Server error." })
      }
    })
    .catch(err => res.status(500).json({ error: "Put error." }));
  
});

module.exports = postsRoute;