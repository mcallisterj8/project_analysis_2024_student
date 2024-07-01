const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Product = require("../models/product");

// GET all products /products/
router.get("", async (req, res) => {
    // get all products
    const products = await Product.findAll();

    res.json(products);
});

// GET /products/search
router.get("/search", async (req, res) => {    
    const name = req.query.name;
    // const { name } = req.query;

    if(!name) {
        return res.status(400).json({error: "Invalid search."});
    }

    const products = await Product.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },           
        },
    });

    res.json(products);
     
});

// GET /products/2
router.get("/:id", async (req, res) => { 
    console.log("\n\n");
    console.log(req.params);
    console.log("\n\n");   
    const product = await Product.findByPk(req.params.id);
    
    if(product) {
        res.json(product);        
    } else {
        res.status(404).json({error: "Product not found."});
    }

});

router.post("", async (req, res) => {
    const { name, price } = req.body;
    
    if(!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
    }

    const newProduct = await Product.create({name, price});

    res.status(201).json({
        success: true,
        message: "Product added",
        newProduct
    });
})

module.exports = router;