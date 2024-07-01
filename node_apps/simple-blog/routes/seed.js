const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");

const router = express.Router();

async function seedDatabase() {
  const users = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
  ];

  const posts = [
    {
      title: "First Post",
      content: "This is the first post content.",
      userEmail: "john@example.com",
    },
    {
      title: "Second Post",
      content: "This is the second post content.",
      userEmail: "jane@example.com",
    },
    {
      title: "Third Post",
      content: "This is the third post content.",
      userEmail: "alice@example.com",
    },
  ];

  for (let user of users) {
    await User.findOrCreate({
      where: { email: user.email },
      defaults: { name: user.name },
    });
  }

  for (let post of posts) {
    const user = await User.findOne({ where: { email: post.userEmail } });
    if (user) {
      await Post.findOrCreate({
        where: { title: post.title },
        defaults: { content: post.content, userId: user.id },
      });
    }
  }
}

router.get("/", async (req, res) => {
  try {
    const userCount = await User.count();
    const postCount = await Post.count();
    if (userCount === 0 && postCount === 0) {
      await seedDatabase();
      res.status(200).send("Database seeded successfully");
    } else {
      res.status(200).send("Database already seeded");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

module.exports = router;
