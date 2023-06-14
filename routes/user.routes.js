const { Router } = require("express");

const {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/user.controller");

const router = Router();
router.get("/", getUser);
router.post("/", addUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;