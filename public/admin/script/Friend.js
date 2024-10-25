var socket = io();

// const cancelFriend = document.querySelector("")

const SeverAddFriend = (item) => {
    socket.on("SEVER_RETURN_ADD_FRIEND",() => {
        if(item){
            item.innerHTML = `
                <i class="fa-solid fa-check mr-1 d-none"></i>
                Requested
            `
            const toastAddFriend = document.querySelector("#toast-success")
            if(toastAddFriend){
                toastAddFriend.classList.remove("invisible")
                const toastCancelFriend = document.querySelector("#toast-danger")
                if(toastCancelFriend){
                    toastCancelFriend.classList.add("invisible")
                }
            }
            setTimeout(()=>{
                toastAddFriend.classList.add("invisible")
            },2000)
        }
    })
}


const SeverCancelRequestFriend = (item) => {
    socket.on("SEVER_CANCEL_REQUEST_FRIEND",() => {
        if(item){
            item.innerHTML = `
                Add friend
            `
            const toastCancelFriend = document.querySelector("#toast-danger")
            if(toastCancelFriend){
                toastCancelFriend.classList.remove("invisible")
                const buttonAdd = document.querySelector("#toast-success")
                if(buttonAdd){
                    buttonAdd.classList.add("invisible")
                }
            }
            setTimeout(()=>{
                toastCancelFriend.classList.add("invisible")
            },2000)
        }
    })
}


const buttonfriend = document.querySelectorAll("[data-id]")

if(buttonfriend){
    buttonfriend.forEach(item => {
        item.addEventListener("click",() => {
            const added = item.getAttribute("added")
            const id = item.getAttribute("data-id")
            if(added === "false"){
                socket.emit("USER_ADD_FRIEND", id);
                SeverAddFriend(item)
                item.setAttribute("added","true")
            }
            else{
                socket.emit("USER_CANCEL_REQUEST_FRIEND", id);
                SeverCancelRequestFriend(item)
                item.setAttribute("added","false")
            }
        })  
    })
}





socket.on("NOTIFICATION_ADD_FRIEND",(data) => {
    const notification = document.querySelector("[id_user]")
    if(notification){
        const id = notification.getAttribute("id_user")
        if(id == data.friend_ID){
            const dotRed = document.querySelector("#dot-red-notification")
            dotRed.classList.remove("hidden")
            const buttonNotification = document.querySelector("#dropdown-notifi")
            console.log(buttonNotification)
            buttonNotification.addEventListener("click",()=>{
                dotRed.classList.add("hidden")
            })
            notiRemoveDot()
            const a = document.createElement("a")
            a.classList.add("flex")
            a.classList.add("px-4")
            a.classList.add("py-3")
            a.classList.add("hover:bg-gray-100")
            a.classList.add("dark:hover:bg-gray-700")
            console.log(data)
            a.innerHTML = `
                <div class="flex-shrink-0">
                    <img class="rounded-full w-11 h-11" src="${data.myUser.image}" alt="Joseph image">
                    <div class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                    <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
                    </svg>
                    </div>
                </div>
                <div class="w-full ps-3">
                    <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">${data.myUser.name}</span> </span> want to friend with you.</div>
                    <div class="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
                </div>
            `
            notification.appendChild(a)
        }
    }
})

const notiRemoveDot = () => {
    const buttonNotification = document.querySelector("#dropdown-notifi")
    const redDotNotification  = document.querySelector("#dot-red-notification")
    if(buttonNotification && redDotNotification ){
    console.log(1)
    buttonNotification.addEventListener("click",()=>{
        console.log(1)
        if(!redDotNotification.classList.contains("hidden")){
            redDotNotification.classList.remove("hidden")
        }
    })
}
}

