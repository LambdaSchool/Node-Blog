const express = require("express");
const db = require('../data/helpers/tagDb');
const router = express.Router();

router.get('/', (req, res) => {
    db
  
    .get()
    .then(posts => {
        // console.log(res)
        // console.log(posts[1].tag.toUpperCase())
        res.status(200).json(posts.map(post => {
            return {
                ...post, tag: post.tag.toUpperCase()
            }
        }));
        })
    .catch(err => {
        res.status(500).json({ error: 'The tags information could not be retrieved.'})
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({  message: 'The tag with the specified ID does not exist.'})
        } else {
            res.json({...posts, tag: posts.tag.toUpperCase()});
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The tag information could not be retrieved.'})
    });
});

router.post('/', (req, res) => {
    const { tag } = req.body;
    const newTag = { tag };
        if (tag.length === 0 || tag.length > 80) {
            res.status(404).json({ message: "The tag does not exist or you had 81 characters or more."})
        } else 
        db
        .insert(newTag)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error saving the tag to the database."})
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "The tag with the specified ID does not exist." })
    } else
    db
    .remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    .catch(err => {
        res.status(500).json({ error: "The tag could not be removed."})
    });
});

router.put('/:id', (req, res) => {
    const {tag} = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if (tag.length === 0 || tag.length > 80) {
        res.status(400).json({ errorMessage: "Please provide a tag for the post and ensure its under our character limit of 80." })
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    .catch(err => {
        res.status(500).json({  error: "The tag information could not be modified." })
    });
});

module.exports = router;