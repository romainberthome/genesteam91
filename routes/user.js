var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    User = require("../models/user");
    
router.get("/profil/:id", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
       if(err){
           console.log(err);
       } else{
           res.render("users/show", {users:foundUser});
       }
   }); 
});

router.get("/profil/:id/edit", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
       if(err){
           console.log(err);
       } else{
           res.render("users/edit", {users:foundUser});
       }
   }); 
});

router.put("/profil/:id", function(req, res){
   User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
           console.log(err);
       } else{
           res.redirect("/profil/" + req.params.id);
       }
   }); 
});

module.exports = router;