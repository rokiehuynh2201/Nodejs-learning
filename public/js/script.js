const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length>1){
    let url = new URL(window.location.href);
    buttonStatus.forEach((item) =>{
        item.addEventListener("click",() => {
            const state = item.getAttribute("button-status")
            if(state){
                url.searchParams.set("price",state)
            }else{
                url.searchParams.delete("price")
            }
            window.location.href = url.href
        })
    })
}

const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        var keyword = e.target.elements.keyword.value
        console.log(keyword)
        if(keyword){
            url.searchParams.set("keyword",keyword)
        }
        else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href;
    })
}

const pagination = document.querySelectorAll(".page-link")
if(pagination){
    var url = new URL(window.location.href)
    pagination.forEach(item => {
        item.addEventListener("click",()=>{
            pageSet = item.getAttribute("buttonStatus")
            url.searchParams.set("page",pageSet)
            window.location.href = url.href
        })
    })
}

const buttonChangStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangStatus){
    const formChangeStatus = document.querySelector("#form-change-status")
    buttonChangStatus.forEach(item =>{
        item.addEventListener("click",() => {
            idStatus = item.getAttribute("data-id")
            state    = item.getAttribute("data-status")
            action   = formChangeStatus.getAttribute("data-path")+`/${state}/${idStatus}?_method=PATCH`
            formChangeStatus.action=action
            formChangeStatus.submit()
        })
    })
}

const checkBox = document.querySelector("[checkbox-multi]")
if(checkBox){
    const inputAll = document.querySelector("input[name='checkAll']")
    const inputsId = document.querySelectorAll("input[name='id']")
    inputAll.addEventListener('click',() => {
        if(inputAll.checked){
            inputsId.forEach(item=>{
                item.checked = true
            })
        }
        else{
            inputsId.forEach(item=>{
                item.checked = false
            })
        }
    })
}

const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    const valueOfForm = document.querySelector("select[name='type']")
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault()
        const inputsId = document.querySelectorAll("input[name='id']:checked")
        if(inputsId.length > 0){
            let ids = []
            inputsId.forEach(item => {
                if(valueOfForm.value == "change-position"){
                    const position = item.closest("tr").querySelectorAll("input[type='number']")[0].value
                    ids.push(`${item.value}-${position}`)
                }
                else{
                    ids.push(item.value)
                }
            })
            console.log(ids)
            let inputValue = document.querySelector("[name=ids]")
            inputValue.value = ids.join(", ")
            formChangeMulti.submit()
        }
        else{
            alert("ĐỤ MẸ NHẬP SẢN PHẨM ĐI THẰNG ÓC LỒN")
        }
    })
}

const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete){
    const formChangeStatus = document.querySelector("#form-change-status")
    buttonDelete.forEach(item => {
        item.addEventListener("click",()=>{
            idStatus = item.getAttribute("data-id")
            formChangeStatus.action+=`/delete-product/${idStatus}?_method=PATCH`
            formChangeStatus.submit()
        })
    })
}

