const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({ 
  "title": String,
  "price": Number,
  "description": String,
  "category": String,
  "image": String,
  "rating": {
    "rate": Number,
    "count": Number
  },
  "status":String,
  "deleted":Boolean
});

const Product = mongoose.model("Product",productScheme,"products")

module.exports = Product


