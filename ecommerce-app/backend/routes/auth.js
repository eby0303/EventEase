// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Product = require('../models/Product'); 
const User = require('../models/User'); 
const Event = require('../models/Event');
const router = express.Router();

// Multer setup for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage });

// Registration route
router.post('/register', async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Include userId along with the token and role in the response
    return res.json({ token, role: user.role, userId: user._id });  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Add product route
router.post('/addproduct', upload.single('image'), async (req, res) => {
  const { name, price, description, category, location, capacity, amenities, cuisineType, menuOptions, dietaryOptions, serviceType, style, availableItems, customizationOptions } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : ''; // Relative image path for frontend
  

  const newProduct = new Product({
    name,
    price,
    description,
    category,
    image: imagePath,
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

// Get all products
router.get('/getproduct', async (req, res) => {
  try {
    const products = await Product.find();
    const categorizedProducts = {
      halls: products.filter(product => product.category === 'Hall'),
      decors: products.filter(product => product.category === 'Decor'),
      caterings: products.filter(product => product.category === 'Catering'),
    };
    res.json(categorizedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by id
router.get('/getproduct/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove product by id
router.delete('/removeproduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing product', error });
  }
});

// Create a new event
router.post('/createEvent', async (req, res) => {
  const { name, userId } = req.body;

  // Validate that both name and userId are provided
  if (!name || !userId) {
    return res.status(400).json({ message: 'Name and userId are required' });
  }

  try {
    const newEvent = new Event({ name, userId, products: [] });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

// Get events for a specific user
router.get('/getEvents/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Event.find({ userId })
      .populate('products') // Populate to get product details
      .exec();

    if (!events.length) {
      return res.status(404).json({ message: 'No events found for this user' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// Add product to an event
router.post('/addProductToEvent', async (req, res) => {
  const { eventId, productId } = req.body;

  try {
    // Find the event by ID and add the product to the products array
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { products: productId } }, // $addToSet ensures no duplicates
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error adding product to event:', error);
    res.status(500).json({ message: 'Error adding product to event', error: error.message });
  }
});

// Remove product from an event
router.delete('/deleteproduct', async (req, res) => {
  const { eventId, productId } = req.body;

  try {
    // Find the event by ID and remove the product from the products array
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { products: productId } }, 
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error removing product from event:', error);
    res.status(500).json({ message: 'Error removing product from event', error: error.message });
  }
});

// Remove an event
router.delete('/removeEvent', async (req, res) => {
  const { eventId } = req.body;

  try {
    // Remove the event from the database
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event removed successfully' });
  } catch (error) {
    console.error('Error removing event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
