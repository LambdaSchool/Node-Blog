const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();

server.use(cors());
server.use(express.json());

const port = 9000;

//Middlewares
server.use(morgan('combined'));

//User Database Routes
server.get('/', (req, res)=> {
    res.send('Welcome to Node Blog :)')
});

server.get('/api/users', (req, res)=> {
    userDb.get()
        .then(users=> {
            console.log(users);
            res.status(200).json({users});
        })
        .catch(err=> {
            res.status(500).json({error: "Information could not be retrieved"});
        })
});

server.get('/api/users/:id', (req, res)=> {
    console.log(req.params.id);
    userDb.get(req.params.id)
        .then(user=> {
            console.log(user);
            res.status(200).json({user});
        })
        .catch(err=> {
            res.status(500).json({error: "Information could not be retrieved."});
        })
});

server.post('/api/users', (req, res)=> {
    console.log(req.body);
    const {name} = req.body;
    const newUser = {name};
    userDb.insert(newUser)
        .then(userId=> {
            const {id} = userId;
            userDb.get(id)
                .then(user=> {
                    if (!req.body.name) {
                        res.status(404).json({error: "User not found"});
                    }
                    res.status(201).json({user});
                })
        })
        .catch(err=> {
            res.status(500).json({error: "This user could not be added to the database"});
        })
});

server.delete('/api/users/:id', (req, res)=> {
    console.log(req.params);
    const {id} = req.params;
    userDb.remove(id)
        .then(user=> {
            if (!user) {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
            res.status(200).json({user});
        })
        .catch(err=> {
            res.status(500).json({error: "The user could not be removed"});
        })
});

server.put('/api/users/:id', (req, res)=> {
    console.log(req.params, req.body);
    const {id} = req.params;
    const {name} = req.body;
    const updatedUser = {name};
    userDb.update(id, updatedUser)
        .then(updatedUser=> {
            if (!updatedUser) {
                res.status(404).json({error: "This user does not exist"});
            } else if (!req.body) {
                res.status(400).json({error: "Please add a name for this user"});
            } else {
                res.status(200).json({updatedUser});
            }
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be saved to the database"});
        })
});

//Posts Routes

//GET all posts
server.get('/api/posts', (req, res)=> {
    postDb.get()
        .then(posts=> {
            res.status(200).json({posts});
        })
        .catch(err=> {
            res.status(500).json({error: "Information could not be retrieved"});
        })
});

//GET a specific post by its id
server.get('/api/posts/:id', (req, res)=> {
    postDb.get(req.params.id)
        .then(post=> {
            console.log(post);
            res.status(200).json({post});
        })
        .catch(err=> {
            res.status(500).json({error: "This post could not be retrieved"});
        })
});

//POST a new post
server.post('/api/posts', (req, res)=> {
    console.log(req.body);
    const {text, userId} = req.body;
    const newPost = {text, userId};
    postDb.insert(newPost)
        .then(newPost=> {
            if (!req.body) {
                res.status(400).json({error: "Please add text to this post"});
            }
            res.status(201).json({newPost});
        })
        .catch(err=> {
            res.status(500).json({error: "This post could not be added to the database"});
        })
});

//UPDATE an existing post


//Listener
server.listen(port, ()=> console.log(`API running on port ${port}`));