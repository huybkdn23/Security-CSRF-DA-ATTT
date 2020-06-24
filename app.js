const express       = require("express");
const mongoose      = require('mongoose');
const { Schema }    = require('mongoose');
const session       = require("express-session");
const bodyParser    = require("body-parser");
const morgan        = require("morgan");
const csurf         = require("csurf");
const cookieParser  = require('cookie-parser');
const api           = require('./api/index');
const pages         = require('./pages/index');
const { mongo }     = require('./config');

const app = express();
let csrfProtection = csurf({ cookie: true });

app.set("view engine", "ejs");
app.set("views", "./views");
app.disable("x-powered-by");
mongoose.connect(mongo.uri);

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use(morgan("dev"));
app.use(session({
    secret: "Security",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24*60*60*1000
    }
}));

// app.use(csrfProtection);
app.use('/api', api);
app.use('/', pages);

app.use((err,req,res,next) => {
    if(err.code !== "EBADCSRFTOKEN"){
        next();
        return;
    }
    console.log('@ERROR CSURF');
    return res.status(403).json({ message: "CSURF ERROR" });
});
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

// module.exports = app;
module.exports.csurf = csrfProtection;