const mongoose = require("mongoose");

const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)   
const productScheme = new mongoose.Schema({
  id: Number, 
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number
  },
  des:{
    type:String,
    default:"abc"
  },
  status:String,
  deleted:Boolean,
  position:Number,
  slug:{
    type:String,
    slug:"title",
    unique: true
  },
  createdBy:{
    account_id:String,
    CreateAt:{
      type:Date,
      default:Date.now
    }
  },
  updateBy:[
    {
      account_id: String,
      updateAt: Date
    }
  ]
});

const Product = mongoose.model("Product",productScheme,"products")

module.exports = Product


