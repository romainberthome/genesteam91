var express = require("express"),
    router = express.Router(),
    Sport = require("../models/sport"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

router.get("/sports/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Sport.findById(req.params.id, function(err, foundSport){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {sports:foundSport});
        }
    })
});

router.post("/sports/:id/comments", middleware.isLoggedIn, function(req, res){
    Sport.findById(req.params.id, function(err, sport) {
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    sport.comments.push(comment);
                    sport.save();
                    res.redirect("/sports/" + sport._id);
                }
            });
        }
    });
});

router.get("/sports/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit", {sports_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/sports/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        }else{
            res.redirect("/sports/" + req.params.id);
        }
    });
});

router.delete("/sports/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, removeComment){
        if(err){
            console.log(err);
        }else{
            res.redirect("/sports/" + req.params.id)
        }
    });
});

module.exports = router;