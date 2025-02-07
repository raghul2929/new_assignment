import React, { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Subcategory = () => {
  const subcategoryColumns = ["Id", "Subcategory Name", "Category Name", "Image", "Status", "Sequence", "Action"];

  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // To store search query
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/subcategory");
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Filter subcategories based on the search query
  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.subCategoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubcategoryClick = () => {
    navigate("/contains/addsub");
  };

  const handleDeleteSubcategory = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this subcategory?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/subcategory/${id}`);
        setSubcategories(subcategories.filter((subcategory) => subcategory._id !== id));
        alert("Subcategory deleted successfully.");
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Error deleting subcategory.");
      }
    }
  };

  return (
    <div className="p-6 ml-64 mt-16 w-[calc(100%-16rem)]">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-yellow-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold">Subcategory</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery} // Bind search query state to the input
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            className="border p-2 rounded-md w-60"
          />
          <button
            onClick={handleAddSubcategoryClick}
            className="bg-purple-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add Subcategory
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-4 bg-white shadow-md rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-yellow-200">
            <tr>
              {subcategoryColumns.map((col, index) => (
                <th key={index} className="p-3 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{200 + index}</td>
                  <td className="p-3">{row.subCategoryName}</td>
                  <td className="p-3">{row.category?.categoryName || "No Category"}</td>
                  <td className="p-3">
                    {row.image ? (
                      <img src={`http://localhost:5000/uploads/${row.image}`} className="w-20 h-20 object-cover" />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className={`p-3 ${row.status === "Active" ? "text-green-500" : "text-red-500"}`}>{row.status}</td>
                  <td className="p-3">{row.sequence}</td>
                  <td className="p-7 mt-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/contains/editsub/${row._id}`)}
                      className="text-blue-500"
                    >
                      <Edit className="w-6 h-6" />
                    </button>
                    <button className="text-red-500" onClick={() => handleDeleteSubcategory(row._id)}>
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-3 text-center">No subcategories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subcategory;
