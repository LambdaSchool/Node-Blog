const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')
// ES 6 version
// import express, { json } from 'express';
// import userRouter from './users/userRouter';

const server = express();

server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});