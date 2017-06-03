var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    middleware = require("../middleware"),
    passport = require("passport"),
    Event = require("../models/event");
    
router.get("/", function(req, res) {
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var  newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.redirect("/register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        });
    });
});

router.get("/login", function(req, res){
   res.render("login"); 
});


router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
    }) ,function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/home");
});

router.get("/home", middleware.isLoggedIn, function(req, res){
    User.find({}, function(err, foundUsers){
        if(err){
            console.log(err);
        }else{
            Event.find({}, function(err, foundEvents){
                if(err){
                    console.log(err);
                }else{
                    res.render("home", {users: foundUsers, events:foundEvents});
                }
            });
        }
    });
});


module.exports = router;