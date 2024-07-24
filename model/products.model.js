const mongoose = require("mongoose");

const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)   
const productScheme = new mongoose.Schema({
  "id": Number, 
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
  "deleted":Boolean,
  "position":Number,
  "slug":{
    type:String,
    slug:"title"
  }
},{
  timestamps:true
});

const Product = mongoose.model("Product",productScheme,"products")

module.exports = Product


