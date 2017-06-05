var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    middleware = require("./middleware"),
    request = require("request"),
    flash = require("connect-flash");
    
var User = require("./models/user"),
    Sport = require("./models/sport"),
    Comment = require("./models/comment"),
    Event = require("./models/event");
    
var sportRoutes = require("./routes/sport"),
    commentRoutes = require("./routes/comment"),
    eventRoutes = require("./routes/event"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/user");

var url = process.env.DATABASEURL || "mongodb://localhost/gesnesteam" ; 
mongoose.connect(url);

app.use(express.static(__dirname + "/public"));    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"Once qgin rusty is cute",
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/",sportRoutes);
app.use("/",commentRoutes);
app.use("/",eventRoutes);
app.use("/",userRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});