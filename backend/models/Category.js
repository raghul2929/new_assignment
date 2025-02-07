const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  image: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Category', CategorySchema,'category');
