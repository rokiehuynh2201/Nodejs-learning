import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
import insertText from "https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js";

// Dropdown list
const  DropdownList = () => {
  const buttonToggle = document.querySelectorAll(
    ".conversation-item-dropdown-toggle"
  );
  
  if (buttonToggle) {
    buttonToggle.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelectorAll(".conversation-item-dropdown").forEach((i) => {
          i.classList.remove("active1");
        });
        item.parentElement.classList.add("active1");
      });
    });
  
    document.addEventListener("click", (e) => {
      // e.preventDefault();
      if (
        !e.target.matches(
          ".conversation-item-dropdown,.conversation-item-dropdown *"
        )
      ) {
        document.querySelectorAll(".conversation-item-dropdown").forEach((i) => {
          i.classList.remove("active1");
        });
      }
    });
  }
}

DropdownList()
// End Dropdown list

//Upload Image
const upload = new FileUploadWithPreview.FileUploadWithPreview('my-unique-id',{
  multiple: true,
});
// End upload image

// CLIENT_SEND_MESSAGE

const formSendData = document.querySelector(
  "form.conversation-form-input-wrapper"
);

if (formSendData) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    const images  = upload.cachedFileArray
    // upload.emulateInputSelection();
    if (content || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content:content,
        images:images
      });

      e.target.elements.content.value = "";
      upload.resetPreviewPanel()
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  };

  const textArea = document.querySelector("textarea.conversation-form-input");

  if (formSendData) {
    formSendData.addEventListener("submit", handleSubmit);
  } else {
    console.error("Form element not found");
  }

  if (textArea) {
    textArea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); 
        formSendData.requestSubmit(); // Trigger form submission
      }
    });
  } else {
    console.error("Textarea element not found");
  }
}

// END CLIENT_SEND_MESSAGE

// Scroll chat

const bodyChat = document.querySelector(".conversation-main");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}

// End Scroll chat

// SERVER_SEND_MESSAGE
socket.on("SEVER_RETURN_MESSAGE", (data) => {
  const id = document.querySelector("[my-id]");
  const userId = id.getAttribute("my-id");
  const li = document.createElement("li");
  const exist = document.querySelector(`[user-id="${data.userId}"]`);
  li.classList.add("conversation-item");
  if (userId != data.userId) {
    li.classList.add("me");
    li.innerHTML = `
        <div class="conversation-item-side">
        <img class="conversation-item-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZDONyImNbnxJaUz1xjSTcZRuYTYd_Tnfvg&amp;s" 
        atl="Ảnh người dùng">
        </div>
    `;
  }

  let divImage = document.createElement("div")
  if(data.images){
    
    divImage.classList.add("message-image")
    for(let image of data.images){
      divImage.innerHTML += `
        <img src=${image} alt="" />
      `
    }
  }

  let html = `
    <div class="conversation-item-content">
      <div class="conversation-item-wrapper">
      <div class="conversation-item-box"> 
      <div class="conversation-item-text"> 
      <p>${data.content}</p>
      <div class="conversation-item-time">12:30</div>
      </div>
      <div class="conversation-item-dropdown">
      <button class="conversation-item-dropdown-toggle">
      <i class="fa-solid fa-ellipsis-vertical">
      </i></button><ul class="conversation-item-dropdown-list">
      <li><a><i class="fa-solid fa-reply-all"></i>  Forward </a></li><li><a><i class="fa-solid fa-trash"></i>  Delete</a></li></ul></div></div></div>
    ${divImage.outerHTML}
    </div>
  `;

  li.innerHTML += html;
  
  id.insertBefore(li, exist); 
  bodyChat.scrollTop = bodyChat.scrollHeight;
  DropdownList()
});

// END SERVER_SEND_MESSAGE

// Show Typing

var timeOut;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");

  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 2000);
}

//End Show Typing

// Icon chat

const buttonShowEmoji = document.querySelector(".conversation-form-button");
if (buttonShowEmoji) {
  console.log(buttonShowEmoji);
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonShowEmoji, tooltip);
  buttonShowEmoji.onclick = () => {
    tooltip.classList.toggle("shown");
  };
  document.addEventListener("click", (e) => {
    // e.preventDefault();
    if (
      !e.target.matches(".conversation-form-button,.conversation-form-button *")
    ) {
      document.querySelectorAll(".tooltip").forEach((i) => {
        i.classList.remove("shown");
      });
    }
  });
  document
    .querySelector("emoji-picker")
    .addEventListener("emoji-click", (e) => {
      const text = document.querySelector(".conversation-form-input");
      text.value = text.value + e.detail.unicode;
      showTyping()
    });
}

// End Icon chat

// Typing
const text = document.querySelector(".conversation-form-input");
if(text){
  text.addEventListener("keyup", () => {
    showTyping()
  });
}

socket.on("SERVER_RETURN_TYPING", async (content) => {
  const div = document.createElement("div");

  const body = document.querySelector("[my-id]");

  div.classList.add("inner-list-typing");

  div.setAttribute("user-id", content.userId);

  if (content.type === "show") {
    const exist = document.querySelector(`[user-id="${content.userId}"]`);
    if (!exist) {
      console.log(exist);
      let html = `
      <div class="box-typing">
        <div class="inner-name">${content.name}</div>
        <div class="inner-dots"><span> </span><span> </span><span></span></div>
      </div>
    `;
      div.innerHTML = html;
      body.appendChild(div);
      bodyChat.scrollTop = bodyChat.scrollHeight;
    }
  } else if (content.type === "hidden") {
    const exist = document.querySelector(`[user-id="${content.userId}"]`);
    if (exist) {
      body.removeChild(exist);
    }
  }
});

// End Typing

