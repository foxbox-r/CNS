const passport = require('passport');
const local = require("./local");
const {User} = require("../models");
const serverLog = require("../log")

module.exports = ()=>{
    passport.serializeUser((user,done)=>{
        serverLog(()=>console.log("SERIALIZE_USER_ID ::",user.id));
        done(null,user.id); // session 에 id 저장
    });

    passport.deserializeUser(async (id,done)=>{
        try{
            serverLog(()=>console.log("DESERIALIZE_USER_ID ::",id));
            const user = await User.findOne({where:{id}});
            done(null,user); // req.user 에 user 저장
        }catch(error){
            console.error(error);
            done(error);
        }
    });

    local();

    console.log("PASSPORT INIT");
}