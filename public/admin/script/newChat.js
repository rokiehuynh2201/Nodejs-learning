import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
import { FileUploadWithPreview } from 'https://unpkg.com/file-upload-with-preview/dist/index.js';


const Sender = (data) => {
    let content = ``
    let images  = ``
    let imagesWrapper = ``
    if(data.content){
        content = `
            <p class="text-sm font-normal text-gray-900 dark:text-white">${data.content}</p>
        `
    }

    if(data.images){
        data.images.forEach(item =>{
            let image = `
                <div class="group relative">
                    <img class="rounded-lg" src=${item} alt="Jese image">
                </div>
            `
            images += image
        })

        imagesWrapper = `
            <div class="grid gap-4 grid-cols-2 my-2.5">
                 ${images}
            </div>
        `
    }   

    return {content,imagesWrapper}
}

const buttonEdit = `
    <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="hidden hover:block inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
    </button>
    <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
            </li>
        </ul>
    </div>
`





function showImgFullScreen(){
    const viewer = new Viewer(document.getElementById('image-full-screen'), {
        inline: true,
        viewed() {
          viewer.zoomTo(1);
        },
    });
    
    const gallery = new Viewer(document.getElementById('chat'));
}

showImgFullScreen()

var socket = io();
var timeout
const formChat = document.querySelector("#form-chat");
if (formChat) {
  const inputChat = formChat.querySelector("input");

  // Send Message
  inputChat.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(inputChat.value);
      inputChat.value = "";
    }
  });

  // Send Typing

  inputChat.addEventListener("keyup", function () {
    SendTyping()
  });

}

function sendMessage(content) {
  // Your message sending logic here
  const images = upload.cachedFileArray
  upload.resetPreviewPanel();
  scrollBottom();
  socket.emit("USER_SEND_MESSAGE", {
    content:content,
    images:images
  });
}

const chat = document.querySelector("#chat");

function scrollBottom() {
  chat.scrollTop = chat.scrollHeight;
}

scrollBottom();

socket.on("RETURN_MESSAGE", (data) => {
  const currUser = chat.getAttribute("user-id");
  const { userId, name, content } = data;
  const divClass = ["flex", "items-end", "gap-2.5", "mt-2"];
  const div = document.createElement("div");
  div.classList.add(...divClass);

  const messageFormat = Sender(data)

  console.log(currUser)
  console.log(userId)
  if (currUser == userId) {
    div.classList.add("justify-end");
    div.innerHTML = `
            ${buttonEdit}
            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-l-xl rounded-l-xl dark:bg-gray-700">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                </div>
                ${messageFormat.content}
                ${messageFormat.imagesWrapper}
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
            </div>
        `;
  } else {
    div.innerHTML = `
        <img class="w-8 h-8 rounded-full" src=${data.image} alt="Jese image">
        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 ">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">${data.name}</span>
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
            </div>
            ${messageFormat.content}
            ${messageFormat.imagesWrapper}
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
        ${buttonEdit}
    `;
  }
  const listTyping = document.querySelector(".inner-list-typing")
  const exsitTyping = listTyping.querySelector(`[user-id="${userId}"]`)
  if(exsitTyping){
    listTyping.removeChild(exsitTyping)
  }
  chat.insertBefore(div,listTyping)

  if(data.images.length > 0){
    const gallery = new Viewer(div.querySelector("img"));
  }

  scrollBottom();
});


// Emoji
function Emoji() {
    const button = document.querySelector("#button-emoji");
    const tooltip = document.querySelector(".tooltip-emoji")
   

    Popper.createPopper(button,tooltip);

    button.onclick = () => {
        tooltip.classList.toggle('shown')
    }
    
    const inputChat = formChat.querySelector("input");
    document
      .querySelector("emoji-picker")
      .addEventListener("emoji-click", (event) => {
          inputChat.value = inputChat.value + event.detail.unicode
          const end = inputChat.value.length
          inputChat.setSelectionRange(end,end)
          inputChat.focus()
          SendTyping()
      });
}

Emoji()

// End Emoji

// Typing
function SendTyping (){
    socket.emit("USER_SEND_TYPING","show")

    clearTimeout(timeout)

    timeout = setTimeout(() => {
        socket.emit("USER_SEND_TYPING","hidden")
    },2000)
}


function Typing(){
    const listTyping = document.querySelector(".inner-list-typing")
    
    socket.on("RETURN_TYPING",(data) => {
        console.log(data)
        if(data.type === "show"){
                const exsitTyping = listTyping.querySelector(`[user-id="${data.userId}"]`)
                if(!exsitTyping){
                    const div = document.createElement("div")
                    div.classList.add("box-typing")
                    div.setAttribute("user-id",data.userId)
                    div.innerHTML=`
                        <div class="inner-name">${data.name}</div>
                        <div class="inner-dots">
                            <span> </span>
                            <span> </span>
                            <span></span>
                        </div>
                `
                listTyping.appendChild(div)
                scrollBottom()
            }
        }
        else{
            const boxToRemove = listTyping.querySelector(`[user-id="${data.userId}"]`)
            listTyping.removeChild(boxToRemove)
            scrollBottom()
        }
    })
}

Typing()

// End Typing

// Upload file

const upload = new FileUploadWithPreview('my-unique-id',{
    multiple: true,
    maxFileCount:6
});

// End upload file