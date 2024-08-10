const body          =   document.querySelector("body")
const modeToggle    =   body.querySelector(".mode-toggle")
const sidebarToggle =   body.querySelector(".sidebar-toggle")
const nav           =   body.querySelector("nav")


let getMode = localStorage.getItem("mode");
if(getMode && getMode === "dark"){
    body.classList.toggle("dark")
}

modeToggle.addEventListener("click",() => {
    body.classList.toggle("dark")
    if(body.classList.contains("dark")){
        localStorage.setItem("mode","dark")
    }
    else{
        localStorage.setItem("mode","light")
    }
})

let sideBar = localStorage.getItem("sidebar");
if(sideBar && sideBar === "close"){
    nav.classList.toggle("close")
}

sidebarToggle.addEventListener("click",()=>{
    nav.classList.toggle("close")
    if(nav.classList.contains("close")){
        localStorage.setItem("sidebar","close")
    }
    else{
        localStorage.setItem("sidebar","open")
    }
})


const items = document.querySelectorAll('.nav-links li');
items.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all items
        items.forEach(el => el.classList.remove('active'));

        // Add 'active' class to the clicked item
        item.classList.add('active');
    });
});