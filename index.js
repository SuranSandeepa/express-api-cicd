const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory user data (just for demonstration)
let users = [
  {
    id: 1,
    name: "Suran Sandeepa",
    age: 25,
  },
  {
    id: 2,
    name: "John Doe",
    age: 30,
  },
];

// GET endpoint - Home
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Application!");
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET a specific user by ID
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

// POST - Add a new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update a user by ID
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.name = req.body.name || user.name;
  user.age = req.body.age || user.age;

  res.json(user);
});

// DELETE - Remove a user by ID
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(userIndex, 1);
  res.send("User deleted successfully");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
