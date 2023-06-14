const errorHandler = require("../helpers/error_handler");
const Category = require("../models/category");
const { default: mongoose } = require("mongoose");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({name});
    if (category) {
      return res.status(400).json({ message: "category already exists" });
    }
    const newTerm = new Category({ name });
    newTerm.save();

    res.status(201).json({ message: "category added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};