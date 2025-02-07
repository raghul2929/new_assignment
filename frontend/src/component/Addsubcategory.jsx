import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import imag from '../img/imm.png';

function AddSubCategory() {
  const navigate = useNavigate();
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sequence, setSequence] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category');
        setCategories(response.data);
      } catch (error) {
        toast.error('Error fetching categories.', { position: 'top-right', autoClose: 5000 });
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subCategoryName || !categoryId || !sequence || !status) {
      toast.error('All fields are required!', { position: 'top-right', autoClose: 5000 });
      return;
    }

    if (isNaN(sequence) || sequence <= 0) {
      toast.error('Sequence must be a valid positive number', { position: 'top-right', autoClose: 5000 });
      return;
    }

    const formData = new FormData();
    formData.append('subCategoryName', subCategoryName);
    formData.append('category', categoryId);
    formData.append('sequence', sequence);
    formData.append('status', status);
    if (image) formData.append('image', image);

    try {
      setIsSubmitting(true);
      await axios.post('http://localhost:5000/api/subcategory', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Subcategory added successfully!', { position: 'top-right', autoClose: 5000 });
      navigate('/contains/subcategory');
    } catch (error) {
      toast.error('Failed to add subcategory.', { position: 'top-right', autoClose: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-[580px] pl-[220px] mt-[50px] pt-4">
      <div className="w-[1250px] h-[550px] bg-white p-4">
        <div className="flex items-center gap-2 p-2">
          <img src={imag} alt="icon" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Add Subcategory</h1>
        </div>

        <div className="flex space-x-8 mt-4">
          <div className="flex flex-col w-1/3">
            <label className="text-gray-600 text-sm">Subcategory Name</label>
            <input type="text" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} placeholder="Enter Subcategory Name" className="border border-gray-300 rounded-md p-2" />
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-gray-600 text-sm">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded-md p-2">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-gray-600 text-sm">Sequence</label>
            <input type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} className="border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div className="flex space-x-8 mt-4">
          <div className="flex flex-col w-1/3">
            <label className="text-gray-600 text-sm">Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border border-gray-300 rounded-md p-2">
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.categoryName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-6 mt-8">
          <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center w-64 h-40 hover:border-blue-500 cursor-pointer">
            <input type="file" className="hidden" accept="image/*" onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} id="file-upload" />
            <label htmlFor="file-upload" className="flex flex-col items-center">
              <img src={imag} alt="Upload Icon" className="w-12 h-12 mb-2" />
              <span className="text-gray-600 text-sm">Click to Upload</span>
            </label>
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4" width="100" />}
          </div>
        </div>

        <div className="absolute right-[50px] bottom-[70px]">
          <button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
            {isSubmitting ? 'Adding...' : 'Add Subcategory'}
          </button>
          <button onClick={() => navigate('/contains/subcategory')} className="bg-red-500 ml-2 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategory;
