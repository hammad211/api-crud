function checkAuth(req, res, next){
    if(req.session.user){
        next();
    }
    
    
}

module.exports = checkAuth;