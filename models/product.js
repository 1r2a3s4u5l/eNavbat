const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Product", productSchema);
