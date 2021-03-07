import React from 'react';
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import {useSelector} from "react-redux"

function Comments({comments,PostId}){
    const {me} = useSelector(state=>state.userReducer);
    return (
        <div className="Comments">
            {comments.map(comment=><Comment key={comment.id} comment={comment} />)}
            {me && <CommentForm PostId={PostId}/>}
        </div>
    )
}

export default Comments;