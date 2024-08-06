const mongoose = require("mongoose")

const Role = new mongoose.Schema({
    title:String,
    des:String,
    permissions:{
        type:Array,
        default:[]
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt : Date
},{
    timestamps:true
})


const role = mongoose.model("Role",Role,"role")

module.exports = role