const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const PORT = 3030;

server.use(bodyParser());

const users = [
  { id: "1", user: "userOne" },
  { id: "2", user: "userTwo" },
  { id: "3", user: "userThree" },
];

server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});

server.get("/users/:id", (req, res) => {
  const {
    id
  } = req.params;
  console.log(id);

  const user = users.filter(theUser => {
    return theUser.id === id;
      console.log(theUser);
  });
  
  res.status(200);
  res.send(user);
});

server.get("/search", (req, res) => {
  let { name } = req.query;
  let searchResults = users.filter(user => {
    return user.user.toLowerCase() === name.toLowerCase();
  });

  res.status(200);
  res.send(searchResults);
});

server.post("/users", (req, res)=>{
  let { user } = req.body;
  let userObj = {};
  userObj.user = user;
  userObj.id = users.length + 1;
  users.push(userObj);
  res.send(users);
});

server.get("/users", (req, res) => {
  res.status(200);
  res.send(users);
});

server.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  let updatedUsers = users.filter(user => {
    return user.id !== id;
  });
  res.status(200);
  res.send(updatedUsers);
});