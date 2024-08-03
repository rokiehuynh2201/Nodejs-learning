const CreateTree  = require("../../helper/tree")
const Category = require("../../model/category.model")

module.exports.index =  async (req,res) => {
    let find = {
        deleted:false
    }

    const category = await Category.find(find)
    res.render("admin/pages/category/index.pug",{
        category:category,
        pageTitle:"Tạo danh mục sản phẩm"
    })
}

module.exports.create = async(req,res) => {
    const category = await Category.find({})
    const Tree = CreateTree(category)
    // console.log(category)
    console.log(Tree)

    res.render("admin/pages/category/create.pug",{
        category:Tree,
        pageTitle: "Tạo danh mục"
    })
}

module.exports.createCategory = async (req,res) => {
    const position = await Category.countDocuments()
    req.body.position = position
    const category = new Category(req.body)
    await category.save()
    res.redirect("/admin/category-product") 
}

