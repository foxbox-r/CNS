import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Posts from "./Posts"
import {LOAD_POSTS_REQUEST} from "../modules/postReducer"
import {LOAD_MY_INFO_REQUEST} from "../modules/userReducer"
import PostForm from "./PostForm"

function Home(){
    const dispatch = useDispatch();
    const {posts,loadPostsLoading,canLoadPosts,} = useSelector(state=>state.postReducer);

    useEffect(()=>{
        dispatch({
            type:LOAD_POSTS_REQUEST,
        });
        dispatch({
            type:LOAD_MY_INFO_REQUEST,
        })
    },[])

    useEffect(()=>{
        function onScroll(e){
            // console.log("scroll Y :",window.scrollY)
            // console.log("client view height :",document.documentElement.clientHeight);
            // console.log(document.documentElement.scrollHeight);
            const result = document.documentElement.scrollHeight-document.documentElement.clientHeight-300 < window.scrollY;
            if(result && !loadPostsLoading && canLoadPosts){
                dispatch({
                    type:LOAD_POSTS_REQUEST,
                    data:posts[posts.length-1].id,
                })
            } else{
                console.log("cant");
            }
        }
        window.addEventListener("scroll",onScroll);

        return ()=>{
            window.removeEventListener("scroll",onScroll);
        }
    },[posts,loadPostsLoading,canLoadPosts])

    return (
        <>
            <PostForm />
            <div id="Home">
                <Posts posts={posts} />
            </div>
        </>
    )
}

export default Home;