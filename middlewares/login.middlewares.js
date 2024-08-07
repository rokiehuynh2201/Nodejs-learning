const User = require("../model/account.model")

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
            res.locals.role = user.role
            next() 
        }
    }
}