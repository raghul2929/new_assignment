const express = require('express');
const multer = require('multer');
const Category = require('../backend/models/Category');
// const SubCategory = require('../backend/models/Subcategory');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and JPG files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

// Create Category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { categoryName, sequence, status } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const newCategory = new Category({
      categoryName,
      sequence,
      status,
      image: imageUrl,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating category' });
  }
});

// Get All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Get Single Category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching category' });
  }
});

// Update Category
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { categoryName, sequence, status } = req.body;
    const updatedData = { categoryName, sequence, status };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating category' });
  }
});

// Delete Category
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting category' });
  }
});

module.exports = router;
