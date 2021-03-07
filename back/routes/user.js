const router = require("express").Router();
const passport =  require("passport");
const db = require("../models");
const {User,Post} = db;
const bcrypt = require("bcrypt");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const serverLog = require("../log")

//200 ok
//201 ceated
//400 bad request
//401 unauthorized
//403 forbidden (server know client id)
//404 not found
//500 server error
router.post('/login',isNotLoggedIn,(req,res,next)=>{
    serverLog(()=>console.log("LOGIN::"));
    
    console.dir(req.body);
    
    passport.authenticate("local",(serverError,user,clientError)=>{
        if(serverError){
            console.error(serverError);
            return next(serverError);
        }

        if(clientError){
             console.log(clientError.reason);
             return res.status(401).send(clientError.reason);
        }

        return req.login(user,async (error)=>{
            try{
                if(error){
                    console.error(error);
                    return next(error);
                }

                const FullUserWithOutPassword = await User.findOne({
                    where:{id:user.id},
                    attributes:{
                        exclude:["password"],
                    },
                    include:[
                        {
                            model:db.User,
                            as:"Makers"
                        },
                        {
                            model:db.User,
                            as:"Clients"
                        },
                        {
                            model:db.Post,
                            attributes:["id"]
                        }
                    ]
                })

                return res.status(200).json(FullUserWithOutPassword);

            } catch(error){
                console.error(error);
                return next(error);
            }
        })

    })(req,res,next);
})

router.post("/signup",isNotLoggedIn,async (req,res,next)=>{
    try{
        serverLog(()=>console.log("SIGNUP ::"));

        const {mail,password,name,color,backgroundColor} = req.body;
        console.log(mail,password,name);
        let checkMail = await User.findOne({where:{mail}});
        
        if(checkMail){
            return res.status(403).send("이미 있는 메일입니다.");
        }
        
        const hashedPassword = bcrypt.hashSync(password,9);
        await User.create({
            mail,
            name,
            password:hashedPassword,
            color,
            backgroundColor,
        });
        res.status(201).send("ok");
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.post("/logout",isLoggedIn,(req,res,next)=>{
    req.logout(); // session.passport 삭제
    req.session.destroy(); // session 삭제
    console.log(req.session);
    res.status(200).send("ok");
});

router.get("/",isLoggedIn,async (req,res,next)=>{
    try{
        serverLog(()=>console.log("LOAD_MY_INFO_REQUEST ::"));
        
        const FullUserWithOutPassword = await User.findOne({
            where:{id:req.user.id},
            attributes:{
                exclude:["password"],
            },
            include:[
                {
                    model:db.User,
                    as:"Makers"
                },
                {
                    model:db.User,
                    as:"Clients"
                },
                {
                    model:db.Post,
                    attributes:["id"]
                }
            ]
        });

        return res.status(200).json(FullUserWithOutPassword);
    } catch(error){
        console.error(error);
        next(error);
    }
});


module.exports = router;