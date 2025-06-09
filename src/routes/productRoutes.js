const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();

router.get("/readall",getProducts);
router.get("/read/:id", getProductById);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;