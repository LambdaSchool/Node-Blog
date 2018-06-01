const users = require('express').Router();

// Middleware
const middleware = require('./helpers');

// Requests
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getAllUsers = require('./getAllUsers');
const getPostsByUser = require('./getPostsByUser');
const getSingleUser = require('./getSingleUser');
const updateUser = require('./updateUser');

users.use(require('express').json());

// Routes
users.post('/', middleware.validateRequestData, createUser);
users.get('/', getAllUsers);
users.get('/:id', getSingleUser);
users.put('/:id', middleware.validateRequestData, updateUser);
users.delete('/:id', deleteUser);

module.exports = users;