const router = require("express").Router();
const db = require("../models")
const {Post,Hashtag,Comment,Image} = db;
const multer = require('multer');
const path = require("path");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares")


router.post("/",isLoggedIn,async (req,res,next)=>{
    try{
        const {title,description,images} = req.body;
        let hashtag = (title+" "+description).match(/(#[^\s#]+)/g);
    
        console.log("HASHTAG ::",hashtag);
        
        const post = await Post.create({
            title,description,
            UserId:req.user.id,
        });
     
        if(hashtag){
            const result = await Promise.all(hashtag.map(tag=>Hashtag.findOrCreate({
                where:{tag:tag.toLowerCase()}
            })));
            await post.addHashtags(result.map(v=>v[0]));
        }
        console.log(images);
        if(images.length){
            const createdImages = await Promise.all(images.map(img=>Image.create({src:img})))
            await post.addImages(createdImages);
        }

        const fullPost = await Post.findOne({
            where:{id:post.id},
            include:[
                {
                    model:db.Image,
                    attributes:["src"],
                },
                {
                    model:db.Comment,
                },{
                    model:db.User,
                    attributes:{
                        exclude:["password"],
                    }
                },{
                    model:db.User,
                    as:"Likers",
                    attributes:["id"] 
                }
            ]
        })

        res.status(200).json(fullPost)
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.post("/:PostId/comment",isLoggedIn,async (req,res,next)=>{
    try{
        const PostId = parseInt(req.params.PostId);
        const {description} = req.body;

        const comment = await Comment.create({
            description,
            UserId:req.user.id,
            PostId,
        });

        const FullComment = await Comment.findOne({
            where:{id:comment.id},
            include:[
                {
                    model:db.User,
                    attributes:{
                        exclude:["password"],
                    }
                }
            ]
        })
        return res.status(201).json(FullComment);
    } catch(error){
        console.error(error);
        next(error);
    }
});

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,"uploads");
        },
        filename:(req,file,done)=>{ // 파일명.확장자
            const ext = path.extname(file.originalname); // .확장자
            const basename = path.basename(file.originalname,ext); // 파일명
            done(null,basename + "_" + new Date().getTime() + ext);
        }
    }),
    limites : {fileSize:20 * 1024 * 1024}, // 20MB
});

router.post("/images",isLoggedIn,upload.array("image"),async (req,res,next)=>{
    try{
        console.log(req.files);
        res.json(req.files.map(v=>v.filename));
    } catch(error){
        console.error(error);
        next(error);
    }
})

router.patch("/:PostId/like",isLoggedIn,async (req,res,next)=>{
    try{
        const PostId = parseInt(req.params.PostId);
        const UserId = req.user.id; 
        const post = await Post.findOne({where:PostId});
        await post.addLikers(UserId);

        res.status(201).json({PostId,UserId});
    } catch(error){
        console.error(error);
        next(error);
    }
});


router.patch("/:PostId/unlike",isLoggedIn,async (req,res,next)=>{
    try{
        const PostId = parseInt(req.params.PostId);
        const UserId = req.user.id;
        const post = await Post.findOne({where:PostId});
        await post.removeLikers(UserId);

        res.status(201).json({PostId,UserId});
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.put("/:PostId/edit",isLoggedIn,async (req,res,next)=>{
    try{
        const PostId = parseInt(req.params.PostId);
        const {title,description} = req.body;

        await Post.update(
            {title,description},
            {where:{id:PostId}}
        )

        res.status(201).json({PostId,title,description});

    } catch(error){
        console.error(error);
        next(error);
    }
})

router.delete("/:PostId/delete",isLoggedIn,async (req,res,next)=>{
    try{
        const PostId = parseInt(req.params.PostId);
        console.log(PostId);
        await Post.destroy(
            {where:{id:PostId}}
        )

        res.status(201).json({PostId});

    } catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;