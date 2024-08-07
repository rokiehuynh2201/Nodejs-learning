const User = require("../model/account.model")
const Role = require("../model/role.model")

module.exports.requireAuth  = async (req,res,next) => {
    if(!req.cookies.token){
        res.redirect("/admin/auth/login")
    }
    else{
        const user = await User.findOne({token:req.cookies.token}).select("-password")
        if(!user){
            res.redirect("/admin/auth/login")
        }
        else{
            res.locals.user = user
            const role = await Role.findOne({_id:user.role.id})
            res.locals.role = role.permissions
            next() 
        }
    }
}