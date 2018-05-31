const express = require('express');
const cors = require('cors');
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const tagDB = require('./data/helpers/tagDb');

const server = express();


const sendUserError = (status, message, res) => {
 res.status(status).json(message);
}

var port = 5555;

server.use(express.json());
server.use(cors())

server.get('/api/user', (req,res) =>{
  userDB.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.post('/api/user', (req,res) => {
  const { name } = req.body;
  userDB.insert({name})
  .then(users => {
    res.status(201).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})

server.put('/api/user/:id', (req,res) => {
  const { id } = req.params;
  const { name } =  req.body;

  userDB.update(id, {name})
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })
})


server.delete('/api/user/:id', (req,res) => {
  const { id } = req.params;

  userDB.remove(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.get('/api/user/:id/', (req,res) =>{
  const { id } = req.params;

  userDB.get(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})

server.get('/api/user/:id/posts', (req,res) =>{
  const { id } = req.params;

  userDB.getUserPosts(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})



//postDB

server.get('/api/post', (req,res) =>{
  postDB.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.post('/api/post', (req,res) => {
  const { text, userId } = req.body;
  postDB.insert({ text, userId })
  .then(posts => {
    res.status(201).json(posts);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})

server.put('/api/post/:id', (req,res) => {
  const { id } = req.params;
  const { text } = req.body;

  postDB.update(id, { text })
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })
})


server.delete('/api/post/:id', (req,res) => {
  const { id } = req.params;

  postDB.remove(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.get('/api/post/:id/', (req,res) =>{
  const { id } = req.params;

  postDB.get(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})

server.get('/api/post/:id/tags', (req,res) =>{
  const { id } = req.params;

  postDB.getPostTags(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


//tags

server.get('/api/tags', (req,res) =>{
  tagDB.get()
  .then(tags => {
    res.status(200).json(tags);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.post('/api/tags', (req,res) => {
  const { tag } = req.body;
  tagDB.insert({ tag })
  .then(tags => {
    res.status(201).json(tags);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})

server.put('/api/tags/:id', (req,res) => {
  const { id } = req.params;
  const { tag } = req.body;

  tagDB.update(id, { tag })
  .then(tags => {
    res.status(200).json(tags);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })
})


server.delete('/api/tags/:id', (req,res) => {
  const { id } = req.params;

  tagDB.remove(id)
  .then(tags => {
    res.status(200).json(tags);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.get('/api/tags/:id/', (req,res) =>{
  const { id } = req.params;

  tagDB.get(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})





server.listen(port, () => console.log(`server running on port ${port}`))
