var Sport = require("../models/sport"),
    Comment = require("../models/comment"),
    Event = require("../models/event");
var middlewareObj ={};

middlewareObj.checkSportsOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Sport.findById(req.params.id, function(err, foundSport){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(foundSport.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

middlewareObj.checkEventsOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Event.findById(req.params.id, function(err, foundEvent){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(foundEvent.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
};

module.exports = middlewareObj