const md5 = require("md5")
const User = require("../../model/account.model")
module.exports.login =  async (req,res) => {
    res.render("admin/pages/auth/index.pug",{
        pageTitle:"Đăng nhập"
    })
}

module.exports.loginPost = async(req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
        req.flash("error","Email không tồn tại")
        res.redirect("back")
        return
    }
    if(md5(password) != user.password){
        req.flash("error","Sai mật khẩu")
        res.redirect("back")
        return
    }
    if(user.status == "inactive"){
        req.flash("error","Tài khoản đã bị khóa")
        res.redirect("back")
        return
    }

    res.cookie("token",user.token)
    res.redirect("/admin/dashboard")
}

module.exports.logout = async(req,res) => {
    res.clearCookie("token")
    res.redirect("/admin/auth/login")
}