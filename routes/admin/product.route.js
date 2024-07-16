
const express = require("express")
const router  = express.Router()
const controller = require("../../controller/admin/product.controller")

router.get("/",controller.index)

router.get("/change-status/:status/:id",controller.changeStatus)

router.patch("/change-status-multi",controller.changeMultiStatus)

router.patch("/delete-product/:id",controller.deleteProduct)

module.exports = router;