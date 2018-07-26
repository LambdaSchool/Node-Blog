const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();

server.use(express.json());

//adding middleware
function atGate(req, res, next) {
    console.log(`At the gate, about to be eaten`);
  
    next();
}

server.use(atGate);

function auth(req, res, next) {
    // changing auth depending on the URL or if it applies globally:

    // if (req.url === '/mellon') {
    // if(Math.floor(Date.now()/1000) % 2 === 0) {
    if(Math.floor(Date.now()/1000) % 2 === 0 && req.url === '/mellon') {
      res.status(403).json({ error: 'Balance is the key, making things even is the secret to success' });  
      return;
    } else {
      next();
    }
}

server.get('/mellon', auth, (req, res) => {
    console.log('Gate opening...');
    console.log('Inside and safe');
    res.send('Welcome Traveler!');
});

server.use(cors());
server.use(helmet());
server.use(morgan('short'));

function logger (req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
          'Origin'
        )}`
    );

    next();
}

server.use(logger);

// GET | Returns the stored users / posts / tags

server.get('/', (req, res) => {
    res.send({ hello: 'world', project: "blog" });
});

server.get('/users/', auth, (req, res) => {
    userDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

server.get('/posts/', (req, res) => {
    postDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

server.get('/tags/', (req, res) => {
    tagDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

// GET | Returns the user / post / tag with the specified id

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    // console.log(id);
    userDb.get()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        res.status(200).json(response[id-1])
        //adjusting for 0th index — the same happens in the next gets
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get user.`})
    })
})

server.get('/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb.get()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "Post not found." });
            return;
        }
        res.status(200).json(response[id-1])
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get post.`})
    })
})

server.get('/tags/:id', (req, res) => {
    const id = req.params.id;

    tagDb.get()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "Tag not found." });
            return;
        }
        res.status(200).json(response[id-1])
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get tag.`})
    })
})

// organize next gets in this similar order: user / post / tag

// GET | Unique User's Posts

server.get('/users/:id/posts', (req, res) => {
    const id = req.params.id;

    userDb.getUserPosts(id)
    .then(response => {
        if(response[id-1] === undefined) {
            res.status(404).json({ error: "User ID not found." });
            return;
        } else if (response.length === 0) {
            res.status(404).json({ error: "User posts not found." });
        }
        res.status(200).json(response[id-1])
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get user.`})
    })
})

// GET | Unique Post's Tags

server.get('/posts/:id/tags', (req, res) => {
    const id = req.params.id;

    postDb.getPostTags(id)
    .then(response => {
        if(response[id-1] === undefined) {
            res.status(404).json({ error: "Post ID not found." });
            return;
        } 
        // else if (response.length === 0) {
        //     res.status(404).json({ error: "Post tags not found." });
        // }
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get user.`})
    })
})

server.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || name === '') {
        console.log("Error Code: ", 400, "Bad Response");
        res.status(400).json({ errorMessage: "Please provide a name for the user." });
        return;
    }
    userDb
    .insert(req.body)
    .then(response => {
        console.log(response);
        res.status(201).json({response, name, message: "Successfully created new user."});
    })
    .catch(err => {
        res.status(500).json({err, message: "Couldn't create new user (might be due to duplicate name constraint)."});
    })
})


server.listen(8100, () => console.log('Blog API running on port 8100 . . .'));