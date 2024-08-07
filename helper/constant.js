const rows = [
    {
        name:"Danh sách sản phẩm",
        permission:[
            {
                name:"Xem",
                value:"product_view"
            },
            {
                name:"Thêm mới ",
                value:"product_create"
            },
            {
                name:"Chỉnh sửa",
                value:"product_edit"
            },
            {
                name:"Xóa",
                value:"product_delete"
            }
        ]
    },
    {
        name:"Danh mục sản phẩm",
        permission:[
            {
                name:"Xem",
                value:"category_view"
            },
            {
                name:"Thêm mới ",
                value:"category_create"
            },
            {
                name:"Chỉnh sửa",
                value:"category_edit"
            },
            {
                name:"Xóa",
                value:"category_delete"
            }
        ]
    },
    {
        name:"Nhóm quyền",
        permission:[
            {
                name:"Xem",
                value:"roles_view"
            },
            {
                name:"Thêm mới ",
                value:"roles_create"
            },
            {
                name:"Chỉnh sửa",
                value:"roles_edit"
            },
            {
                name:"Xóa",
                value:"roles_delete"
            },
            {
                name:"Phân quyền",
                value:"roles_permission"
            }
        ]
    },
    {
        name:"Tài khoản",
        permission:[
            {
                name:"Xem",
                value:"account_view"
            },
            {
                name:"Thêm mới",
                value:"account_create"
            },
            {
                name:"Chỉnh sửa",
                value:"account_edit"
            },
            {
                name:"Xóa",
                value:"account_delete"
            }
        ]
    }
]



module.exports = rows