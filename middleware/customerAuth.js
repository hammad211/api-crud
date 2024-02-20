function customerAuth(req, res, next){
    if(req.session.user){
        next();
    }
    
    
}

module.exports = customerAuth;