const Product = require("../../model/products.model")
const CreateTree  = require("../../helper/tree")
const Category = require("../../model/category.model")
const Account = require("../../model/account.model")

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

    const productNum = await Product.find(find).count()
    let paging = {
        productInPage: 4,
        currentPage: req.query.page ? Number(req.query.page) : 1,
    }
    paging.totalPage = Math.ceil(productNum / paging.productInPage)

    // Sort
    let SortObject = {
        position : "desc"
    }
    if(req.query.sortKey && req.query.sortValue)
    {
        SortObject[req.query.sortKey] = req.query.sortValue
    }
    // End sort

    const products = await Product.find(find)
        .limit(paging.productInPage).skip((paging.currentPage - 1) * paging.productInPage)
        .sort(SortObject)

    for(const product of products){
        const user = await Account.findOne({_id:product.createdBy.account_id})
        if(user){
            product.fullName = user.name
        }
        const updateBy = product.updateBy.slice(-1)[0]
        // console.log(updateBy)
        if(updateBy){
            const userUpdate = await Account.findOne({_id:updateBy.account_id})
            product.userUpdate = userUpdate.name
        }
    }

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: keyword,
        paging: paging
    })
}

// Ok
module.exports.changeStatus = async (req, res) => {
    const {id,status} = req.body
    const updateBy = {
        account_id:res.locals.user._id,
        updateAt: new Date()
    }
    products = await Product.updateOne(
        { _id: id },
        {
            status: status == "active" ? "inactive" : "active",
            $push: {updateBy:updateBy}
        }
    )
    res.json({
        status:200,
        message:"Ok"
    })
}

module.exports.changeMultiStatus = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ");
    const updateBy = {
        account_id:res.locals.user._id,
        updateAt: new Date()
    }
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active", $push: {updateBy:updateBy} })
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive", $push: {updateBy:updateBy} })
            break;
        case "delete":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, $push: {updateBy:updateBy} })
            break;
        case "change-position":
            for(let item of ids){
                const [id,position] = item.split("-")
                await Product.updateOne(
                    {_id:id},
                    {
                        position:parseInt(position),
                        $push: {updateBy:updateBy}
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
        data.createdBy = {
            account_id:res.locals.user._id
        }
        console.log(data)
        const product =  new Product({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.desc,
            category: data.category,
            image: data.image,
            rating:{
                rate: 1.1,
                count:parseInt(data.quantity)
            },
            status:"active",
            des:"abc",
            deleted:false,
            position:data.id+1,
            createdBy:data.createdBy
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
    console.log(req.body)
    
    const updateBy = {
        account_id:res.locals.user._id,
        updateAt: new Date()
    }

    await Product.updateOne(
        {_id:id},
        {
            ...req.body,
            $push:{updateBy:updateBy}
        }
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


