const mongoose = require("mongoose");
const {Category} = require('./category');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  Ingredients:{
    type: String
  },
  Unit:{
    type: String
  },
  ShelfLife:{
    type: String
  },
  ManufacturerDetails:{
    type: String
  },
  MarketedBy:{
    type: String
  },
  FSSAILicense:{
    type: Number
  },
  country:{
    type: String
  },
  richDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  brand: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  countInStock: {
    type: Number,
    min: 0,
    max: 1000
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;