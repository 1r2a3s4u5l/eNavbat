const { Router } = require("express");

const {
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  addOrder,
} = require("../controllers/order.controller");

const router = Router();
router.get("/", getOrder);
router.post("/", addOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;