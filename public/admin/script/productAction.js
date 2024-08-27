const BASE_API = "http://localhost:4000/admin"

const buttonStatus = document.querySelectorAll("span[status-value]");
if(buttonStatus){
    buttonStatus.forEach(item => {
        item.addEventListener("click", async () => {
            const value = item.getAttribute("status-value");
            const id = item.getAttribute("status-id");
            const newStatus = value === 'active' ? 'inactive' : 'active';
            try {
                const response = await fetch(`${BASE_API}/product/change-status`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                        status: value
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                item.setAttribute('status-value', newStatus);
                item.className = newStatus;
                item.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
                console.log(result); // Log response from the server
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
}

const buttonFilterStatus = document.querySelectorAll(".button-status")
if(buttonFilterStatus){
    buttonFilterStatus.forEach(button => {
        button.addEventListener("click",() => {
            const url = new URL(window.location.href)
            const status = button.getAttribute("status")
            if(status){
                url.searchParams.set("status",status)
            }
            else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href;
        })
    })
}
    
// Search Product
const formSearch = document.querySelector("#form-search-product")
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("keypress",(e)=>{
        if(e.key === "Enter")
        {
            e.preventDefault();
            var keyword = e.target.value
            if(keyword){
                url.searchParams.set("keyword",keyword)
            }
            else{
                url.searchParams.delete("keyword")
            }
            window.location.href = url.href;
        }
    })
}
// End Search Product

