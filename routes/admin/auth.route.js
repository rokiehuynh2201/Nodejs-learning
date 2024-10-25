const express = require("express")
const router  = express.Router()
const controller = require("../../controller/admin/auth.controller")

router.get("/login",controller.login)

router.get("/dashboard",controller.test)

router.get("/product",controller.test1)

router.get("/create-product",controller.test2)

router.post("/login",controller.loginPost)

router.get("/logout",controller.logout)

module.exports = router
