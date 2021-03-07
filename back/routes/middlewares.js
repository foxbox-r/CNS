exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(401).send("로그인이 필요합니다.");
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    } else{
        res.status(403).send("로그인 한상태지만 접근 불가능")
    }
}