const md5 = require("md5")
const Account = require("../../model/account.model")
const Role    = require("../../model/role.model")


module.exports.index = async(req,res) => {
    let find = {
        deleted:false

    }

    const records = await Account.find(find).select("-password -token")
    
    res.render("admin/pages/account/index.pug",{
        pageTitle:"Trang tài khoản",
        records:records
    })
}

module.exports.create = async(req,res) => {
    let find = {
        deleted:false
    }
    const role = await Role.find(find)
    res.render("admin/pages/account/create.pug",{
        pageTitle:"Tạo tài khoản",
        role1:role
    })
}

module.exports.createPost = async(req,res) => {
    req.body.password = md5(req.body.password)
    req.body.role = {
        id:req.body.role,
    }
    const role = await Role.findOne({_id:req.body.role.id})
    req.body.role.title  = role.title
    const account = new Account(req.body)
    await account.save()
    res.redirect("/admin/account")
}

module.exports.edit = async(req,res) => {
    const id = req.params.id
    const record = await Account.findOne({_id:id}).select("-password")
    const role   = await Role.find()
    res.render("admin/pages/account/edit.pug",{
        pageTitle:"Cập nhật thông tin",
        data:record,
        role1:role
    })
}

module.exports.editPatch = async(req,res) => {
    const id = req.params.id
    req.body.role = {
        id:req.body.role,
    }
    const role = await Role.findOne({_id:req.body.role.id})
    req.body.role.title  = role.title
    await Account.updateOne(
        {_id:id},
        req.body
    )
    res.redirect("/admin/account")
}

