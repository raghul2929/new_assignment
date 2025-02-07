const express = require('express');
const router = express.Router();
const Admin = require('../backend/models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ADMIN_CODE = '001';

// Admin Registration Route
router.post('/adminregister', async (req, res) => {
  try {
    const { Adminname, email, password } = req.body;

    if (!Adminname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const combinedName = `${ADMIN_CODE}${String(Adminname).trim()}`;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      Adminname: combinedName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully', admin: { Adminname: combinedName, email } });
  } catch (error) {
    console.error('Error in Admin Register:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Login Route
router.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful", admin: { adminId: admin._id, email } });
  } catch (error) {
    console.error("Error in Admin Login:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Admin Logout Route
router.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true, sameSite: "Strict" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in Admin Logout:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
