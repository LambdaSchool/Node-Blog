const express = require('express');
const cors = require('cors');
//const db = require('./data/dbConfig.js');

const port = 5555;
const server = express();
server.use(express.json());
//server.use(cors({ orign: 'https://localhost:3000' }));


//database helpers

const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

server.get('/api/users');
server.get('/api/posts');
server.get('/api/tags');

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    //return;
};

server.get('/api/users', (req, res) => {
    users.get()
    .then(getUsers => {
        res.json(getUsers) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
    .get(id)
    .then(users=> {
        if (users.length === 0) {
            sendUserError(404, 'The post with the specified ID does not exist.', res);
            return;
        }
        res.json(users); 
    })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
    });
});


server.get('/api/tags', (req, res) => {
    tags.get()
    .then(tags => {
        res.json(tags) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags.get(id)
    .then(tag => {
        if (tag.length === 0) {
            sendUserError(404, 'The post with the specified ID does not exist.', res);
            return;
        }
        res.json(tag); 
    })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
    });
});


server.get('/api/posts', (req, res) => {
    posts.get()
    .then(posts => {
        res.json(posts) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts.get(id)
    .then(post => {
        if (post.length === 0) {
            sendUserError(404, 'The post with the specified ID does not exist.', res);
            return;
        }
        res.json(post); 
    })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
    });
});


server.listen(port, () => console.log(`Server running on port ${port}`));