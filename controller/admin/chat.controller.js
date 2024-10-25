const Chat = require("../../model/chat.model")
const User = require("../../model/account.model")
const chatSocket = require("../../socket/admin/chat.socket")
const addFriend = require("../../socket/admin/friend.socket")
const upload = require("../../helper/uploadToCloud")

module.exports.chat =  async (req,res) => {
    
    chatSocket(res);

    const messages = await Chat.find({
        deleted:false
    })

    for(const message of messages){ 
        const user = await User.findOne({_id:message.user_id})
        message.name = user.name
    }     

    res.render("admin/pages/auth/chat.pug",{
        pageTitle:"Chat",
        messages:messages,
    })
}

module.exports.index = async (req,res) => {
    const myID = res.locals.user.id

    const roomID = req.params.roomChatId


    _io.once('connection', (socket) => {

        socket.on("USER_SEND_MESSAGE",async (data) => {

            let images = [];
            for(const image of data.images){
                const link = await upload(image)
                images.push(link)
            } 

            const chat = new Chat({
                user_id:myID,
                content:data.content,
                images:images,
                room_chat_id:roomID
            })

            await chat.save()

            _io.emit("RETURN_MESSAGE",{
                userId:myID,
                name:res.locals.user.name,
                image:res.locals.user.image,
                content:data.content,
                images:images
            }) 
        })

        socket.on("USER_SEND_TYPING",async (type) => {
            
            socket.broadcast.emit("RETURN_TYPING",{
                userId:myID,
                name:res.locals.user.name,
                type:type
            })
        })

    }); 
    
    const messages = await Chat.find({
        deleted:false,
        room_chat_id:roomID
    })
    
    for(const message of messages){ 
        const user = await User.findOne({_id:message.user_id}).select("name image")
        message.user = user
    }     

    res.render("admin/pages/auth/dashboardChat.pug",{
        pageTitle:"BK message",
        active:"dashboard",
        messages:messages
    })
}

module.exports.friend = async (req,res) => {

    const id = res.locals.user._id
    const myUser = await User.findOne({
        _id:id
    }).select("-password")

    const acceptFriend = myUser.acceptFriend
    
    let acceptFriendToRender = []
    
    for (const id of acceptFriend) {
        const user = await User.findOne({_id:id}).select("name _id image")
        acceptFriendToRender.push(user)
    }

    const friendList = myUser.friendList;

    let friendListToRender = []

    for(const user of friendList){
        const friend = await User.findOne({_id:user.id}).select("name course _id studentID image statusOnline")
        friend.roomID = user.roomID
        friendListToRender.push(friend)
    }

    addFriend(res)

    res.render("admin/pages/auth/friendChat.pug",{
        pageTitle:"BK message",
        active:"friend",
        acceptFriend:acceptFriendToRender,
        friendList:friendListToRender
    })
}

module.exports.findFriend = async(req,res) => {
    const id = res.locals.user._id
    
    const myUser = await User.findOne(
        {_id:id}
    ).select("-password")


    const user  = await User.find(
        {   
            _id: {
                $ne:id
            },
            status:"active",
            deleted:false,
            studentID:{$exists: true}
        },
    ).select("name course _id studentID image")

    addFriend(res)

    // console.log(user)

    await User.updateMany(
        {},
        {
            friendList:[],
            requestFriend:[],
            acceptFriend:[],
        }
    )

    res.render("admin/pages/auth/findFriend.pug",{
        pageTitle:"BK message",
        active:"find friend",
        users:user,
        myUser:myUser
    })
}

module.exports.logout = async (req,res) => {

    await User.updateOne(
        {token:req.cookies.token},
        {statusOnline:"offline"}
    )

    res.clearCookie("token")
    res.redirect("/")
}

