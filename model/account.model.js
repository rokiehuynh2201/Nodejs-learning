const mongoose = require("mongoose")
const generate = require("../helper/helper.js")

const roleSchema = new mongoose.Schema({
    id:{
        type:String,
        default:""
    },
    title:{
        type:String,
        default:""
    }
})

const AccoutSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    token:{
        type:String,
        default:generate(20)
    },
    phone:String,
    image:String,
    status:String,
    role:{
        type:roleSchema,
        default: () => ({ id: "", title: "" })
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date,
},{
    timestamps:true
})

const Accout = mongoose.model("Account",AccoutSchema,"account")
module.exports = Accout
