const Product = require("../../model/products.model");

module.exports.index = async (req,res) => {
    let filterStatus = [
        {
           name:"Tất cả",
           status:"",
           class:""
        },{
           name:"Giá trên 100",
           status:"100",
           class:""
        },{
           name:"Giá dưới 20",
           status:"20",
           class:""
        }
    ]
    let find ={
        deleted:false
    }
    if(req.query.price){
        find.price = Number(req.query.price) == 100 ? { $gt: Number(req.query.price)} : { $lt: Number(req.query.price)}
        let idx = filterStatus.findIndex(item => item.status === req.query.price)
        filterStatus[idx].class="active"
    }else{
        filterStatus[0].class="active"
    }

    let keyword = ""
    if(req.query.keyword){
        keyword = req.query.keyword
        find.title = new RegExp(keyword,"i")
    }
    
    let products = await Product.find(find).lean()
    
    let paging = {
        productInPage: 4,
        currentPage : req.query.page ? Number(req.query.page) : 1,
    }
    paging.totalPage = Math.ceil(products.length/paging.productInPage)

    products = await Product.find(find).limit(paging.productInPage).skip((paging.currentPage-1)*paging.productInPage).lean()
    res.render("admin/pages/products/index.pug",{
        pageTitle: "Trang sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword:keyword,
        paging:paging
    })
}

module.exports.changeStatus = async (req,res) => {
    let id = req.params.id
    let state = req.params.status   
    products = await Product.updateOne(
        {_id:id},
        {
            status: state == "active" ? "inactive":"active"
        }
    )
    await Product.updateMany(
        {},
        {deleted:false}
    )
    res.redirect("back")
}


module.exports.changeMultiStatus = async (req,res) =>{
    const type = req.body.type
    const ids =  req.body.ids.split(", ");
    console.log(type,ids)
    switch (type) {
        case "active":
            await Product.updateMany({_id:{$in:ids}},{status:"active"})
            break;
        case "inactive":
            await Product.updateMany({_id:{$in:ids}},{status:"inactive"})
            break;
        case "delete":
            await Product.updateMany({_id:{$in:ids}},{deleted:true})
        default:
            break;
    }
    res.redirect("back")
}

module.exports.deleteProduct = async (req,res) =>{
    let id = req.params.id
    await Product.updateOne(
        {_id:id},
        {
            deleted:true
        }
    )
    res.redirect("back")
}