const express = require("express");
const userdb = require("./data/helpers/userDb");
const postdb = require("./data/helpers/postDb");
const tabdb = require("./data/helpers/tagDb");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Sup fam");
});

//user requests

server.get("/users", async (req, res) => {
  try {
    let data = await userdb.get();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(error);
  }
});

server.get("/users/:id", async (req, res) => {
  try {
    let data = await userdb.get(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: "This user does not exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/userPosts/:id", async (req, res) => {
  try {
    let data = await userdb.getUserPosts(req.params.id);
    if (data.length) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: "This user does not have any posts." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post("/users", async (req, res) => {
  let { name } = req.body;
  try {
    if (name) {
      let data = await userdb.insert(req.body);
      return res.status(200).jspon(data);
    } else {
      return res
        .status(404)
        .json({ error: "Please provide a name for this user." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/users/:id", async (req, res) => {
  let { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ error: "Please provide a name for this user." });
  }
  try {
    let data = await userdb.update(req.params.id, req.body);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: "The user with this id does not exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.delete("/users/:id", async (req, res) => {
  try {
    let data = await userdb.remove(req.params.id);
    if (data) {
      return res.status(200).json({ id: req.params.id });
    } else {
      return res
        .status(404)
        .json({ error: "The user with this id does not exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//posts requests

server.get("/posts", async (req, res) => {
  try {
    let data = await postdb.get();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/posts/:id", async (req, res) => {
  try {
    let data = await postdb.get(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: "The post with this id does not exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/postTags/:id", async (req, res) => {
  try {
    let data = await postdb.getPostTags(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: "The post with thid id does not exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.listen(8000, () => console.log("\n== API on port 8k ==\n"));
