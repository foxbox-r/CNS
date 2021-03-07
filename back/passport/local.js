const passport = require("passport");
const {Strategy:LocalStrategy} = require("passport-local");
const {User} = require("../models");
const bcrypt = require("bcrypt");

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField:"mail", // req.body.mail
        passwordField:"password", // req.body.password
    }, async (mail,password,done)=>{
        try{
            const user = await User.findOne({where:{mail}});
            if(!user)
                return done(null,false,{reason:"등록된 메일이 없습니다."});
            
            const result = await bcrypt.compare(password,user.password);
            
            if(result)
                return done(null,user);

            return done(null,false,{reason:"비밀번호가 틀렸습니다."});

        }catch(error){
            console.error(error);
            done(error);
        }
    }));
}