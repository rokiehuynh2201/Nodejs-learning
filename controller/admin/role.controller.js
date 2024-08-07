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

    let rows = [
        {
            name:"Danh mục sản phẩm",
            permission:[
                {
                    name:"Xem",
                    value:"category_view"
                },
                {
                    name:"Thêm mới ",
                    value:"category_create"
                },
                {
                    name:"Chỉnh sửa",
                    value:"category_edit"
                },
                {
                    name:"Xóa",
                    value:"category_delete"
                }
            ]
        },
        {
            name:"Danh sách sản phẩm",
            permission:[
                {
                    name:"Xem",
                    value:"product_view"
                },
                {
                    name:"Thêm mới ",
                    value:"product_create"
                },
                {
                    name:"Chỉnh sửa",
                    value:"product_edit"
                },
                {
                    name:"Xóa",
                    value:"product_delete"
                }
            ]
        }
    ]



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
    res.redirect("/admin/roles/permissions")
}