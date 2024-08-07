const pathAdmin         =   require("../../config/system")
const dashboardAdmin    =   require("./dashboard.route")
const productAdmin      =   require("./product.route")
const category          =   require("./category.route")
const role              =   require("./role.route")
const account           =   require("./account.route")
const auth              =   require("./auth.route")
const requireAuth       =   require("../../middlewares/login.middlewares")
const myAccount         =   require("./my-account.route")

module.exports = (app) =>{
    app.use(`${pathAdmin.prefixAdmin}/dashboard`,
        requireAuth.requireAuth,
        dashboardAdmin)
    app.use(`${pathAdmin.prefixAdmin}/product`,requireAuth.requireAuth,productAdmin)
    app.use(`${pathAdmin.prefixAdmin}/category-product`,requireAuth.requireAuth,category)
    app.use(`${pathAdmin.prefixAdmin}/roles`,requireAuth.requireAuth,role)
    app.use(`${pathAdmin.prefixAdmin}/account`,requireAuth.requireAuth,account)
    app.use(`${pathAdmin.prefixAdmin}/auth`,auth)
    app.use(`${pathAdmin.prefixAdmin}/my-account`,requireAuth.requireAuth,myAccount)
    
}