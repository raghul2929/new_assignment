import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Category from "./Category";
import Subcategory from "./Subcategory";
import Products from "./Products";
import AddCategory from "./Addcategory";
import Addsubcategory from "./Addsubcategory";
import AddProduct from "./Addproduct";
import EditCategory from "./Editcategory";
import EditProduct from "./Editproduct";
import EditSubcategory from "./Editsubcategory";






function Contains() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar - Fixed at the top, takes full width */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Sidebar + Content Layout */}
      <div className="flex flex-1 mt-[20px]">
        {/* Sidebar - Fixed width */}
        <div className="w-60 bg-gray-100 shadow-md h-screen fixed left-0 top-[60px]">
          <Sidebar />
        </div>

        {/* Main Content - Fills remaining space */}
        <div className="flex-grow  p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="subcategory" element={<Subcategory />} />
            <Route path="products" element={<Products />} />
            <Route path="addcat" element={<AddCategory/>}/>
            <Route path="edit/:id" element={<EditCategory />} />
            <Route path="/addsub" element={<Addsubcategory/>}/>
            <Route path="/addpro" element={<AddProduct/>}/>
            <Route path="editpro/:id" element={<EditProduct />} />
            <Route path="editsub/:id" element={<EditSubcategory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Contains;
