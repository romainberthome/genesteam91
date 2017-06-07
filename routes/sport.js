var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Sport = require("../models/sport");

router.get("/sports", middleware.isLoggedIn, function(req, res) {
    Sport.find({}, function(err, sports){
        if(err){
            console.log(err);
        }else{
            res.render("sports/index", {sports:sports});        
        }
    })
});

router.post("/sports", middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var edition = req.body.edition;
    var etape = req.body.etape;
    var description = req.body.description;
    var classement = req.body.classement;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newSport = {title: title, image: image, edition: edition, etape: etape, description: description, classement: classement, author: author};
    Sport.create(newSport, function(err, createdSport){
        if(err){
            console.log(err);
        }else{
            res.redirect("/sports");
        }
    });
});

router.get("/sports/new", middleware.isLoggedIn, function(req, res) {
    res.render("sports/new");
});

router.get("/sports/:id", middleware.isLoggedIn, function(req, res) {
    Sport.findById(req.params.id).populate("comments").exec( function(err, foundSport){
        if(err){
            console.log(err);
        }else{
            Sport.find({}, function(err, allSports){
                if(err){
                    console.log(err);
                }else{
                    res.render("sports/show", {sports:foundSport, allsports:allSports});
                }
            });
        }
    });
});

router.get("/sports/:id/edit", middleware.checkSportsOwnership, function(req, res) {
    Sport.findById(req.params.id, function(err, foundSport){
        if(err){
            console.log(err);
        }else{
            res.render("sports/edit", {sports:foundSport});
        }
    })
});

router.put("/sports/:id", middleware.checkSportsOwnership, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var edition = req.body.edition;
    var etape = req.body.etape;
    var description = req.body.description;
    var classement = req.body.classement;
    var sportUpdate = {title: title, image: image, edition: edition, etape: etape, description: description, classement: classement};
    Sport.findByIdAndUpdate(req.params.id, sportUpdate, function(err, updatedSport){
        if(err){
            console.log(err);
        }else{
            res.redirect("/sports/"+ req.params.id);
        }
    })
});

router.delete("/sports/:id", middleware.checkSportsOwnership, function(req, res){
    Sport.findByIdAndRemove(req.params.id, function(err, deletedSport){
        if(err){
            res.redirect("/sports");
        }else{
            res.redirect("/sports");
        }
    });
});


module.exports = router;