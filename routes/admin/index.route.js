const pathAdmin = require("../../config/system")
const dashboardAdmin = require("./dashboard.route")
const productAdmin  = require("./product.route")


module.exports = (app) =>{
    app.use(`${pathAdmin.prefixAdmin}/dashboard`,dashboardAdmin)
    app.use(`${pathAdmin.prefixAdmin}/product`,productAdmin)
}