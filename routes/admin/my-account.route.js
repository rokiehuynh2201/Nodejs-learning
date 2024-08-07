const router = require("express").Router()
const controller = require("../../controller/admin/my-account.controller")
const multer  = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/upload.middleware")
router.get("/",controller.index)

router.get("/edit",
    controller.edit)

router.patch("/edit",
    upload.single("uploaded_file"),
    uploadCloud.uploadCloud,
    controller.editPatch)

module.exports= router