const { Router } = require("express");

const {
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  addOrder,
  getorderbyuser_Id,
  getorder_total_amount_Byuser_id,
  max_total_amountByUserId,
} = require("../controllers/order.controller");

const router = Router();
router.get("/", getOrder);
router.post("/", addOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/user/:user_id", getorderbyuser_Id);
router.get("/order/:user_id", getorder_total_amount_Byuser_id);
router.get("/max/:user_id", max_total_amountByUserId);

module.exports = router;