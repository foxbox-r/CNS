const router = require('express').Router();
const db = require("../models");
const {Post} = db;
const {Op} = require("sequelize");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const serverLog = require('../log');

router.get("/",async (req,res,next)=>{
    try{
        let where = {};

        if(parseInt(req.query.lastId)){
            where.id = {[Op.lt]:parseInt(req.query.lastId)};
        }

        const posts = await Post.findAll({
            where,
            limit:parseInt(req.query.limit),
            order:[
                ["createdAt","DESC"]
            ],
            include:[
                {
                    model:db.Image,
                },{
                    model:db.User,
                    attributes:{
                        exclude:["password"]
                    }
                },{
                    model:db.Comment,
                    include:[
                        {
                            model:db.User,
                            attributes:{
                                exclude:["password"]
                            },
                        }
                    ]
                },{
                    model:db.User,
                    as:"Likers",
                    attributes:["id","name"]
                }
            ]
        });

        res.status(200).json(posts);
    } catch(error){
        console.error(error);
        next(error);
    }
})

router.get("/myPosts",isLoggedIn,async (req,res,next)=>{
    try{
        
        const fullMyPosts = await Post.findAll({
            order:[
                ["createdAt","DESC"]
            ],
            include:[
                {
                    model:db.Image,
                },{
                    model:db.User,
                    where:{id:req.user.id},
                    attributes:{
                        exclude:["password"]
                    }
                },{
                    model:db.Comment,
                    include:[
                        {
                            model:db.User,
                            attributes:{
                                exclude:["password"]
                            },
                        }
                    ]
                },{
                    model:db.User,
                    as:"Likers",
                    attributes:["id","name"]
                }
            ]
        });

        res.status(200).json(fullMyPosts);
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.get("/hashtag/:tag",async (req,res,next)=>{
    try{
        const {tag} = req.params;

        const posts = await Post.findAll({
            order:[
                ["createdAt","DESC"]
            ],
            include:[
                {
                    model:db.Hashtag,
                    where:{tag:"#"+tag}
                },
                {
                    model:db.Image,
                },{
                    model:db.User,
                    attributes:{
                        exclude:["password"]
                    }
                },{
                    model:db.Comment,
                    include:[
                        {
                            model:db.User,
                            attributes:{
                                exclude:["password"]
                            },
                        }
                    ]
                },{
                    model:db.User,
                    as:"Likers",
                    attributes:["id","name"]
                }
            ]
        });
        res.status(200).json(posts);
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.get("/:UserId",async (req,res,next)=>{
    try{
        const posts = await Post.findAll({
            order:[
                ["createdAt","DESC"]
            ],
            include:[
                {
                    model:db.Image,
                },{
                    model:db.User,
                    attributes:{
                        exclude:["password"]
                    },
                    where:{id:parseInt(req.params.UserId)},
                },{
                    model:db.Comment,
                    include:[
                        {
                            model:db.User,
                            attributes:{
                                exclude:["password"]
                            },
                        }
                    ]
                },{
                    model:db.User,
                    as:"Likers",
                    attributes:["id","name"]
                }
            ]
        });
        
        res.status(200).json(posts);
    } catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;