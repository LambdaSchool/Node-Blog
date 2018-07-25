const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Blog Application');
})
// Users
server.get('/api/users', (req, res) => {
    userDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }))
})
server.get('/api/user/:id', (req, res) => {
    userDb.get(Number(req.params.id))
        .then (response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The users information could not be retrieved." }))
})
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: "Please provide a name for the user." })
    }
    userDb.insert({ name })
        .then(response => res.status(201).json({ name }))
        .catch(err => res.status(500).json({ error: "There was an error while saving the user to the database" }))
})
server.delete('/api/user/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "The user has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The user could not be removed" }))
})

// Posts
server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})
server.get('/api/post/:id', (req, res) => {
    postDb.get(Number(req.params.id))
        .then (response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})
server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    if (!text || !userId) {
        res.status(400).json({ errorMessage: "Please provide text and userId for the post." })
    }
    postDb.insert({ text, userId })
        .then(response => res.status(201).json({ text, userId }))
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database." }))
})
server.delete('/api/post/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "The post has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

// Tags
server.get('/api/tags', (req, res) => {
    tagDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The tags information could not be retrieved." }))
})
server.get('/api/tag/:id', (req, res) => {
    tagDb.get(Number(req.params.id))
        .then (response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The tags information could not be retrieved." }))
})
server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if (!tag) {
        res.status(400).json({ errorMessage: "Please provide tag for the post." })
    }
    tagDb.insert({ tag })
        .then(response => res.status(201).json({ tag }))
        .catch(err => res.status(500).json({ error: "There was an error while saving the tag to the database." }))
})
server.delete('/api/tag/:id', (req, res) => {
    tagDb.remove(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "The tag has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The tag could not be removed" }))
})

server.listen(8000, () => console.log('API is running on port 8000'))