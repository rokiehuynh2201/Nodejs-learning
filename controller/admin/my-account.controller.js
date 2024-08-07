const Accout = require("../../model/account.model")

module.exports.index =  (req,res) => {
    res.render("admin/pages/my-account/index.pug",{
        pageTitle:"Thông tin cá nhân"
    })
}

module.exports.edit = async(req,res) => {
    res.render("admin/pages/my-account/edit.pug",{
        pageTitle:"Chỉnh sửa thông tin cá nhân",
        data: res.locals.user
    })
}

module.exports.editPatch = async(req,res) => {
    console.log(req.body)
    await Accout.updateOne(
        {id:res.locals.user._id},
        req.body
    )
   res.redirect("/admin/my-account")
}