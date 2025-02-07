const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // category reference updated
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true }, // subCategory reference updated
    image: { type: String, default: "" },
    sequence: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
