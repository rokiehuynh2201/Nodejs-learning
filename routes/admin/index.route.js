const pathAdmin         =   require("../../config/system")
const dashboardAdmin    =   require("./dashboard.route")
const productAdmin      =   require("./product.route")
const category          =   require("./category")

module.exports = (app) =>{
    app.use(`${pathAdmin.prefixAdmin}/dashboard`,dashboardAdmin)
    app.use(`${pathAdmin.prefixAdmin}/product`,productAdmin)
    app.use(`${pathAdmin.prefixAdmin}/category-product`,category)
}