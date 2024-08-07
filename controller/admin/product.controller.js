const Product = require("../../model/products.model")
const CreateTree  = require("../../helper/tree")
const Category = require("../../model/category.model")

module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        }, {
            name: "Giá trên 100",
            status: "100",
            class: ""
        }, {
            name: "Giá dưới 20",
            status: "20",
            class: ""
        }
    ]
    let find = {
        deleted: false
    }
    if (req.query.price) {
        find.price = Number(req.query.price) == 100 ? { $gt: Number(req.query.price) } : { $lt: Number(req.query.price) }
        let idx = filterStatus.findIndex(item => item.status === req.query.price)
        filterStatus[idx].class = "active"
    } else {
        filterStatus[0].class = "active"
    }

    let keyword = ""
    if (req.query.keyword) {
        keyword = req.query.keyword
        find.title = new RegExp(keyword, "i")
    }

    let products = await Product.find(find).lean()

    let paging = {
        productInPage: 4,
        currentPage: req.query.page ? Number(req.query.page) : 1,
    }
    paging.totalPage = Math.ceil(products.length / paging.productInPage)

    // Sort
    let SortObject = {}
    if(req.query.sortKey && req.query.sortValue)
    {
        
        SortObject[req.query.sortKey] = req.query.sortValue
    }
    // End sort

    products = await Product
    .find(find)
    .limit(paging.productInPage).skip((paging.currentPage - 1) * paging.productInPage)
    .sort(SortObject)
    .lean()
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: keyword,
        paging: paging
    })
}

module.exports.changeStatus = async (req, res) => {
    let id = req.params.id
    let state = req.params.status
    products = await Product.updateOne(
        { _id: id },
        {
            status: state == "active" ? "inactive" : "active"
        }
    )
    req.flash('info', 'Thay đổi trạng thái hoạt động thành công');
    res.redirect("back")
}


module.exports.changeMultiStatus = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ");
    console.log(type, ids)
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        case "delete":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true })
            break;
        case "change-position":
            for(let item of ids){
                const [id,position] = item.split("-")
                await Product.updateOne(
                    {_id:id},
                    {
                        position:parseInt(position)
                    }
                )
            }   
            break;
        default:
            break;
    }
    res.redirect("back")
}

module.exports.deleteProduct = async (req, res) => {
    let id = req.params.id
    await Product.updateOne(
        { _id: id },
        {
            deleted: true
        }
    )
    res.redirect("back")
}

module.exports.create = (req,res) =>{
    res.render("admin/pages/products/create-product",{
        pageTitle: "Thêm sản phẩm mới"
    })
}

module.exports.createProduct = async (req,res) =>{
    try {
        let data = req.body
        data.id  = await Product.countDocuments()
        const product =  new Product({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.desc,
            category: data.category,
            image: data.image,
            rating:{
                rate:parseFloat(data.rating),
                count:parseInt(data.quantity)
            },
            status:"active",
            des:"abc",
            deleted:false,
            position:data.id+1
        })
        const result = await product.save()
    } catch (error) {
        console.log(error)
    }
    finally{    
        res.redirect("/admin/product")
    }
}

module.exports.edit = async(req,res) => {
    const record = await Product.findOne({_id:req.params.id})
    res.render("admin/pages/products/edit.pug",{
        pageTitle:"Trang chỉnh sửa",
        record:record
    })
}

module.exports.editProduct = async(req,res) => {
    const id = req.params.id
    req.body.image= `/admin/uploads/${req.file.filename}`
    await Product.updateOne(
        {_id:id},
        req.body
    )
    res.redirect("/admin/product")
}

module.exports.detailProduct = async(req,res) => {
    const record = await Product.findOne({_id:req.params.id})
    console.log(record)
    res.render("admin/pages/products/detail.pug",{
        pageTitle:"Trang chi tiết",
        record:record
    })
}

