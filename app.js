var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.render("login"); 
});

app.get("/home", function(req, res){
    res.render("home");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});