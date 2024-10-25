const BASE_API = "http://localhost:4000/admin"

const buttonStatus = document.querySelectorAll("span[status-value]");
if(buttonStatus){
    buttonStatus.forEach(item => {
        item.addEventListener("click", async () => {
            const value = item.getAttribute("status-value");
            const id = item.getAttribute("status-id");
            const newStatus = value === 'active' ? 'inactive' : 'active';
            console.log(value,id)
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
const formSearch = document.querySelector("#search-input")
if(formSearch){
    formSearch.addEventListener("input",(e) => {
        const searchTerm = formSearch.value
        const table = document.querySelector('#table-product');
        const rows = table.querySelectorAll('tbody tr');
        let regex;
        try {
            regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive matching
        } catch (e) {
            // If the regex fails to compile, we use an empty pattern
            regex = new RegExp(''); // Match everything
        }

        rows.forEach(row => {
            const cell = row.querySelector('.product-de h5').textContent;
            row.style.display = regex.test(cell) ? '' : 'none';
        });
    })
    
    // let url = new URL(window.location.href)
    // formSearch.addEventListener("keypress",(e)=>{
    //     if(e.key === "Enter")
    //     {    
    //         e.preventDefault();
    //         var keyword = e.target.value
    //         if(keyword){
    //             url.searchParams.set("keyword",keyword)
    //         }
    //         else{
    //             url.searchParams.delete("keyword")
    //         }
    //         window.location.href = url.href;
    //     }
    // })

}
// End Search Product

const CreatePopup = (id) => {
    let Popup = document.querySelector(id)
    let overLay = document.querySelector(".overlay")
    let closeBtn = document.querySelector(".no-deleted")
    const openPopup = (e)=>{
        Popup.classList.add("active-popup")
        const button = e.currentTarget;  // the button that was clicked
        const dataId = button.getAttribute("data-id"); // Get the data-id attribute value
        const buttonDeleted = document.querySelector("#button-deleted")
        buttonDeleted.addEventListener("click",() => {
            const tbody = document.querySelector('#table-product tbody');
            const row = Array.from(tbody.rows).find(row => row.dataset.id == dataId);
            if (row) {
                row.remove();
            }
            Popup.classList.remove("active-popup")
        })
    }
    const closePopup = ()=>{
        Popup.classList.remove("active-popup")
    }
    overLay.addEventListener("click",closePopup)
    closeBtn.addEventListener("click",closePopup)
    return openPopup
}

const Popup = CreatePopup("#popup")
const popupBtn = document.querySelectorAll(".open-popup")
if(popupBtn){
    popupBtn.forEach(item => {
        item.addEventListener("click",Popup)
    })
}


// Pagination 
const buttonPagintion = document.querySelectorAll("button.button-page")
if(buttonPagintion){
    const url  = new URL(window.location.href)
    console.log(buttonPagintion)
    buttonPagintion.forEach(item => {
        item.addEventListener("click",() => {
            const numProduct = document.querySelector(".select-page").value
            const currentPage = item.getAttribute("page")
            url.searchParams.set("page",currentPage)
            url.searchParams.set("limit",numProduct)
            window.location.href = url.href
        })
    })
}

const selectNumProduct = document.querySelector(".select-page")
if(selectNumProduct){
    const url  = new URL(window.location.href)
    selectNumProduct.addEventListener("change",()=>{
        const numProduct = selectNumProduct.value
        console.log(numProduct)
        url.searchParams.set("limit",numProduct)
        window.location.href = url.href
    })
}

const navFilert = (id) => {
    const body = document.querySelector(id)
    const overLay = document.querySelector(".overlay-filter-nav")
    const buttonCloseFilter = document.querySelector(".button-close-nav")
    function openFilter(){
        body.classList.add("active-filter-nav")
    }
    function closeFilter(){
        body.classList.remove("active-filter-nav")
    }
    overLay.addEventListener("click",closeFilter)
    buttonCloseFilter.addEventListener("click",closeFilter)
    return openFilter
}

const openFilter = navFilert(".container-filter-nav")
const buttonOpenFilter = document.querySelector("#filter-button ")
if(buttonOpenFilter){
    buttonOpenFilter.addEventListener("click",openFilter)
}



function SortTable(){
    let sortAsc = true
    const table_rows = document.querySelectorAll("tbody tr")
    const table_head = document.querySelectorAll("thead tr td:not(.not-pick)")
    table_head.forEach((head,i)=> {
        head.onclick = () => {
            table_head.forEach(head => {
                head.classList.remove("active-sort")
            })
            head.classList.add("active-sort")

            document.querySelectorAll("tbody tr td").forEach(item =>{
                item.classList.remove("active-sort")
            })
            table_rows.forEach(row => {
                row.querySelectorAll("td")[i].classList.add("active-sort")
            })
            
            sortAsc = head.classList.contains("asc") ? false : true
            
            head.classList.toggle("asc",sortAsc)
            
            console.log(sortAsc)
            const sort = [...table_rows]
            .sort((a,b)=>{
                let firstRow = a.querySelectorAll("td .sort-data")[i].textContent.toLowerCase()
                let secRow = b.querySelectorAll("td .sort-data")[i].textContent.toLowerCase()
                return sortAsc ? ( firstRow < secRow ? -1 : 1) : ( firstRow < secRow ? 1 : -1)
            })
            .map(sorted => {
                document.querySelector("tbody").appendChild(sorted)
            })
        }
    })
    
}

SortTable()


const buttonExport = document.getElementById("button-exports")
if(buttonExport){
    buttonExport.addEventListener("click",() => {
        document.querySelector(".export__file-option").classList.toggle("open")
        buttonExport.classList.toggle("open-filter")
    })
}