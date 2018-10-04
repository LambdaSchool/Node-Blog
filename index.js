// IMPORTS
const express = require('express');
const usersRoutes = require('./usersRoutes/usersRoutes.js');
const postsRoutes = require('./postsRoutes/postsRoutes.js');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// ROUTE HANDLERS
server.use('/users', usersRoutes);
server.use('/posts', postsRoutes);

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))
