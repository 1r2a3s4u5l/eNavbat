const errorHandler = require("../helpers/error_handler");
const isValid = require("../helpers/isValidObjectId");
const Order = require("../models/order");
const User = require("../models/user");

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
    console.log(error);
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
const getorderbyuser_Id = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOne({ _id: user_id });

    if (!user || user.length == 0) {
      return res.status(400).send({ message: "user_id not Found" });
    }

    const order = await Order.find({})
      .populate("user_id")
      .populate({
        path: "product_id",
        populate: { path: "category_id" },
      });

    if (!order || order.length === 0) {
      return res.status(404).json({ message: "No order found" });
    }

    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getorder_total_amount_Byuser_id = async (req, res) => {
  try {
    const { user_id } = req.params;
    const order = await Order.findOne({ user_id });
    console.log(order.total_amount);
    if (user_id) {
      res.status(200).send({ total_amount: order.total_amount });
    } else {
      return res.status(400).send({ message: "user_id not found" });
    }
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
const max_total_amountByUserId = async (req,res)=>{
  try {
    
  } catch (error) {
    console.log(error);
    errorHandler(res,error)
  }
}
module.exports = {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getorderbyuser_Id,
  getorder_total_amount_Byuser_id,
  max_total_amountByUserId
};
