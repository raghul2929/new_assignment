import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import imag from '../img/imm.png';

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    productName: '',
    sequence: '',
    image: null,
    status: 'active',
  });
console.log(formData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subcategoriesRes] = await Promise.all([
          axios.get('https://new-assignment-backend.onrender.com/api/category'),
          axios.get('https://new-assignment-backend.onrender.com/api/subcategory'),
        ]);
        setCategories(categoriesRes.data);
        setSubcategories(subcategoriesRes.data);
      } catch (error) {
        toast.error('Error fetching data!');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.category) {
      const filtered = subcategories.filter(
        (sub) => sub.category._id === formData.category
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, subcategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.subcategory ||
      !formData.productName ||
      !formData.sequence ||
      !formData.image
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('image', formData.image);
      formDataWithImage.append('category', formData.category);
      formDataWithImage.append('subcategory', formData.subcategory);
      formDataWithImage.append('productName', formData.productName);
      formDataWithImage.append('sequence', formData.sequence);
      formDataWithImage.append('status', formData.status);
     // Add description field
     

      // Send the form data with the image file to the server
      const response = await axios.post('https://new-assignment-backend.onrender.com/api/product', formDataWithImage);
      toast.success('Product added successfully!');

      // Clear the form data after success
      setFormData({
        category: '',
        subcategory: '',
        productName: '',
        sequence: '',
        image: null,
        status: 'active',
        description: '',
      });

      navigate('/contains/product');
    } catch (error) {
      toast.error('Failed to add product.');
      console.error(error);
    }
  };

  return (
    <div className="flex h-[580px] pl-[220px] mt-[50px] pt-4">
      <div className="w-[1250px] h-[550px] bg-white p-4">
        <div className="flex items-center gap-2 p-2">
          <img src={imag} alt="icon" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Add Product</h1>
        </div>

        <form onSubmit={handleSubmit}> {/* Bind form submit here */}
          <div className="flex space-x-8 mt-4">
            <div className="flex flex-col w-1/3">
              <label className="text-gray-600 text-sm">Category Name</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/3">
              <label className="text-gray-600 text-sm">Subcategory Name</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {filteredSubcategories.length > 0 ? (
                  filteredSubcategories.map((sub) => (
                    <option key={sub.sub_id} value={sub._id}>
                      {sub.subCategoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>No subcategories available</option>
                )}
              </select>
            </div>
          </div>

          <div className="flex space-x-8 mt-4">
            <div className="flex flex-col w-1/3">
              <label className="text-gray-600 text-sm">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter Product Name"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label className="text-gray-600 text-sm">Product Sequence</label>
              <input
                type="number"
                name="sequence"
                value={formData.sequence}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Added status dropdown */}
          <div className="flex flex-col w-1/3 mt-4">
            <label className="text-gray-600 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* File upload */}
          <div className="flex space-x-6 mt-8">
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center w-64 h-40 hover:border-blue-500">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                <img src={imag} alt="Upload Icon" className="w-12 h-12 mb-2" />
                <span className="text-gray-600 text-sm">Click to Upload</span>
                {formData.image && <p className="text-xs text-gray-500">{formData.image.name}</p>}
              </label>
            </div>
          </div>

          <div className="absolute right-[50px] bottom-[70px]">
            <button
              type="submit" // Submit button triggers the form's submit
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={() => navigate('/contains/product')} // Cancel button takes the user back to the product list
              className="bg-red-500 ml-2 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
