const errorHandler = require("../helpers/error_handler");
const isValid = require("../helpers/isValidObjectId");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const MyJwt = require("../services/JwtServices");
const config = require('config');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ name, email, password });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newTerm = new User({ name, email, password });
    newTerm.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateUser = async (req, res) => {
  try {
    isValid(req, res);
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteUser = async (req, res) => {
  try {
    isValid(req, res);
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Email yoki parol noto'g'ri1" });
    }
    const payload = {
      id: user._id,
      userRoles: ["WRITE", "READ"],
    };
    const tokens = MyJwt.generateTokens(payload);
    user.user_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send({ ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
};
