// middleware/auth.js
const jwt = require("jsonwebtoken");
const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

// Authentication middleware
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Set up product routes
const router = express.Router();

// Add a new product (protected route)
router.post("/", auth, upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;

  // Ensure the image is uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }

  // Create a new product and save to the database
  const product = new Product({
    name,
    price,
    description,
    image: req.file.path,  // Save the image path (relative path)
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;  
