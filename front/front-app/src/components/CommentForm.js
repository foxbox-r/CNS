import React,{useRef,useCallback,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux"
import useInput from "../hooks/useInput"
import {ADD_COMMENT_REQUEST} from "../modules/postReducer"

function CommentForm({PostId}){
    const dispatch = useDispatch();
    const {me} = useSelector(state=>state.userReducer);
    const {addCommentLoading,addCommentDone,addCommentError} = useSelector(state=>state.postReducer);
    const {color,backgroundColor} = me;
    const [comment,setComment,onChangeComment] = useInput("");
    const input = useRef();
    const inputDiv = useRef();

    const onClickInputDiv = useCallback((e)=>{
        input.current.focus();
    },[])

    const onEnter = useCallback((e)=>{
        if(e.key === "Enter"){
            dispatch({
                type:ADD_COMMENT_REQUEST,
                data:{
                    PostId,
                    comment,
                },
            })
        }
    },[comment])

    useEffect(()=>{
        if(addCommentDone){
            setComment("");
        }
    },[addCommentDone])

    return (
        <div className="CommentForm">
            <header style={{color,backgroundColor}}>
                {me.name[0].toUpperCase()}
            </header>
            <article>
                <div>
                    <textarea onKeyPress={onEnter} value={addCommentLoading?"Loading...":comment} onChange={onChangeComment}></textarea>
                </div>
            </article>
        </div>
    )
}

export default CommentForm;