const Product = require("../../model/products.model");

module.exports.index = async(req,res) => {
    const product = await Product.find({})
    res.render("admin/pages/dashboard/index.pug")
}
