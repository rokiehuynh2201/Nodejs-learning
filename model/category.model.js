const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    title:String,
    parent:{
        type:String,
        default:""
    },
    desc:String,
    position:Number,
    status:String,
    image:String,
    slug:{
        type:String,
        slug:"title",
        unique:true
    },
    deleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:Date
},{
    timestamps:true
})
const Category = mongoose.model("Category",CategorySchema,"categories")

module.exports = Category




