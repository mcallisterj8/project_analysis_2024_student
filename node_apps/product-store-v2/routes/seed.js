const express = require("express");
const Product = require("../models/product");

const router = express.Router();

async function seedProducts() {
    const products = [
      { name: "Yamaha Piano", price: 1500 },
      { name: "Fender Stratocaster Guitar", price: 1200 },
      { name: "Pearl Drum Kit", price: 800 },
      { name: "Selmer Saxophone", price: 1400 },
      { name: "Mendini Violin", price: 300 },
      { name: "Hohner Harmonica", price: 50 },
      { name: "Gibson Les Paul Guitar", price: 2500 },
      { name: "Yamaha Flute", price: 400 },
      { name: "Ibanez Bass Guitar", price: 900 },
      { name: "Buffet Crampon Clarinet", price: 600 },
    ];
  
    for (let product of products) {
      await Product.findOrCreate({
        where: { name: product.name },
        defaults: { price: product.price },
      });
    }
  }
  
  router.get("/", async (req, res) => {
    try {
      const productCount = await Product.count();
      if (productCount === 0) {
        await seedProducts();
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