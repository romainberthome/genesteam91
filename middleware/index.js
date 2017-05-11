var middlewareObj ={};

middlewareObj.isLoggedIn = function  (req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
};

module.exports = middlewareObj;