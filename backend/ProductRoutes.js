const express = require("express");
const multer = require("multer");
const Product = require("../backend/models/Product");
const Category = require("../backend/models/Category");
const Subcategory = require("../backend/models/Subcategory");  // Fixed path

const router = express.Router();

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Create a new product (POST)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { productName, category, subCategory, sequence, status } = req.body;

    // ✅ Convert category name to ObjectId
    const foundCategory = await Category.findOne({ categoryName: category });
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ Convert subcategory name to ObjectId
    const foundSubCategory = await Subcategory.findOne({ subCategoryName: subCategory });  // Fixed casing
    if (!foundSubCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    const newProduct = new Product({
      productName,
      category: foundCategory._id,  // Use ObjectId
      subCategory: foundSubCategory._id, // Use ObjectId
      sequence,
      status: status || "active",
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all products (GET)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "categoryName")
      .populate("subCategory", "subCategoryName");

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ✅ Get a single product by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "categoryName")
      .populate("subCategory", "subCategoryName");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
});

// ✅ Update a product by ID (PUT)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { productName, category, subCategory, sequence, status } = req.body;
    const updatedData = { productName, sequence };

    // ✅ Convert category name to ObjectId if provided
    if (category) {
      const foundCategory = await Category.findOne({ categoryName: category });
      if (!foundCategory) {
        return res.status(400).json({ message: "Category not found." });
      }
      updatedData.category = foundCategory._id;
    }

    // ✅ Convert subcategory name to ObjectId if provided
    if (subCategory) {
      const foundSubCategory = await Subcategory.findOne({ subCategoryName: subCategory });  // Fixed casing
      if (!foundSubCategory) {
        return res.status(400).json({ message: "SubCategory not found." });
      }
      updatedData.subCategory = foundSubCategory._id;
    }

    if (status && !["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value. Must be "active" or "inactive".' });
    }

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    if (status) {
      updatedData.status = status;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
});

// ✅ Delete a product by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
