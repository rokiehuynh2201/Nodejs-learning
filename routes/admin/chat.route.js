const express = require("express")
const router  = express.Router()
const controller = require("../../controller/admin/chat.controller")

router.get("/",controller.chat)

router.get("/dashboard/:roomChatId",controller.index)

router.get("/friend",controller.friend)

router.get("/find-friend",controller.findFriend)

router.get("/logout",controller.logout)

module.exports = router;
