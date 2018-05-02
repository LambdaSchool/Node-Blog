const express = require("express");
const db = require('../data/helpers/postDb');
const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});

router.get('/:id', (req, res) => {
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({  message: 'The post with the specified ID does not exist.'})
        } else {
            res.json(posts[0]);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});

router.post('/', (req, res) => {
    const {text} = req.body;
    const newPost = {text};
        if (req.body.length === 0) {
            res.status(404).json({ message: "The post with the specified userID does not exist."})
        } else 
        db
        .insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error saving the post to the database."})
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else
    db.remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    .catch(err => {
        res.status(500).json({ error: "Post could not be removed."})
    });
});

router.put('/:id', (req, res) => {
    const {text} = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if (req.body.length === 0) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    .catch(err => {
        res.status(500).json({  error: "The post information could not be modified." })
    })
})


module.exports = router;