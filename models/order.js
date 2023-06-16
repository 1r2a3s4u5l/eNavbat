const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    total_amount: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Order", orderSchema);
