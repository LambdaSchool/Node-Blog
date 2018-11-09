// NODE MODULES
// ==============================================
const express = require('express');
const cors = require('cors');
const path = require('path');

// FILE IMPORTS, CONSTANTS
// ==============================================
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const server = express();

// MIDDLEWARE
// ==============================================
server.use(express.json());
server.use(cors());

// ROUTES
// ==============================================
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

// HEROKU SETUP
// ==============================================
server.use(express.static(path.resolve(__dirname, './client/', 'build')));
server.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, './client/', 'build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// START THE SERVER
// ==============================================
server.listen(process.env.PORT || 5000);
