const express = require('express');
const multer = require('multer');
const Subcategory = require('./models/Subcategory');
const Category = require('./models/Category');
const router = express.Router();

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify where to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Give a unique name to the file
  }
});

const upload = multer({ storage });

// POST: Create a new subcategory with image handling
router.post('/', upload.single('image'), async (req, res) => {
  console.log(req.body); // Check the form data sent by the frontend
  const { subCategoryName, category, status, sequence } = req.body;
  const image = req.file ? req.file.path : null; // Handle image file

  try {
    const newSubcategory = new Subcategory({
      subCategoryName,
      category,
      image,
      status,
      sequence
    });

    await newSubcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory', error });
  }
});

// GET: Fetch all subcategories
router.get('/', async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
});

// GET: Fetch a single subcategory by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const subcategory = await Subcategory.findById(id).populate('category');

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategory', error });
  }
});

// PUT: Update an existing subcategory by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { subCategoryName, category, image, status, sequence } = req.body;

  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      { subCategoryName, category, image, status, sequence },
      { new: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory', error });
  }
});

// DELETE: Delete a subcategory by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

    if (!deletedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error });
  }
});

module.exports = router;
