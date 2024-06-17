const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

let products = [];
const productsFile = "./database/products.json";

fs.readFile(productsFile, (err, data) => {
    if(err) {
        throw err;
    }

    products = JSON.parse(data);
});

router.get("/", (req, res) => {    
    res.json(products);
});

router.get("/hello/again", (req, res) => {
    res.json({hello: "world again!"});
});

router.get("/hello/:id", (req, res) => {
    res.json({hello: "world with id: " + req.params.id});
});

router.get("/hello", (req, res) => {
    res.json({hello: "world"});
});

module.exports = router;