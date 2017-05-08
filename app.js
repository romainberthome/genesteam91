var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
    
app.use("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});