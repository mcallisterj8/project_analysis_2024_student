const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");

const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { title, content, userId } = req.body;
  const user = await User.findByPk(userId);
  if(!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (title && content) {
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } else {
    res.status(404).json({ error: "Title and content is required to create a post." });
  }
  
});

// Get all posts
router.get("/", async (req, res) => {
  // Get all posts and include the author of the post.
  const posts = await Post.findAll({ include: "user" });
  res.json(posts);
  
});

// Get a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: "user" });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Error fetching post" });
  }
});

// Update a post by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (post) {
      post.title = title;
      post.content = content;
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Error updating post" });
  }
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

module.exports = router;
