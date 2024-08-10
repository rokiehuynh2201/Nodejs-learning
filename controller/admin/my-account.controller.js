const Account = require("../../model/account.model")

module.exports.index =  (req,res) => {
    res.render("admin/pages/my-account/index.pug",{
        pageTitle:"Thông tin cá nhân"
    })
}

module.exports.edit = async(req,res) => {
    res.render("admin/pages/my-account/edit.pug",{
        pageTitle:"Chỉnh sửa thông tin cá nhân",
    })
}

module.exports.editPatch = async(req,res) => {
    const id = res.locals.user._id
    await Account.updateOne(
        {_id:id},
        req.body
    )
   res.redirect("/admin/my-account")
}