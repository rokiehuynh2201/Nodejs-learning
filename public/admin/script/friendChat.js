var socket = io();

const cancelFriendAction = (item) => {
    item.addEventListener("click",()=>{
        const groupFriendButton = item.parentElement
        const deletedButton = groupFriendButton.nextElementSibling.classList.remove("hidden")
        groupFriendButton.classList.add("hidden")
        const id = item.getAttribute("data-id")
        socket.emit("CLIENT_REFUSE_FRIEND",id)
    })
}

const cancelFriend = document.querySelectorAll(".cancel-friend-button")
if(cancelFriend){
    cancelFriend.forEach(item => {
        cancelFriendAction(item)
    })
}

const addFriendAction  = (item) => {
    item.addEventListener("click",() => {
        const cancelButton = item.nextElementSibling
        cancelButton.classList.add("hidden")
        item.innerHTML= `
            <i class="fa-solid fa-check mr-1 d-none"></i>
            Accepted
        `
        const id = item.getAttribute("data-id")
        socket.emit("CLIENT_ACCEPT_FRIEND",id)
    })
}

const addFriend = document.querySelectorAll(".add-friend-button")
if(addFriend){
    addFriend.forEach(item => {
        addFriendAction(item)
    })
}

socket.on("NOTIFICATION_ADD_FRIEND",(data) => {
    const listFriend = document.querySelector("#list-friend")
    if(listFriend){
        const id = listFriend.getAttribute("data-id")
        if(id == data.friend_ID){
            const classes = ["w-full","max-w-sm","bg-white","border","border-gray-200","rounded-lg","shadow","dark:bg-gray-800","dark:border-gray-700"]
            const div = document.createElement("div")
            div.setAttribute("friend-id",data.myUser._id)
            div.classList.add(...classes)
            div.innerHTML =`
                <div class="flex justify-end px-4 pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        <span class="sr-only">Open dropdown</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>
                    <!-- Dropdown menu -->
                    <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">View Profile</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Remove</a>
                        </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-col items-center pb-10">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="${data.myUser.image}" alt="Bonnie image" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${data.myUser.name}</h5>
                    <div class="button-friend flex mt-4 md:mt-6">
                        <a data-id = ${data.myUser._id} href="javascript:;" class="add-friend-button inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Accept
                        </a>
                        <a data-id =${data.myUser._id}href="javascript:;" class="cancel-friend-button py-2 px-4 ms-2 text-sm font-medium focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"> Delete </a>
                    </div>
                    <div class="deleted-button hidden mt-4 md:mt-6">
                        <a data-id = ${data.myUser._id} href="javascript:;" class="cursor-not-allowed opacity-50 deleted-friend-button py-2 px-4 ms-2 text-sm font-medium focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"> Deleted </a>
                    </div>  
                </div>
            `
            listFriend.appendChild(div)
            const buttonAddfriend = div.querySelector(".add-friend-button")
            addFriendAction(buttonAddfriend)
            const buttonCancelFriend = div.querySelector(".cancel-friend-button")
            cancelFriendAction(buttonCancelFriend)
        }
    }
})


socket.on("SEVER_RETURN_USER_CANCEL_FRIEND",(data) => {
    const {myID,friend_ID} = data
    const friendRemove = document.querySelector(`[friend-id="${myID}"]`)
    const listFriend = document.querySelector("#list-friend")
    const currentUserID = listFriend.getAttribute("data-id")
    if(friendRemove && currentUserID === friend_ID){
        listFriend.removeChild(friendRemove)
    }
})

