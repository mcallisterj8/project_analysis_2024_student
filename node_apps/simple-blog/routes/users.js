const express = require("express");
const User  = require("../models/user");

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  if(name && email) {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } else {
    res.status(404).json({ error: "Name and email is required." });
  }
});

// Get all users
router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);  
});

// Get a single user by ID
router.get("/:id", async (req, res) => {    
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
  
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user && email) {
    user.name = name;
    user.email = email;
    await user.save();

    res.json(user);
  } else {
    res.status(404).json({ error: "User not found and/or email not given." });
  }
  
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();

    res.status(204).end();
  } else {
    res.status(404).json({ error: "User not found" });
  }
  
});

module.exports = router;
