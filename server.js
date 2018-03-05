const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3000;

let idGen = 1;
let users = [
  {
    name: "Bob Marley",
    id: 0
  }
];

server.get("/", (req, res) => {
  res.status(200);
  res.send(users);
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an erorr starting the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
