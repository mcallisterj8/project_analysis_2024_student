const sequelize = require("../database");

// Import all models
const User = require("./user");
const Post = require("./post");

const models = {
  User,
  Post,
};

/**
 * This approach allows for only method access like:
 *
 * Access posts of a user: user.getPosts()
 * Access user of a post: post.getUser()
 */
// User.hasMany(Post, { foreignKey: "userId" });
// Post.belongsTo(User, { foreignKey: "userId" });

/**
 * This approach allows for method and property access like:
 *
 * Access posts of a user: user.getPosts(), user.posts
 * Access user of a post: post.getUser(), post.user
 */
User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { as: "user", foreignKey: "userId" });

// Export the Sequelize instance and all models
module.exports = {
  sequelize,
  models,
};
