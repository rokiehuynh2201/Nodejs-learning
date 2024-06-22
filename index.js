const express = require('express')
const app = express()
require('dotenv').config();



const route = require("./routes/client/index.route");
const port = process.env.PORT
const db  = require("./config/database.js")
db.connect();

app.set('view engine', 'pug');
app.set('views', './view');
app.use(express.static("public"));


route(app);

app.listen(port,()=>{
    console.log(`App listen on ${port}`);
})


