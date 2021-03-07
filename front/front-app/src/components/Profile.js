import React,{useEffect,useCallback} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {LOAD_MY_POSTS_REQUEST} from "../modules/postReducer"
import withRouter from "with-router"
import PostForm from "../components/PostForm"
import Posts from "../components/Posts"

function Profile({history}){
    const dispatch = useDispatch();
    const {me} = useSelector(state=>state.userReducer);
    const {posts,loadPostLoading} = useSelector(state=>state.postReducer);

    useEffect(()=>{
        dispatch({
            type:LOAD_MY_POSTS_REQUEST,
        })
    },[])



    useEffect(()=>{
        if(!me){
            return history.push("/");
        }
    })


    if(!me){
        return null;
    }

    return (
    <>
    {
        !loadPostLoading?(
            <>
                <PostForm />
                <div id="Home">
                    <Posts posts={posts} />
                </div>
            </>
        ):<h1>loading..</h1>
    }
    </>
    );
}

export default withRouter(Profile);