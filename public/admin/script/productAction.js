const BASE_API = "http://localhost:4000/admin"
const buttonStatus = document.querySelectorAll("span[status-value]")
if(buttonStatus){
    buttonStatus.forEach(item => {
        item.addEventListener("click", async ()=>{
            const value = item.getAttribute("status-value")
            const id    = item.getAttribute("status-id")
            const response = await fetch(BASE_API+"/product/change-status",{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                { 
                    id:id,
                    status:value
                })
            })
        })
    })
}


