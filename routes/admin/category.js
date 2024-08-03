
const express = require("express")
const router  = express.Router()
const controller = require("../../controller/admin/category.controller")
const multer  = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/upload.middleware")

router.get("/",controller.index)

router.get("/create",controller.create)

router.post("/create",
    upload.single("uploaded_file"),
    uploadCloud.uploadCloud,
    controller.createCategory)

module.exports = router;


