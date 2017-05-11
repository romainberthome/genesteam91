var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
    
var User = require("./models/user"),
    Sport = require("./models/sport");
    
mongoose.connect("mongodb://localhost/yelp_camp");
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"Once qgin rusty is cute",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //res.locals.error = req.flash("error");
    //res.locals.success = req.flash("success");
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
   res.render("login"); 
});

app.get("/home", function(req, res){
    res.render("home");
});

// Sport routes

app.get("/sports", function(req, res) {
    res.render("sports/index");
});

app.post("/sports", function(req, res){
    Sport.create(req.body.sport, function(err, createdSport){
        if(err){
            console.log(err);
        }else{
            res.redirect("/sports");
        }
    });
});

app.get("/sports/new", function(req, res) {
    res.render("sports/new");
});

app.get("/sports/:id", function(req, res) {
    res.render("sports/show");
});

app.get("sport/:id/edit", function(req, res) {
    res.render("sport/edit");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});