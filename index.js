const express           =   require('express')
const app               =   express()
const cors              =   require("cors");
const bodyParser        =   require('body-parser')
const systemConfig      =   require("./config/system.js")
const methodOverride    =   require("method-override")
const flash             =   require('express-flash')
const cookieParser      =   require('cookie-parser')
const session           =   require('express-session')
const route             =   require("./routes/client/index.route");
const adminRoute        =   require("./routes/admin/index.route.js")
const db                =   require("./config/database.js")
const path              =   require('path');
const moment            =   require('moment'); 
const http              =   require('http');
const { Server }        =   require("socket.io");


require('dotenv').config();

app.use(cors());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('fsdffdsfds'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(express.static(`${__dirname}/public`));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


const port = process.env.PORT
db.connect();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/view`);
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment

// SocketIO

const server  =   http.createServer(app);

const io      =   new Server(server,{
    cookie: {
        name: "my-cookie",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 86400
    }
});

global._io = io

// End SocketIO


route(app);
adminRoute(app)

server.listen(port,()=>{
    console.log(`App listen on ${port}`);
})


