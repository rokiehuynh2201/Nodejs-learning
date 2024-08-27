const md5 = require("md5")
const User = require("../../model/account.model")
const Product = require("../../model/products.model")
const buttonFilterStatus = require("../../helper/button-status")

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
    // if(md5(password) != user.password){
    //     req.flash("error","Sai mật khẩu")
    //     res.redirect("back")
    //     return
    // }
    // if(user.status == "inactive"){
    //     req.flash("error","Tài khoản đã bị khóa")
    //     res.redirect("back")
    //     return
    // }

    res.cookie("token",user.token)
    res.redirect("/admin/auth/test")
}

module.exports.logout = async(req,res) => {
    res.clearCookie("token")
    res.redirect("/admin/auth/login")
}


module.exports.test = (req,res) => {
    res.render("admin/pages/auth/test.pug",{
        pageTitle:"Thử nghiệm"
    })
}

module.exports.test1 = async (req,res) => {
    let find = {
        deleted: false
    }
    buttonFilterStatus.forEach(button => button.class="")
    if(req.query.status){
        find.status = req.query.status
        let idx = buttonFilterStatus.findIndex(item => item.status === req.query.status)
        buttonFilterStatus[idx].class = "common"
    }
    else{
        buttonFilterStatus[0].class = "common"
    }

    let keyword = ""
    if (req.query.keyword) {
        keyword = req.query.keyword
        find.title = new RegExp(keyword, "i")
    }

    const product = await Product.find(find)
    
    res.render("admin/pages/auth/test1.pug",{
        pageTitle:"Product",
        product:product,
        buttonStatus:buttonFilterStatus
    })
}

