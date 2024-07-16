const express = require('express')
const app = express()
const cors = require("cors");
var bodyParser = require('body-parser')
const systemConfig = require("./config/system.js")
var methodOverride = require("method-override")
app.use(cors());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

require('dotenv').config();


const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route.js")


const port = process.env.PORT
const db  = require("./config/database.js")
db.connect();

app.set('view engine', 'pug');
app.set('views', './view');
app.use(express.static("public"));

app.locals.prefixAdmin = systemConfig.prefixAdmin

route(app);
adminRoute(app)

app.listen(port,()=>{
    console.log(`App listen on ${port}`);
})


