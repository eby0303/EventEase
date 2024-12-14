const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // Add path module to handle file paths

// Initialize dotenv
dotenv.config();

const app = express(); // Initialize the app here before using it
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to access backend from localhost:3000
}));
app.use(express.json());

// Serve static files (like product images) from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve files in 'uploads' directory

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => { // Use the PORT variable here
  console.log(`Server is running on port ${PORT}`);
});
