const router = require("express").Router()
const controller = require("../../controller/admin/account.controller")
const multer  = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/upload.middleware")

router.get("/",controller.index)

router.get("/create",controller.create)

router.post("/create",
    upload.single("uploaded_file"),
    uploadCloud.uploadCloud,
    controller.createPost
)

router.get("/edit/:id",controller.edit)

router.patch("/edit/:id",
    upload.single("uploaded_file"),
    uploadCloud.uploadCloud,
    controller.editPatch
)

module.exports = router

