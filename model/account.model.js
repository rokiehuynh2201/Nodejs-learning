const mongoose = require("mongoose")
const generate = require("../helper/helper.js")

const AccoutSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    token:{
        type:String,
        default:generate(20)
    },
    phone:String,
    studentID:String,
    image:String,
    status:String,
    notification:Array,
    requestFriend:Array,
    acceptFriend:Array,
    course:Array,
    statusOnline:String,
    friendList:[
        {
            id:String,
            roomID:String
        }
    ],
    role:{
        id:{
            type:String,
            default:""
        },
        title:{
            type:String,
            default:""
        }
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
