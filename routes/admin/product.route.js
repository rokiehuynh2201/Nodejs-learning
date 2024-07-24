
const express = require("express")
const router  = express.Router()
const controller = require("../../controller/admin/product.controller")
const multer  = require('multer')
const upload = require("../../helper/storageMulter")


router.get("/",controller.index)

router.get("/create",controller.create)

router.post("/create",upload.single("uploaded_file"),controller.createProduct)

router.patch("/change-status/:status/:id",controller.changeStatus)

router.patch("/change-status-multi",controller.changeMultiStatus)

router.patch("/delete-product/:id",controller.deleteProduct)

module.exports = router;