const User = require("../../model/account.model")
const roomChat = require("../../model/room-chat.model")

module.exports = (res) =>{

    _io.once('connection', (socket) => {

        socket.on("USER_ADD_FRIEND",async(id) => {
            const friend_ID = id
            const myID = res.locals.user.id
           
            // Add friend_ID into request friend myID
            const exsitAinB = await User.find({
                _id:myID,
                requestFriend:friend_ID,
            })
            if(exsitAinB.length == 0)
            {
                await User.updateOne(
                    {
                        _id:myID,
                    },
                    {
                        $push:{requestFriend:friend_ID}
                    }
                )
            }
            else{
                console.log("Already in request friend")
            }
           
            // Add myid into accept friend of friend_id
            const existBinA = await User.find({
                _id:friend_ID,
                acceptFriend:myID,
            })

            if(existBinA.length == 0)
            {
                await User.updateOne(
                    {
                        _id:friend_ID,
                    },
                    {
                        $push:{acceptFriend:myID}
                    }
                )
            }
            else{
                console.log("Already in accept friend")
            }
            
            socket.emit("SEVER_RETURN_ADD_FRIEND")
        
            const myUser = await User.findOne(
                {_id:myID}
            ).select("name image id")
            
            
            socket.broadcast.emit("NOTIFICATION_ADD_FRIEND",{
                id:myID,
                friend_ID:friend_ID,
                myUser:myUser
            })
        })


        socket.on("USER_CANCEL_REQUEST_FRIEND",async(id) =>{
            const friend_ID = id
            const myID = res.locals.user.id
        
            const exsitAinB = await User.find({
                _id:myID,
                requestFriend:friend_ID,
            })
            
            if(exsitAinB.length == 1)
            {
                await User.updateOne(
                    {
                        _id:myID,
                    },
                    {
                        $pull:{requestFriend:friend_ID}
                    }
                )
            }
            else{
                console.log("Dont have in request friend")
            }
           
            
            const existBinA = await User.find({
                _id:friend_ID,
                acceptFriend:myID,
            })

            if(existBinA.length == 1)
            {
                await User.updateOne(
                    {
                        _id:friend_ID,
                    },
                    {
                        $pull:{acceptFriend:myID}
                    }
                )
            }
            else{
                console.log("Dont have in accept friend")
            }
            
            socket.emit("SEVER_CANCEL_REQUEST_FRIEND")

            socket.broadcast.emit("SEVER_RETURN_USER_CANCEL_FRIEND",{
                myID:myID,
                friend_ID:friend_ID
            })
        })
        

        socket.on("CLIENT_REFUSE_FRIEND",async (id) => {
            const friend_ID = id
            const myID     = res.locals.user.id

            const myUser = await User.findOne({_id:myID})
            console.log(myUser)
            const myFriend = await User.findOne({_id:friend_ID})
            console.log(myFriend)

            const exsitAinB = await User.find({
                _id:myID,
                acceptFriend:friend_ID,
            })

            if(exsitAinB.length == 1)
            {
                await User.updateOne(
                    {
                        _id:myID,
                    },
                    {
                        $pull:{acceptFriend:friend_ID}
                    }
                )
            }
            else{
                console.log("Dont have in request friend")
            }
           
            // Add myid into accept friend of friend_id
            const existBinA = await User.find({
                _id:friend_ID,
                requestFriend:myID,
            })

            if(existBinA.length == 1)
            {
                await User.updateOne(
                    {
                        _id:friend_ID,
                    },
                    {
                        $pull:{requestFriend:myID}
                    }
                )
            }
            else{
                console.log("Dont have in accept friend")
            }
        })


        socket.on("CLIENT_ACCEPT_FRIEND",async(id) => {
            const friend_ID = id
            const myID      = res.locals.user.id
            
            const exsitAinB = await User.find({
                _id:myID,
                acceptFriend:friend_ID,
            })
            
            const existBinA = await User.find({
                _id:friend_ID,
                requestFriend:myID,
            })
            
            let room = ""
            if(exsitAinB.length == 1 && existBinA.length == 1){
                const dataRoom = {
                    typeRoom:"friend",
                    users:[
                        {
                            user_id:myID,
                            role:"superAdmin"
                        },
                        {
                            user_id:friend_ID,
                            role:"superAdmin"
                        }
                    ]
                }
                room = new roomChat(dataRoom)
                await room.save()
            }




            
            if(exsitAinB.length == 1)
            {
                await User.updateOne(
                    {
                        _id:myID,
                    },
                    {
                        $push: {
                            friendList:{
                                id:friend_ID,
                                roomID:room.id,
                            }
                        },
                        $pull:{acceptFriend:friend_ID}
                    }
                )
            }
            else{
                console.log("Dont have in request friend")
                return
            }
           
            // Add myid into accept friend of friend_id
            

            if(existBinA.length == 1)
            {
                await User.updateOne(
                    {
                        _id:friend_ID,
                    },
                    {
                        $push: {
                            friendList:{
                                id:myID,
                                roomID:room.id,
                            }
                        },
                        $pull:{requestFriend:myID}
                    }
                )
            }
            else{
                console.log("Dont have in accept friend")
                return
            }
           
        })
    })
}

