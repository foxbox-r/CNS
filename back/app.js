const express = require("express");
const db = require("./models")
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportConfig = require("./passport")
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");

const app = express();
const port = 3060;
const host = "localhost";

db.sequelize.sync()
.then(()=>{
    console.log("db 연결 성공");
})
.catch(console.error)

passportConfig();


app.use(morgan("dev"));
app.use(cors({
    origin:true,// or "http://localhost:3060" (근데 주소로 하면 안됌)
    credentials:true,
}));

app.use("/",express.static(path.join(__dirname,"uploads")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("secret"));
app.use(session({
    saveUninitialized: false,
    resave:false,
    secret:"secret",
    cookie : { httpOnly:true,secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/posts",postsRouter);

app.listen(port,host,()=>{
    console.log(`server runs at http://${host}:${port}`);
})