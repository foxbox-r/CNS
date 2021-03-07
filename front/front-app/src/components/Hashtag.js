import React,{useEffect,useCallback} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {LOAD_HASHTAG_POSTS_REQUEST} from "../modules/postReducer"
import withRouter from "with-router"
import PostForm from "../components/PostForm"
import Posts from "../components/Posts"

function Hashtag({history,match}){
    const dispatch = useDispatch();
    const {posts,loadPostLoading} = useSelector(state=>state.postReducer);
    const {tag} = match.params;

    useEffect(()=>{
        dispatch({
            type:LOAD_HASHTAG_POSTS_REQUEST,
            data:tag,
        })
    },[tag]);



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

export default withRouter(Hashtag);