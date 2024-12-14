const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productsRouter = require('./routes/products'); // Make sure this line is present
const authRouter = require('./routes/auth'); // Ensure this line is present

// Use the auth routes
app.use('/api/auth', authRouter); // Ensure this line is present

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve the 'uploads' folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the products routes
app.use('/api', productsRouter); // Ensure this line is present

// MongoDB connection and server start
mongoose.connect('mongodb://localhost:27017/Ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
