const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');


router.get('/', (req, res) => {
    db.get()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get(id)
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
})
router.get('/:id/posts', (req, res) => {
    const { id } = req.params;

    db.getUserPosts(id)
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
})

router.post('/', (req, res) => {
    const user = req.body;

    db.insert(user)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = { ...req.body, id};

    db.update(id, updatedUser)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
})

module.exports = router;