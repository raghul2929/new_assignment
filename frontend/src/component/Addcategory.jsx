import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import imag from '../img/imm.png';

function AddCategory() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [sequence, setSequence] = useState('');
  const [status, setStatus] = useState('active');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleSequenceChange = (e) => setSequence(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!categoryName || !sequence || !status) {
      toast.error('All fields are required!', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    if (isNaN(sequence) || sequence <= 0) {
      toast.error('Sequence must be a valid positive number', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    // Prepare form data to send to the server
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('sequence', sequence);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:5000/api/category/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Category added successfully!', {
        position: 'top-right',
        autoClose: 5000,
      });

      // Reset form
      setCategoryName('');
      setSequence('');
      setStatus('active');
      setImage(null);
      setImagePreview(null);
      navigate('/contains/category'); // Redirect to category list page
    } catch (error) {
      toast.error('Failed to add category. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
      console.error('Error adding category:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setCategoryName('');
    setSequence('');
    setStatus('active');
    setImage(null);
    setImagePreview(null);
    navigate('/contains/category');
  };

  return (
    <div className="flex h-[580px] pl-[220px] mt-[50px] pt-4">
      <div className="w-[1250px] h-[550px] bg-white p-4">
        <div className="flex items-center gap-2 p-2">
          <img src={imag} alt="" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Add Category</h1>
        </div>

        {/* Category Input with Status Dropdown */}
        <div className="flex space-x-8 mt-4">
          <div className="flex flex-col w-1/3">
            <label className="text-gray-600 text-sm">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
              placeholder="Enter Category Name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-gray-600 text-sm">Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-gray-600 text-sm">Category Sequence</label>
            <input
              type="number"
              value={sequence}
              onChange={handleSequenceChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Upload Box */}
        <div className="flex space-x-6 mt-8">
          <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center w-64 h-40 hover:border-blue-500 hover:shadow-lg cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center">
              <img src={imag} alt="Upload Icon" className="w-12 h-12 mb-2" />
              <span className="text-gray-600 text-sm">Click to Upload</span>
            </label>
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4" width="100" />}
          </div>
        </div>

        {/* Submit Button */}
        <div className="absolute right-[50px] bottom-[70px]">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isSubmitting ? 'Adding...' : 'Add Category'}
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 ml-2 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
