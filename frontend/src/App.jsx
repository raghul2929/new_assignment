import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import Dashboard from './component/Dashboard.jsx';
import ForgotPassword from './component/Forgotpassword.jsx';
import Navbar from './component/Navbar.jsx';
import Sidebar from './component/Sidebar.jsx';
import Contains from './component/Contains.jsx';
import SubcategoryTable from './component/Subcategory.jsx';
// import AddSubCategory from  './component/Addsubcategory.jsx'
import { ToastContainer } from 'react-toastify'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/contains/*" element={<Contains />} />




        {/* <Route path="/contain/**" element={<Contains/>}/> */}
      </Routes>
      <ToastContainer />  
    </Router>
   
  );
}

export default App;
