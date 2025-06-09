const Product= require("../models/productModel");

const getProducts= async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos" });
    }
}
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto" });
    }   }
const createProduct = async (req, res) => { 
    const { name, price, description } = req.body;
    try {
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto" });
    }
}
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
}
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }} catch (error) {      
       return res.status(500).json({ message: "Error al eliminar el producto" });
    }  }
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};