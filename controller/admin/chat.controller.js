const Chat = require("../../model/chat.model")
const User = require("../../model/account.model")
const upload = require("../../helper/uploadToCloud")

module.exports.chat =  async (req,res) => {
    const userId = res.locals.user._id;
    const name = res.locals.user.name;

    _io.once('connection', (socket) => {

        socket.on("CLIENT_SEND_MESSAGE",async (data) => {
            let images = [];
            for(const image of data.images){
                const link = await upload(image)
                images.push(link)
            } 
            
            console.log(images)

            const chat = new Chat({
                user_id:userId,
                content:data.content,
                images: images
            })

            await chat.save()

            _io.emit("SEVER_RETURN_MESSAGE",{
                userId:userId,
                name:name,
                content:data.content,
                images:images
            }) 
        })

        socket.on("CLIENT_SEND_TYPING",async (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING",{
                userId:userId,
                name:name,
                type:type
            })
        })
    }); 

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

