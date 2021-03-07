import React,{useEffect,useCallback} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {LOAD_USER_POSTS_REQUEST} from "../modules/postReducer"
import withRouter from "with-router"
import PostForm from "../components/PostForm"
import Posts from "../components/Posts"
import useSWR from "swr";
import axios from "axios"
import {backAddress} from "../backAddress"

const fetcher = (url)=>axios.get(url,{withCredentials:true}).then(result=>result.data);


function UserProfile({history,match}){
    const dispatch = useDispatch();

    const {data:UserPostsData,error:UserPostsError} = useSWR(`${backAddress}/posts/${match.params.UserId}`,fetcher);

    return (
    <>
    {
        (UserPostsData||UserPostsError)?(
            <>
                <PostForm />
                <div id="Home">
                    <Posts posts={UserPostsData} />
                </div>
            </>
        ):<h1>loading..</h1>
    }
    </>
    );
}

export default withRouter(UserProfile);