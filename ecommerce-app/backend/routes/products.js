// src/routes/products.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // Your Product model
const router = express.Router();

// Multer setup for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Add product route
router.post('/addproduct', upload.single('image'), async (req, res) => {
  const { name, price, description, category, location, capacity, amenities, cuisineType, menuOptions, dietaryOptions, serviceType, style, availableItems, customizationOptions } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Relative image path for frontend

  const newProduct = new Product({
    name,
    price,
    description,
    category,
    image: imagePath, // Save image path in the database
    location,
    capacity,
    amenities,
    cuisineType,
    menuOptions,
    dietaryOptions,
    serviceType,
    style,
    availableItems,
    customizationOptions,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});

// Get all products and categorize them
router.get('/getproduct', async (req, res) => {
  try {
    const products = await Product.find();
    const categorizedProducts = {
      halls: products.filter((p) => p.category === 'Hall'),
      decors: products.filter((p) => p.category === 'Decor'),
      caterings: products.filter((p) => p.category === 'Catering'),
    };
    res.json(categorizedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

module.exports = router;
