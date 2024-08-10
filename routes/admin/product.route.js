
const express = require("express")
const router  = express.Router()
const controller = require("../../controller/admin/product.controller")
const multer  = require('multer')
const upload = multer()
const validate = require("../../validate/admin/product.validate")
const uploadCloud = require("../../middlewares/upload.middleware")

router.use(express.json())
router.get("/",controller.index)

router.get("/create",controller.create)

router.post("/create",
    upload.single("uploaded_file"),
    uploadCloud.uploadCloud,
    validate.createPost,
    controller.createProduct)

router.patch("/change-status/:status/:id",controller.changeStatus)

router.patch("/change-status",controller.changeStatus)

router.patch("/change-status-multi",controller.changeMultiStatus)

router.patch("/delete-product/:id",controller.deleteProduct)

router.get("/edit/:id",controller.edit)

router.patch("/edit/:id",
            upload.single("uploaded_file"),
            uploadCloud.uploadCloud,
            controller.editProduct)

router.get("/detail/:id",controller.detailProduct)

module.exports = router;