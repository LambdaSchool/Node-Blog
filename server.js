const express = require('express');

const server = express();
const port = 9001;

const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

server.use(express.json());
server.use(toUpperCase);

function toUpperCase(req, res, next) {
    if (req.body.name) {
       let name = req.body.name.substring(1)
       req.body.name = req.body.name[0].toUpperCase() + name
    }
    next();
}

server.get('/api/users', (req, res) => {
    users.get()
         .then(user => {
             res.json(user)
         })
         .catch(err => {
             res.json(500).json({ message: 'error users not found'})
         })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.get(id)
         .then(user => {
             res.status(200).json(user)
         })
         .catch(err => {
             res.status(500).json({ message: 'error no ID matched'})
         })
})

server.post('/api/users', toUpperCase, (req, res) => {
    const { name } = req.body;
    users.insert({ name })
         .then(user => {
             res.status(200).json(user)
         })
         .catch(err => {
             res.status(500).json({ message: 'error unable to create new user'})
         })
})

server.put('/api/users/:id', toUpperCase, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    users.update(id, changes)
    .then(count => {
        if(count) {
            res.status(200).json({ message: `${count} user updated`});
        } else {
            res.status(404).json({ message: 'user not found'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'error updating the user'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: 'error no user found'})
        })
})


server.listen(port, () => console.log(`Server listen to port ${port}`))