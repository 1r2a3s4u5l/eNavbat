const { Router } = require("express");

const {
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addCategory,
} = require("../controllers/category.controller");

const router = Router();
router.get("/", getCategory);
router.post("/", addCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;