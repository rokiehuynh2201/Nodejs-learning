const Role = require("../../model/role.model")

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
        records:records
    })
}