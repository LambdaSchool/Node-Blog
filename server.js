const express = require('express');
//const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
//server.use(cors({ origin: 'http://localhost:3000' }));

server.get('/', (req, res) => {
	res.send('Hello, Kelly');
})

//****************postDb****************************
server.post('/api/posts', (req,res) => {
	if (!req.body.userId || !req.body.text) {
		res.status(400);
		res.json({ errorMessage: "Please provide userId and text for the post." });
	}
	else {

	const { text, userId } = req.body;
	posts.insert({ text, userId })
		.then(response => {
			res.status(201);
			posts.get(response.id)
				.then(posts => {
					res.json({ posts });
				});
		})
			.catch(error => {
				res.status(500);
				res.json({ error: "There was an error saving the post to the database."});
			})
	}
})

server.get('/api/posts', (req, res) => {
	posts.get().then(posts => {
		res.json({ posts });
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post information could not be retrieved."});
		})
});

server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	posts.get(req.params.id).then(posts => {
		if (posts) {
			res.json({ posts });
		}
		else {
			res.status(404);
			res.json({ message: " The post with the specified ID does not exist." });
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post information could not be retrieved." });
		})
});

server.put('/api/posts/:id', (req, res) => {
	const { text, userId } = req.body;
	const id = req.params.id;

	if (!userId || !text) {
		res.status(400);
		res.json({ errorMessage: "Please provide the author and text for the post." });
	}
	else {
		posts.update( id, { text, userId } ).then(success => {
			if (success) {
				res.status(200);
				posts.get(id)
					.then(posts => {
						res.json({ posts });
			});
		}

			else {
				res.status(404);
				res.json({ message: "The post with the specified ID does not exist." });
			}
		}
		)
			.catch(error => {
				res.status(500);
				res.json({ error: "The post could not be found." });
			})
}
})

server.delete('/api/posts/:id', (req, res) => {
	const { id } = req.params
	posts.remove(id).then(success => {
		if (success) {
			res.status(200);
			res.json({ success });
			}
		else {
			res.status(404);
			res.json({ message: "The post with the specified ID does not exist." })
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post could not be removed." });
			})
	})

// **********userDb**********************
server.post('/api/users', (req,res) => {
	if (!req.body.name) {
		res.status(400);
		res.json({ errorMessage: "Please provide user name." });
	}
	else {

	const { name } = req.body;
	users.insert({ name })
		.then(response => {
			res.status(201);
			users.get(response.id)
				.then(users => {
					res.json({ users });
				});
		})
			.catch(error => {
				res.status(500);
				res.json({ error: "There was an error saving the user to the database."});
			})
	}
})

server.get('/api/users', (req, res) => {
	users.get().then(users => {
		res.json({ users });
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The user information could not be retrieved."});
		})
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	users.get(req.params.id).then(users => {
		if (users) {
			res.json({ users });
		}
		else {
			res.status(404);
			res.json({ message: " The user with the specified ID does not exist." });
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The user information could not be retrieved." });
		})
});

server.put('/api/users/:id', (req, res) => {
	const { name } = req.body;
	const id = req.params.id;

	if (!name) {
		res.status(400);
		res.json({ errorMessage: "Please provide the name for the user." });
	}
	else {
		users.update( id, { name } ).then(success => {
			if (success) {
				res.status(200);
				users.get(id)
					.then(users => {
						res.json({ users });
			});
		}

			else {
				res.status(404);
				res.json({ message: "The user with the specified ID does not exist." });
			}
		}
		)
			.catch(error => {
				res.status(500);
				res.json({ error: "The user could not be found." });
			})
}
})

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params
	users.remove(id).then(success => {
		if (success) {
			res.status(200);
			res.json({ success });
			}
		else {
			res.status(404);
			res.json({ message: "The user with the specified ID does not exist." })
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The user could not be removed." });
			})
	})


//**********************tagDb************************

server.post('/api/tags', (req,res) => {
	if (!req.body.tag) {
		res.status(400);
		res.json({ errorMessage: "Please provide a name for the tag." });
	}
	else {

	const { tag } = req.body;
	tags.insert({ tag })
		.then(response => {
			res.status(201);
			tags.get(response.id)
				.then(tags => {
					res.json({ tags });
				});
		})
			.catch(error => {
				res.status(500);
				res.json({ error: "There was an error saving the tag to the database."});
			})
	}
})

server.get('/api/tags', (req, res) => {
	tags.get().then(tags => {
		res.json({ tags });
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The tag information could not be retrieved."});
		})
});

server.get('/api/tags/:id', (req, res) => {
	const { id } = req.params;
	tags.get(req.params.id).then(tags => {
		if (tags) {
			res.json({ tags });
		}
		else {
			res.status(404);
			res.json({ message: " The tag with the specified ID does not exist." });
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The tag information could not be retrieved." });
		})
});

server.put('/api/tags/:id', (req, res) => {
	const { tag } = req.body;
	const id = req.params.id;

	if (!tag) {
		res.status(400);
		res.json({ errorMessage: "Please provide tag name." });
	}
	else {
		tags.update( id, { tag } ).then(success => {
			if (success) {
				res.status(200);
				tags.get(id)
					.then(tags => {
						res.json({ tags });
			});
		}

			else {
				res.status(404);
				res.json({ message: "The tag with the specified ID does not exist." });
			}
		}
		)
			.catch(error => {
				res.status(500);
				res.json({ error: "The tag could not be found." });
			})
}
})

server.delete('/api/tags/:id', (req, res) => {
	const { id } = req.params
	tags.remove(id).then(success => {
		if (success) {
			res.status(200);
			res.json({ success });
			}
		else {
			res.status(404);
			res.json({ message: "The tag with the specified ID does not exist." })
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The tag could not be removed." });
			})
	})

server.listen(port, () => console.log(`Server running on port ${port}`));
