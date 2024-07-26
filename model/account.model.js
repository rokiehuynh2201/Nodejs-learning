const mongoose = require("mongoose")
const generate = require("../helper/helper.js")

const AccoutSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    token:{
        type:String,
        token:generate(20)
    },
    phone:String,
    avatar:String,
    status:String,
    role_id:String,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date,
},{
    timestamps:true
})

export default Accout = mongoose.model("Account",AccoutSchema,"account")