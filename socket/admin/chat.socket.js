const upload = require("../../helper/uploadToCloud")
const Chat   = require("../../model/chat.model")
module.exports = (res) => {
    _io.once('connection', (socket) => {
        console.log(1)
        
        const userId = res.locals.user._id;
        const name = res.locals.user.name;
        
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
}

