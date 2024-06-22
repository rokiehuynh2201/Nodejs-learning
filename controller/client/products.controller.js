const Product = require("../../model/products.model");

module.exports.index = async (req,res) => {
   const products = await Product.find({})
   
   res.render("admin/pages/products/index.pug",{
      titlePage : "Trang sản phẩm",
      products : products
   }) 
}

