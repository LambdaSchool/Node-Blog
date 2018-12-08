const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nameMiddleware = require('./nameMiddleware');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();

server.use(express.json(), cors(), helmet(), morgan('dev'));

server.post('/api/users', nameMiddleware, (req, res) => {
  const { name } = req.body;
  if (!name) res.status(400).json({ message: 'The user must have a name.' });
  else {
    userDb
      .insert({ name })
      .then(userId => {
        res.status(201).json(userId);
      })
      .catch(err => {
        res.status(500).json({ error: 'User could not be added.' });
      });
  }
});

server.get('/api/users', (req, res) => {
  userDb
    .get()
    .then(users => res.json(users))
    .catch(err => {
      res.status(500).json({ error: 'Users could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'User could not be retrieved.' });
    });
});

server.get('/api/users/:id/posts', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user) {
        userDb.getUserPosts(id).then(posts => {
          if (posts.length) {
            res.json(posts);
          } else {
            res
              .status(404)
              .json({ message: 'The user does not have any posts.' });
          }
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'User posts could not be retrieved.' });
    });
});

server.put('/api/users/:id', nameMiddleware, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  userDb
    .update(id, { name })
    .then(updated => {
      if (updated) {
        userDb.get(id).then(user => {
          res.json(user);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'User could not be updated.' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(deleted => {
      if (deleted) res.json({ message: 'User deleted.' });
      else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'User could not be deleted.' });
    });
});

server.post('/api/posts', (req, res) => {
  const { userId, text } = req.body;
  postDb
    .insert({ userId, text })
    .then(postId => {
      res.json(postId);
    })
    .catch(err => {
      res.status(500).json({ error: 'Posts could not be created.' });
    });
});

server.get('/api/posts', (req, res) => {
  postDb
    .get()
    .then(posts => res.json(posts))
    .catch(err => {
      res.status(500).json({ error: 'Posts could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Posts could not be retrieved.' });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  postDb
    .update(id, { text })
    .then(updated => {
      if (updated) {
        postDb.get(id).then(post => res.json(post));
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Post could not be updated.' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(deleted => {
      if (deleted) res.json({ message: 'Post deleted.' });
      else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Post could not be deleted.' });
    });
});

module.exports = server;
