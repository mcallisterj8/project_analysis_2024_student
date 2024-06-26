const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Product = require("../models/product");

// GET all products
router.get("", async (req, res) => {
    // get all products
    const products = await Product.findAll();

    res.json(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({error: "Product not found."});
    }

});

module.exports = router;