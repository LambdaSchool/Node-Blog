// Node Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Database Helpers
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();

server.use(express.json(), cors(), morgan('combined'), helmet());

// ===============- SERVER CRUD ENDPOINTS -===============

// #####=- Root Server READ Endpoint -=#####
server.get('/', (request, response) => {
    response.status(200).send(`It's working!`);
})


// #####=- Server Port Address and Listen Method -=#####
port = 9999;
server.listen(port, () => {console.log(`-=-=-=- Node Blog Server Active on Port ${port} -=-=-=-`)});