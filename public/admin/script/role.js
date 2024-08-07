
const table = document.querySelector("[table-permission]")
if(table){
    const button = document.querySelector("[button-submit]")
   button.addEventListener("click",()=>{
        let permissions = []
        const rows = document.querySelectorAll("[data-name]")
        rows.forEach(row => {
            const input = row.querySelectorAll("input")
            const name = row.getAttribute("data-name")
            if(name == "id"){
                input.forEach(item => 
                    permissions.push(
                        {
                            id:item.value,
                            permission:[]
                        }
                    )
                )
            }else{
                input.forEach((input,index)=>{
                    if(input.checked){
                        permissions[index].permission.push(row.getAttribute("data-name"))
                    }
                })
            }
        })
        const form = document.querySelector("#form-change-permission")
            const inputForm = document.querySelector("input[name='permissions']")
            inputForm.value = JSON.stringify(permissions)
            form.submit()
   })
}