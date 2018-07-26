const codes = require("./status-codes/statusCodes");
const express = require("express");
const userRoutes = require("./api/userRoutes");
const server = express();
server.use(express.json());
server.use("/api/users", userRoutes);

server.use((err, req, res, next) => {
  const errorInfo = {
    ...err,
    success: false
  };
  switch (errorInfo.code) {
    case codes.BAD_REQUEST:
      res.status(codes.BAD_REQUEST).json(errorInfo);
      return;
    case codes.NOT_FOUND:
      res.status(codes.NOT_FOUND).json(errorInfo);
      return;
    case codes.INTERNAL_SERVER_ERROR:
      res.status(codes.INTERNAL_SERVER_ERROR).json(errorInfo);
      return;
    default:
      res.status(codes.INTERNAL_SERVER_ERROR).json(errorInfo);
  }
});
// server.get('/api/posts', async (req, res) => {
//     try {
//     const posts = await postDb.get();
//     res.status(OK_CODE).json(posts);
//     } catch (err) {
//         res.status(NOT_FOUND_CODE).json({ error: 'Posts cannot be found' });
//     }
// })
// server.get('/api/posts/:id', async (req, res) => {
//     try {
//     const { id } = req.params;
//     const post = await postDb.get(id);
//     if(post === undefined) {
//         res.status(NOT_FOUND_CODE).json({ error: 'The post with that id cannot be found'});
//         res.end();
//         return;
//     }
//     res.status(OK_CODE).json(post);
//     } catch (err) {
//         res.status(NOT_FOUND_CODE).json({ error: 'Post cannot be found' });
//     }
// })

// server.post('/api/posts', async (req, res) => {
//     try {
//         const { userId, text } = req.body;
//         if(userId === undefined || text === undefined) {
//             throw BAD_REQUEST_CODE;
//         }
//         const postResponse = postDb.insert(req.body);
//         res.status(OK_CODE).json(postResponse);
//     }
//     catch (err) {
//         switch(err) {
//             case BAD_REQUEST_CODE: {
//                 res.status(BAD_REQUEST_CODE).json({ errorMessage: 'There needs to be a user ID and text in order to create post'});
//                 res.end();
//                 return;
//             }
//             default: {
//             res.status(INTERNAL_SERVER_ERROR_CODE).json({error: 'Error creating post'})
//             }
//         }
//     }
// })
// server.put('/api/posts/:id', async(req, res) => {
//     try {
//         const id = req.params.id;
//         const { userId, text } = req.body;

//         if(userId === undefined || text === undefined) {
//             throw BAD_REQUEST_CODE;
//         }
//         const updateResponse = await postDb.update(id, req.body);
//         if(updateResponse === 0) {
//             throw NOT_FOUND_CODE;
//         }
//         res.status(OK_CODE).json(updateResponse);
//     }
//     catch(err) {
//         switch(err) {
//         case BAD_REQUEST_CODE: {
//             res.status(BAD_REQUEST_CODE).json({ errorMessage: 'Please provide text and a userId'});
//             res.end();
//             break;
//         }
//         case NOT_FOUND_CODE: {
//             res.status(NOT_FOUND_CODE).json({ errorMessage: 'There was no post by that id that can be updated'});
//             res.end();
//             break;
//         }
//         default: {
//         res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: 'The post information could not be modified'});
//         res.end();
//         }
//     }
// }
// });
// server.delete('/api/posts/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const deleteResponse = await postDb.remove(id);
//         if(deleteResponse === 0) {
//             throw NOT_FOUND_CODE;
//         }
//         res.status(200).json(deleteResponse);
//     }
//     catch (err) {
//         switch(err) {
//             case NOT_FOUND_CODE: {
//                 res.status(NOT_FOUND_CODE).json({ errorMessage: 'The user could not be deleted because there is no user with that id'});
//                 res.end();
//                 break;
//             }
//             default: {
//                 res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: 'The user could not be deleted at this time.'})
//                 res.end();
//             }
//         }
//     }
// });
server.listen(8001);
