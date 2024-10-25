const md5 = require("md5")
const User = require("../../model/account.model")
const Product = require("../../model/products.model")
const buttonFilterStatus = require("../../helper/button-status")
const Pagination = require("../../helper/pagination")
const paginate = require("../../helper/pagination")


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
    await User.updateOne(
        {token:user.token},
        {statusOnline:"online"}
    )
    res.cookie("token",user.token)
    res.redirect("/admin/chat/find-friend")
}

module.exports.logout = async(req,res) => {
    res.clearCookie("token")
    res.redirect("/admin/auth/login")
}

module.exports.test = (req,res) => {
    res.render("admin/pages/auth/test.pug",{
        pageTitle:"Thử nghiệm",
        activeSideBar:req.originalUrl
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

    let pagination = {}
    if(req.query.limit){
        pagination.limit = Number(req.query.limit)
    }
    else{
        pagination.limit = 5
    }

    if(req.query.page){
        pagination.currPage   = Number(req.query.page)
    }
    else{
        pagination.currPage   = 1
    }

    let numProduct = await Product.countDocuments(find)
    numProduct = Number(numProduct)
    let numPage = Math.ceil(numProduct/pagination.limit)
    pagination = {...pagination,...Pagination(pagination.currPage,numPage)} 

    // if(pagination.current > Number(pagination.items.slice(-1)[0]) || pagination.items.slice(-1)[0] === "…"){
    //     pagination.current = 1
    //     pagination.currPage   = 1
    // }
    // console.log(pagination)

    const product = await Product.find(find)
                                .limit(pagination.limit)
                                .skip((pagination.current - 1)*pagination.limit)   

    res.render("admin/pages/auth/test1.pug",{
        pageTitle:"Product",
        product:product,
        buttonStatus:buttonFilterStatus,
        activeSideBar:req.originalUrl,
        pagination:pagination
    })
}

module.exports.test2 = (req,res) => {
    res.render("admin/pages/auth/test2.pug",{
        pageTitle:"Create Product",
        activeSideBar:req.originalUrl
    })
}