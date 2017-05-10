var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override");
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

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