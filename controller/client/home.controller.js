const Product = require("../../model/products.model")
const CreateTree  = require("../../helper/tree")
const Category = require("../../model/category.model")

module.exports.index = async(req,res) => {
    const category = await Category.find({})
    const Tree = CreateTree(category)
    // console.log(Tree)
    res.render("client/pages/home/index.pug",{
        titlePage : "BK Messenger",
        tree:Tree
    });
}







