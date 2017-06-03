var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Event = require("../models/event");

router.get("/events", middleware.isLoggedIn, function(req, res) {
   Event.find({}, function(err, events){
        if(err){
            console.log(err);
        }else{
            res.render("events/index", {events:events});        
        }
    })
});

router.post("/events", middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var video = req.body.video;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newEvent = {title: title, image: image, video: video, description: description, author: author};
    Event.create(newEvent, function(err, createdEvent){
        if(err){
            console.log(err);
        }else{
            res.redirect("/events");
        }
    });
});

router.get("/events/new", middleware.isLoggedIn, function(req, res) {
    res.render("events/new");
});

router.get("/events/:id", middleware.isLoggedIn, function(req, res) {
    Event.findById(req.params.id).populate("comments").exec( function(err, foundEvent){
        if(err){
            console.log(err);
        }else{
            res.render("events/show", {events:foundEvent});
        }
    });
});

router.get("/events/:id/edit", middleware.checkEventsOwnership, function(req, res){
    Event.findById(req.params.id, function(err, foundEvent){
        if(err){
            console.log(err);
        }else{
            res.render("events/edit", {events:foundEvent});
        }
    });
});

router.put("/events/:id", middleware.checkEventsOwnership, function(req, res){
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
        if(err){
            console.log(err);
        }else{
            res.redirect("/events/" + req.params.id);
        }
    });
});

router.delete("/events/:id", middleware.checkEventsOwnership, function(req, res){
    Event.findByIdAndRemove(req.params.id, function(err, removedEvent){
        if(err){
            console.log(err);
        }else{
            res.redirect("/events");
        }
    });
});
    
module.exports = router;