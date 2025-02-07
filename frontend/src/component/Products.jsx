import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]); // To store the fetched products
  const [searchQuery, setSearchQuery] = useState(""); // To store the search query
  const navigate = useNavigate();

  const productColumns = [
    "Id", "Product Name", "Category", "Subcategory", "Image", "Sequence", "Status", "Action"
  ];

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://new-assignment-backend.onrender.com/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the product name only
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProductClick = () => {
    navigate("/contains/addpro");
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://new-assignment-backend.onrender.com/api/product/${id}`);
        setProducts(products.filter((product) => product._id !== id)); // Remove deleted product from state
        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product.");
      }
    }
  };

  return (
    <div className="p-6 ml-60 mt-[60px] w-[calc(100%-15rem)]">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-yellow-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded-md w-60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <button
            onClick={handleAddProductClick}
            className="bg-purple-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add Product
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-4 bg-white shadow-md rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-yellow-200">
            <tr>
              {productColumns.map((col, index) => (
                <th key={index} className="p-3 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">P{index + 1}</td>
                  <td className="p-3">{product.productName}</td>
                  <td className="p-3">{product.category?.categoryName || "No Category"}</td>
                  <td className="p-3">{product.subCategory?.subCategoryName || "No Subcategory"}</td>
                  <td className="p-3">{product.image || "No Image"}</td>
                  <td className="p-3">{product.sequence}</td>
                  <td className={`p-3 ${product.status === "active" ? "text-green-500" : "text-red-500"}`}>
                    {product.status}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button className="text-blue-500">
                      <Edit size={16} onClick ={()=>{navigate(`/contains/editpro/${product._id}`)}}/>
                    </button>
                    <button className="text-red-500" onClick={() => handleDeleteProduct(product._id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-3 text-center">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
