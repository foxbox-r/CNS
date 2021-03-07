import React,{useCallback,useEffect,useRef} from 'react';
import useInput from "../hooks/useInput"
import {useSelector,useDispatch} from "react-redux";
import {ADD_POST_REQUEST,UPLOAD_IMAGE_REQUEST,REMOVE_ALL_IMAGE_REQUEST} from "../modules/postReducer"
import ImageForm from "./ImageForm";

function PostForm(){
    const dispatch = useDispatch();
    const {me} = useSelector(state=>state.userReducer);
    const {addPostLoading,addPostDone,addPostError,imagePath} = useSelector(state=>state.postReducer);

    const [title,setTitle,onChangeTitle] = useInput("");
    const [description,setDescription,onChangeDescription] = useInput("");
    const checkInput = useRef();
    
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        console.log(title,description,me.id);
        dispatch({
            type:ADD_POST_REQUEST,
            data:{
                title,
                description,
                images:imagePath,
            },
        })
    },[title,description,imagePath])

    const onChangeImage = useCallback((e)=>{
        const imageFormData = new FormData();
        Object.keys(e.target.files).forEach(name=>{
            console.log(e.target.files[name]);
            imageFormData.append("image",e.target.files[name]);
        });
        
        // console.log(imageFormData.getAll("image"));
        dispatch({
            type:UPLOAD_IMAGE_REQUEST,
            data:imageFormData,
        });
    },[])

    useEffect(()=>{
        if(addPostDone){
            setTitle("");
            setDescription("");
            checkInput.current.checked = false;
            dispatch({
                type:REMOVE_ALL_IMAGE_REQUEST,
            })
        }
    },[addPostDone])

    const onChangeChecked = useCallback((e)=>{
        console.dir(e);
    },[])

    if(!me)
        return null;

    return (
        <div id="PostForm">

            <label htmlFor="checkHidePostForm">
                <div className="PostFormClick">
                    <div style={{color:me.color,backgroundColor:me.backgroundColor}} className="profile">{me.name[0].toUpperCase()}</div>
                    <div className="lookLikeInput">{`${me.name}, What happened today?`}</div>
                </div>
            </label>

            <input onChange={onChangeChecked} ref={checkInput} id="checkHidePostForm" type="checkbox"/>

            <div className="hidePostForm">
                <label htmlFor="checkHidePostForm">
                    <article>
                        <header>
                            <h2>Post</h2>
                        </header>
                        <article>
                            <form onSubmit={onSubmit}>
                                <p>{me.name}</p>
                                <div>
                                    <input type="text" value={title} placeholder="Insert your post title." onChange={onChangeTitle}/>
                                </div>
                                {imagePath.length ? <ImageForm images={imagePath} />:null}
                                <div>
                                    <textarea value={description} placeholder="Insert your post description." onChange={onChangeDescription}></textarea>
                                </div>
                                <div>
                                    <input multiple onChange={onChangeImage} type="file"/>
                                </div>
                                <div>
                                    <input type="submit" value={addPostLoading?"Loading...":"Post"}/>    
                                </div>
                            </form>
                        </article>
                    </article>
                </label>
            </div>
        </div>
    )
}

export default PostForm;