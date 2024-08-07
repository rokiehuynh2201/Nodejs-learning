const Role = require("../../model/role.model")
const rows = require("../../helper/constant")
module.exports.index = async (req,res) => {
    let find = {
        deleted : false
    }

    const roles = await Role.find(find)

    res.render("admin/pages/role/index.pug",{
        pageTitle: "Trang phân quyền",
        roles:roles
    })
}


module.exports.create = (req,res) => {
    res.render("admin/pages/role/create.pug")
}

module.exports.createPost = async(req,res) => {
    const record = new Role(req.body)
    await record.save() 
    res.redirect("/admin/roles")
}

module.exports.permissions = async (req,res) => {
    let find = {
        deleted:false
    }

    
    const records = await Role.find(find)
    res.render("admin/pages/role/permissions.pug",{
        pageTitle:"Trang phân quyền",
        records:records,
        rows:rows
    })
}

module.exports.permissionsPatch = async(req,res) => {

    const permissions = JSON.parse(req.body.permissions)
    for(item of permissions){
        await Role.updateOne(
            {_id:item.id},
            {permissions:item.permission}
        )
    }
    req.flash("success","Thay đổi thành công")
    res.redirect("/admin/roles/permissions")
}