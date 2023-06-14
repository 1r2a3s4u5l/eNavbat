const { Router } = require("express");
const router = Router();

const userRouter = require("./user.routes");
const categoryRouter = require("./category.routes");
const productRouter = require("./product.routes");
const orderRouter = require("./order.routes");

router.use("/api/user", userRouter);
router.use("/api/category", categoryRouter);
router.use("/api/product", productRouter);
router.use("/api/order", orderRouter);

module.exports = router;