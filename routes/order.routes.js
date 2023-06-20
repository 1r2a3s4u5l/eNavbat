const { Router } = require("express");

const {
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  addOrder,
  getorderbyuser_Id,
} = require("../controllers/order.controller");

const router = Router();
router.get("/", getOrder);
router.post("/", addOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/user/:user_id", getorderbyuser_Id);

module.exports = router;