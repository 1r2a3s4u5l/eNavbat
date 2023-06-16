const errorHandler = require("../helpers/error_handler");
const isValid = require("../helpers/isValidObjectId");
const Order = require("../models/order");

const addOrder = async (req, res) => {
  try {
    const { user_id, product_id, total_amount } = req.body;
    const order = await Order.findOne({ user_id, product_id, total_amount });
    if (order) {
      return res.status(400).json({ message: "Order already exists" });
    }
    const newTerm = await Order({ user_id, product_id, total_amount });
    await newTerm.save();

    res.status(201).json({ message: "Order added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.find({})
      .populate("user_id")
      .populate({
        path: "product_id",
        populate: { path: "category_id" },
      });
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("total_amount");
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateOrder = async (req, res) => {
  try {
    isValid(req, res);
    const { id } = req.params;
    const { user_id, product_id, total_amount } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { user_id, product_id, total_amount },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteOrder = async (req, res) => {
  try {
    isValid(req, res);
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
};
