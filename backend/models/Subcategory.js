const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  subCategoryName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  sequence: { type: Number, required: true } // Add this if you're using 'sequence'
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema, 'Subcategory');

module.exports = Subcategory;
