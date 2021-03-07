import React from 'react';
import Post from "./Post"

function Posts({posts}){

    return (
        <div id="Posts">
            {posts.map(post=><Post key={post.id} post={post} />)}
        </div>
    )
}

export default Posts;