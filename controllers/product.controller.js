const errorHandler = require("../helpers/error_handler");
const Product = require("../models/product");
const { default: mongoose } = require("mongoose");

const addProduct = async (req, res) => {
  try {
    const { name,price,category_id } = req.body;
    const product = await Product.findOne({name,price,category_id});
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const newTerm = new Product({ name,price,category_id });
    newTerm.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.find({}).populate("category_id");
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json(product);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id).populate("category_id");
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json(product);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const { name,price,category_id } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name,price,category_id },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};