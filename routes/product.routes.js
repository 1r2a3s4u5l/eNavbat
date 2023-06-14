const { Router } = require("express");

const {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addProduct,
} = require("../controllers/product.controller");

const router = Router();
router.get("/", getProduct);
router.post("/", addProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;