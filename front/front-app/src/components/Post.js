import React,{useState,useCallback,useRef, useEffect} from 'react';
import Comments from "./Comments"
import {backAddress} from "../backAddress"
import {useSelector,useDispatch} from "react-redux"
import {ZOOM_IMAGE_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST,EDIT_POST_REQUEST,REMOVE_POST_REQUEST} from "../modules/postReducer"
import useInput from "../hooks/useInput"
import {Link} from "react-router-dom"

function Post({post}){
    const dispatch = useDispatch();
    const {title,description,Images,User,Likers,Comments:var_comments} = post;
    const [openComment,setOpenComment] = useState(false);
    const {me} = useSelector(state=>state.userReducer);
    const {editPostLoading,editPostDone,removePostLoading,removePostDone} = useSelector(state=>state.postReducer);

    const [isEdit,setIsEdit] = useState(false);
    const [edit_title,edit_setTitle,edit_onChangeTitle] = useInput(title);
    const [edit_description,edit_setDescription,edit_onChangeDescription] = useInput(description);

    const onClickImg = useCallback(()=>{
        dispatch({
            type:ZOOM_IMAGE_REQUEST,
            data:post.Images.map(img=>img.src),
        })
    },[Images])

    const onClickComment = useCallback(()=>{
        setOpenComment((prev)=>!prev);
    },[])

    let ImgHtml = null;

    if(Images.length === 1){
        ImgHtml = <img title="자세히 보기" onClick={onClickImg} src={`${backAddress}/${Images[0].src}`} alt=""/>;
    }
    else if(Images.length === 2){
        ImgHtml = (
        <div title="자세히 보기" onClick={onClickImg} className="PostImg_2">
            <img src={`${backAddress}/${Images[0].src}`}  alt=""/>
            <img src={`${backAddress}/${Images[1].src}`}  alt=""/>
        </div>
        );
    }
    else if(Images.length > 2){
        ImgHtml = (
            <div title="자세히 보기" onClick={onClickImg} className="PostImg_3">
                <img src={`${backAddress}/${Images[0].src}`}  alt=""/>
                <img src={`${backAddress}/${Images[1].src}`}  alt=""/>
                <div>{Images.length-1}개 더보기..</div>
            </div>
        )
    }

    let isLikeThisPost;
    let isMyPost = false;
    if(me){
        isLikeThisPost = post.Likers.find(user=>user.id === me.id);
        isMyPost = me.Posts.find(myPost=>myPost.id === post.id);
    }
    const onClickLike = useCallback((e)=>{
        dispatch({
            type:LIKE_POST_REQUEST,
            data:post.id,
        })
    },[me]);

    const onClickUnLike = useCallback((e)=>{
        dispatch({
            type:UNLIKE_POST_REQUEST,
            data:post.id,
        })
    },[me]);


    const onClickEdit = useCallback((e)=>{
        setIsEdit(prev=>!prev);
    },[]);

    const onEditSubmit = useCallback((e)=>{
        dispatch({
            type:EDIT_POST_REQUEST,
            data:{
                PostId:post.id,
                title:edit_title,
                description:edit_description,
            }
        })
    },[edit_title,edit_description,post]);

    const onClickRemove = useCallback((e)=>{
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id
        })
    },[post])

    useEffect(()=>{
        if(editPostDone){
            setIsEdit(false);
        }
    },[editPostDone])

    return (
        <div className="postCard">
            {removePostLoading && <h1>loading</h1>}
            <header>
                <Link to={`/userPosts/${post.User.id}`}>
                    <div style={{color:post.User.color,backgroundColor:post.User.backgroundColor,}} className="firstName">{User.name[0].toUpperCase()}</div>
                    <div className="fullName">{User.name}</div>
                </Link>
                {isMyPost && <div className="removeButtonDiv"><button onClick={onClickRemove}>remove</button></div>}
            </header>
            {
            isEdit? // edit
            <article>

                <header>
                    <h3><input type="text" value={edit_title} onChange={edit_onChangeTitle} /></h3>
                </header>

                <article>
                    {ImgHtml}
                    <article>
                        <p className="name">{User.name}</p>
                        <p className="description"><textarea cols="30" rows="10" value={edit_description} onChange={edit_onChangeDescription} /></p>
                    </article>
                </article>
                
                <footer>
                    <p>Likes {Likers.length}</p>
                    <p onClick={onClickComment}>Comments {var_comments.length}</p>
                </footer>

            </article>
            : // not edit
            <article> 

                <header>
                    <h3> 
                        {title.split(/(#[^\s#]+)/g).map((v,i)=>{
                            if(v.match(/(#[^\s#]+)/)){
                                return <Link className="hashtag" key={i} to={`/hashtag/${v.slice(1)}`}>{v}</Link>
                            }
                            return v;
                        })}
                    </h3>
                </header>

                <article>
                    {ImgHtml}
                    <article>
                        <p className="name">{User.name}</p>
                        <p className="description">
                            {description.split(/(#[^\s#]+)/g).map((v,i)=>{
                                if(v.match(/(#[^\s#]+)/)){
                                    return <Link className="hashtag" key={i} to={`/hashtag/${v.slice(1)}`}>{v}</Link>
                                }
                                return v;
                            })}
                        </p>
                    </article>
                </article>
                
                <footer>
                    <p>Likes {Likers.length}</p>
                    <p onClick={onClickComment}>Comments {var_comments.length}</p>
                </footer>

            </article>
            }
            
            {me &&
                <footer>
                    {!isEdit && (isLikeThisPost ? <button onClick={onClickUnLike}>unlike</button> :<button onClick={onClickLike}>like</button>)}
                    {isEdit?<button onClick={onClickEdit}>{editPostLoading?"loading...":"cancle"}</button>:<button onClick={onClickComment}>comment</button>}
                    {isMyPost?<button onClick={isEdit?onEditSubmit:onClickEdit}>{isEdit?"change":(editPostLoading?"loading...":"edit")}</button>:<button>share</button>}
                </footer>
            }
            {openComment && <Comments PostId={post.id} comments={var_comments}/>}
        
        </div>
    )
}

export default Post;