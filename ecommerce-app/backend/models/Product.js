// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true }, // Hall, Decor, Catering
  image: { type: String, required: true },    // Image field
  location: { type: String },                  // For halls
  capacity: { type: Number },                  // For halls
  amenities: { type: [String], default: [] },  // For halls
  cuisineType: { type: String },               // For catering
  menuOptions: { type: [String] },             // For catering
  dietaryOptions: { type: [String] },          // For catering
  serviceType: { type: String },                // For catering
  style: { type: String },                      // For decor
  availableItems: { type: [String] },          // For decor
  customizationOptions: { type: [String] },    // For decor
});

module.exports = mongoose.model("Product", productSchema);
