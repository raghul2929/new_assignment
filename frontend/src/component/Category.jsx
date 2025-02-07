import React, { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Navigate to Add Category Page
  const handleAddCategoryClick = () => {
    navigate("/contains/addcat");
  };

  // Navigate to Edit Category Page
  const handleEditClick = (id) => {
    navigate(`/contains/edit/${id}`);
  };

  // Handle Delete Category using Axios
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/api/category/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
        console.log("Category deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Search Functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate Custom IDs
  const generateCustomId = (index) => { 
    return (100 + index).toString().padStart(3, "0");
  };

  return (
    <div className="p-6 ml-64 mt-16 w-[calc(100%-16rem)]">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-yellow-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold">Category</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded-md w-60"
          />
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleAddCategoryClick}
          >
            <Plus size={16} className="mr-2" /> Add Category
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="mt-4 bg-white shadow-md rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-yellow-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Category Name</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Sequence</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category._id} className="border-b">
                <td className="p-3">{generateCustomId(index)}</td>
                <td className="p-3">{category.categoryName}</td>
                <td className="p-3">
                  {category.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${category.image}`}  // Display only the image
                      alt=""
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td
                  className={`p-3 ${
                    category.status === "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {category.status}
                </td>
                <td className="p-3">{category.sequence}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditClick(category._id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(category._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
