import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import imag from '../img/imm.png';

function EditCategory() {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [sequence, setSequence] = useState('');
  const [status, setStatus] = useState('active');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/category/${id}`);
        console.log('Category fetched:', response.data); // Debug the API response
        const category = response.data;

        // Set the form fields based on the fetched category
        setCategoryName(category.categoryName);
        setSequence(category.sequence);
        setStatus(category.status);
        setPreviewImage(`http://localhost:5000/${category.image}`); // Assuming the image path is returned this way
      } catch (error) {
        toast.error('Failed to load category data.', { position: 'top-right' });
        console.error('Error fetching category:', error);
      }
    };
    fetchCategory();
  }, [id]);

  // Input field handlers
  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleSequenceChange = (e) => setSequence(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the new image
    }
  };

  // Handle form submission to update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!categoryName || !sequence || !status) {
      toast.error('All fields are required!', { position: 'top-right' });
      return;
    }

    // Prepare form data for the update request
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('sequence', sequence);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
      setIsSubmitting(true);
      // Send PUT request to update category
      await axios.put(`http://localhost:5000/api/category/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Category updated successfully!', { position: 'top-right' });
      navigate('/contains/category'); // Redirect to categories list after update
    } catch (error) {
      toast.error('Failed to update category. Please try again.', { position: 'top-right' });
      console.error('Error updating category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex h-[580px] pl-[220px] mt-[50px] pt-4'>
      <div className='w-[1250px] h-[550px] bg-white p-4'>
        <div className='flex items-center gap-2 p-2'>
          <img src={imag} alt='' className='w-8 h-8' />
          <h1 className='text-xl font-bold'>Edit Category</h1>
        </div>

        {/* Category Inputs */}
        <div className='flex space-x-8 mt-4'>
          <div className='flex flex-col w-1/3'>
            <label className='text-gray-600 text-sm'>Category Name</label>
            <input
              type='text'
              value={categoryName}
              onChange={handleCategoryNameChange}
              placeholder='Enter Category Name'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col w-1/3'>
            <label className='text-gray-600 text-sm'>Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          <div className='flex flex-col w-1/3'>
            <label className='text-gray-600 text-sm'>Category Sequence</label>
            <input
              type='number'
              value={sequence}
              onChange={handleSequenceChange}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className='flex space-x-6 mt-8'>
          <div className='border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center w-64 h-40 hover:border-blue-500 hover:shadow-lg cursor-pointer'>
            <input
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleImageChange}
              id='file-upload'
            />
            <label htmlFor='file-upload' className='flex flex-col items-center'>
              <img src={previewImage || imag} alt='Upload Icon' className='w-12 h-12 mb-2' />
              <span className='text-gray-600 text-sm'>Click to Upload</span>
            </label>
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className='absolute right-[50px] bottom-[70px]'>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Category'}
          </button>
          <button
            onClick={() => navigate('/categories')}
            className='bg-red-500 ml-2 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
